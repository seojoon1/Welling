// src/components/MapView.jsx
import React, { useEffect, useRef, useCallback } from 'react';
import L from 'leaflet';
import { useAppStore } from './store/useAppStore';
import { api } from './services/api';
import styles from './MapView.module.css';
import { norm, ALIAS, gapPurple, whiteToBlue, whiteToRed } from '../../utils';

const debounce = (fn, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
};

const MapView = () => {
  const geoData = useAppStore((state) => state.geoData);
  const regionData = useAppStore((state) => state.regionData);
  const currentView = useAppStore((state) => state.currentView);
  const absMaxGap = useAppStore((state) => state.absMaxGap);
  const setSelectedRegion = useAppStore((state) => state.setSelectedRegion);
  const addTerminalLog = useAppStore((state) => state.addTerminalLog);

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const layerRef = useRef(null);
  const featuresRef = useRef(new Map());

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      zoomControl: false,
      scrollWheelZoom: true,
      doubleClickZoom: true,
      touchZoom: true,
      dragging: true,
      preferCanvas: true,
      renderer: L.canvas({ padding: 0.5 })
    }).setView([36.45, 127.9], 7);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  const getRegionData = useCallback((feature) => {
    const raw0 = feature.properties?.SIG_KOR_NM ||
                 feature.properties?.CTP_KOR_NM ||
                 feature.properties?.name ||
                 feature.properties?.adm_nm || '';
    const key0 = norm(raw0);
    const key = ALIAS.get(key0) || key0;
    const d = regionData.find(x => x.region === key);
    return { key, data: d };
  }, [regionData]);

  const styleFor = useCallback((feature, view = currentView) => {
    const { data: d } = getRegionData(feature);
    const stroke = d ? (d._placeholder ? '#A78BFA' : '#374151') : '#374151';
    let fill = '#222';

    if (!d) {
      return {
        color: stroke,
        weight: 1.5,
        dashArray: '4 3',
        fillColor: '#FF00FF',
        fillOpacity: 0.88
      };
    }

    if (view === 'gap') fill = gapPurple(d.gap, absMaxGap);
    else if (view === 'policy') fill = whiteToBlue(d.policy);
    else fill = whiteToRed(d.psychology);

    const base = {
      color: stroke,
      weight: 1.2,
      fillColor: fill,
      fillOpacity: 0.95
    };

    return d._placeholder ? { ...base, dashArray: '4 3' } : base;
  }, [currentView, absMaxGap, getRegionData]);

  // 지역 클릭 핸들러 - 백엔드로 데이터 전송
  const handleRegionClick = useCallback(async (key, data) => {
    if (!data) return;

    // 선택된 지역 설정
    setSelectedRegion(data);
    
    // 상위 고통 주제 찾기
    const topTheme = Object.entries(data.themes)
      .sort((a, b) => b[1] - a[1])[0];
    
    const topic = topTheme ? topTheme[0] : '알 수 없음';

    // 터미널 로그 추가
    addTerminalLog(`지역 클릭: ${key}`);
    addTerminalLog(`최고 고통 주제: ${topic} (${topTheme ? topTheme[1] : 'N/A'}점)`);
    addTerminalLog(`백엔드로 데이터 전송 중...`);

    // 백엔드로 데이터 전송
    const result = await api.sendRegionClick(key, topic);
    
    if (result.success) {
      addTerminalLog(result.message);
      addTerminalLog(`서버 응답: ${JSON.stringify(result.data)}`);
    } else {
      addTerminalLog(result.message);
    }
    
    addTerminalLog('─'.repeat(50));
  }, [setSelectedRegion, addTerminalLog]);

  useEffect(() => {
    if (!mapInstanceRef.current || !geoData) return;

    const map = mapInstanceRef.current;

    if (layerRef.current) {
      layerRef.current.eachLayer(layer => {
        const feature = layer.feature;
        if (feature && featuresRef.current.has(layer._leaflet_id)) {
          layer.setStyle(styleFor(feature));
        }
      });
      return;
    }

    const layer = L.geoJSON(geoData, {
      style: f => styleFor(f),
      onEachFeature: (f, l) => {
        featuresRef.current.set(l._leaflet_id, f);
        const { key, data: d } = getRegionData(f);

        const originalStyle = styleFor(f);
        const hoverStyle = { weight: 2.4, color: '#F5F5F5' };

        const handleMouseOver = debounce((e) => {
          e.target.setStyle(hoverStyle);
          e.target.bringToFront();
        }, 50);

        const handleMouseOut = debounce((e) => {
          e.target.setStyle(originalStyle);
        }, 50);

        l.on('mouseover', handleMouseOver);
        l.on('mouseout', handleMouseOut);
        l.on('click', () => handleRegionClick(key, d));

        // 툴팁 설정 - 지역 이름을 크게 표시
        l.bindTooltip(
          `<div style="font-size: 18px; font-weight: bold;">${key}</div>`,
          {
            sticky: true,
            direction: 'top',
            opacity: 1,
            className: 'region-tooltip',
            offset: [0, -10]
          }
        );
      }
    }).addTo(map);

    layerRef.current = layer;
    if (layer.getBounds().isValid()) {
      map.fitBounds(layer.getBounds(), { padding: [20, 20], animate: true, duration: 0.4 });
    }
  }, [geoData, regionData, currentView, absMaxGap, handleRegionClick, styleFor, getRegionData]);

  const handleZoomIn = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomIn();
    }
  };

  const handleZoomOut = () => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.zoomOut();
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div ref={mapRef} className={styles.mapContainer} />
      <div className={styles.zoomControls}>
        <button className={styles.zoomButton} onClick={handleZoomIn}>
          +
        </button>
        <button className={styles.zoomButton} onClick={handleZoomOut}>
          −
        </button>
      </div>
    </div>
  );
};

export default MapView;
