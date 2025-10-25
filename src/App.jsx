// src/App.jsx
import React, { useEffect } from 'react';
import { useAppStore } from './store/useAppStore';
import MapView from './components/MapView';
import AverageChart from './components/AverageChart';
import TopThemesChart from './components/TopThemesChart';
import ViewTabs from './components/ViewTabs';
import AIInsight from './components/AIInsight';
import AIConsulting from './components/AIConsulting';
import { api } from './services/api';
import { baselineFrom, norm, ALIAS } from './utils';
import styles from './App.module.css';
import Org_topGNB from './components/com/Org_topGNB/org_topGNB.jsx';
import Org_leftGNB from './components/com/Org_leftGNB/org_leftGNB.jsx';
export default function App() {
  const {
    regionData,
    geoData,
    currentView,
    status,
    setRegionData,
    setGeoData,
    setStatus,
    setAbsMaxGap,
    initializeData,
    addTerminalLog
  } = useAppStore();

  useEffect(() => {
    // 백엔드에서 초기 데이터 가져오기
    loadInitialData();

    // GeoJSON 자동 로드
    addTerminalLog('GeoJSON 파일 로딩 시도 중...');
    fetch('./skorea-provinces-2018-geo.json')
      .then(r => {
        if (!r.ok) throw new Error('fetch fail');
        return r.json();
      })
      .then(geo => {
        processGeoJSON(geo);
        setStatus('');
        addTerminalLog('✓ GeoJSON 로드 성공');
      })
      .catch(err => {
        const msg = '자동 로드 실패. 파일을 직접 선택하세요.';
        setStatus(msg);
        addTerminalLog(`✗ ${msg}`);
        console.warn('자동 로드 실패:', err);
      });
  }, []);

  // 백엔드에서 지역 데이터 로드
  const loadInitialData = async () => {
    addTerminalLog('시스템 초기화 중...');
    addTerminalLog('백엔드에서 지역 데이터 로드 중...');

    const result = await api.getRegionSummary();

    if (result.success) {
      initializeData(result.data);
      addTerminalLog('✓ 백엔드 데이터 로드 성공');
      setStatus('데이터 로드 완료');
    } else {
      addTerminalLog(`✗ 백엔드 데이터 로드 실패: ${result.error}`);
      setStatus('데이터 로드 실패 - 기본 데이터 사용');
      // 실패 시 빈 배열로 초기화
      initializeData([]);
    }
  };

  const processGeoJSON = (geo) => {
    const BASE = baselineFrom(regionData);
    const present = new Set(regionData.map(d => d.region));
    const feats = geo.features || [];
    const added = [];
    const newData = [...regionData];

    feats.forEach(f => {
      const raw = f.properties?.SIG_KOR_NM ||
                  f.properties?.CTP_KOR_NM ||
                  f.properties?.name ||
                  f.properties?.adm_nm || '';
      const k0 = norm(raw);
      const key = ALIAS.get(k0) || k0;

      if (!present.has(key)) {
        const d = {
          region: key,
          policy: Math.round(BASE.polMed),
          psychology: Math.round(BASE.psyMed),
          themes: { ...BASE.themeObj },
          _placeholder: true
        };
        d.gap = d.policy - d.psychology;
        newData.push(d);
        present.add(key);
        added.push(key);
      }
    });

    setRegionData(newData);
    setAbsMaxGap(Math.max(...newData.map(d => Math.abs(d.gap))) || 1);
    setGeoData(geo);

    if (added.length) {
      const msg = `자동 로드 완료 + 누락 지역 임시 채움: ${added.join(', ')}`;
      setStatus(msg);
      addTerminalLog(msg);
    }
  };

  const handleFileOpen = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    const reader = new FileReader();
    reader.onload = () => {
      try {
        const geo = JSON.parse(reader.result);
        setStatus(`파일 로드: ${f.name}`);
        addTerminalLog(`📂 파일 로드: ${f.name}`);
        processGeoJSON(geo);
      } catch (e) {
        const msg = '파싱 실패: 올바른 GeoJSON이 아님';
        setStatus(msg);
        addTerminalLog(`✗ ${msg}`);
      }
    };
    reader.readAsText(f, 'utf-8');
  };

  const handleReset = () => {
    loadInitialData();
    setStatus('초기화 완료');
    addTerminalLog('🏠 초기 상태로 리셋');
  };

  return (
    <div className={styles.root}>
      <div className={styles.app}>
        {/* <div className={styles.header}>
          <h1 className={styles.title}>
            🌏 Welling - AI 정책심리 지도
          </h1>
          <p className={styles.subtitle}>
            실제 정책과 주민체감 사이의 괴리를 AI로 시각화합니다. | 팀 인사이트
          </p>
        </div> */}
        <div>
          <Org_topGNB />
        </div>

        <div className={styles.gridContainer}>
          {/* 왼쪽 컬럼: 지도 */}
          <div className={styles.leftColumn}>
            <div className={styles.mapPanel}>
              <ViewTabs />
              <div style={{ position: 'relative', flex: 1 }}>
                <MapView />
              </div>
              <div className={styles.controlButtons}>
                <label className={styles.fileButton}>
                  📁 JSON 파일 불러오기
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileOpen}
                    style={{ display: 'none' }}
                  />
                </label>
                <button className={styles.homeButton} onClick={handleReset}>
                  🏠 홈(초기화)
                </button>
              </div>
            </div>
          </div>

          {/* 중앙 컬럼: 차트 */}
          <div className={styles.middleColumn}>
            <div className={styles.chartPanel}>
              <AverageChart />
            </div>
            <div className={styles.chartPanel}>
              <TopThemesChart />
            </div>
          </div>

          {/* 오른쪽 컬럼: AI 박스 */}
          <div className={styles.rightColumn}>
            <AIInsight />
            <AIConsulting />
          </div>
        </div>
      </div>
    </div>
  );
}
