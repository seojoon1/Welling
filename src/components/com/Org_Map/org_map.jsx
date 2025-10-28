import { useState, useEffect, useCallback } from 'react';
import styles from './org_map.module.css';
import { getRegionSummary } from '../../../services/api';
import FeatureMap from './FeatureMap.jsx';

function Org_Map({ activeTab = '여론', onRegionSelect, selectedRegionName }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [regionData, setRegionData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [svgLoaded, setSvgLoaded] = useState(false);
  const [zoom, setZoom] = useState(1); // 확대/축소 배율 (1 = 100%)
  const [pan, setPan] = useState({ x: 0, y: 0 }); // 지도 이동 위치
  const [isDragging, setIsDragging] = useState(false); // 드래그 상태
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 }); // 드래그 시작 위치

  /**
   * SVG ref 콜백 함수
   * - SVG가 DOM에 마운트되면 자동으로 호출됨
   * - path 요소가 존재하면 svgLoaded를 true로 설정
   * - path가 없으면 100ms 후 재시도 (비동기 렌더링 대응)
   */
  const svgRef = useCallback((node) => {
    // console.log('SVG ref callback called with:', node);
    if (node) {
      const paths = node.querySelectorAll('path[id]');
      // console.log('Found paths in ref callback:', paths.length);
      if (paths.length > 0) {
        // console.log('Setting svgLoaded to true in callback');
        setSvgLoaded(true);
      } else {
        setTimeout(() => {
          const retryPaths = node.querySelectorAll('path[id]');
          // console.log('Retry in callback, found paths:', retryPaths.length);
          if (retryPaths.length > 0) {
            setSvgLoaded(true);
          }
        }, 100);
      }
    }
  }, []);

  // 지역 코드별 이름 매핑
  const regionNames = {
    'KR11': '서울특별시',
    'KR26': '부산광역시',
    'KR27': '대구광역시',
    'KR28': '인천광역시',
    'KR29': '광주광역시',
    'KR30': '대전광역시',
    'KR31': '울산광역시',
    'KR41': '경기도',
    'KR42': '강원특별자치도',
    'KR43': '충청북도',
    'KR44': '충청남도',
    'KR45': '전북특별자치도',
    'KR46': '전라남도',
    'KR47': '경상북도',
    'KR48': '경상남도',
    'KR49': '제주특별자치도',
    'KR50': '세종특별자치시',
  };

  // 지역명을 region_code로 매핑
  const regionNameToCode = {
    '강원': 'KR42',
    '경기': 'KR41',
    '경남': 'KR48',
    '경북': 'KR47',
    '광주': 'KR29',
    '대구': 'KR27',
    '대전': 'KR30',
    '부산': 'KR26',
    '서울': 'KR11',
    '세종': 'KR50',
    '울산': 'KR31',
    '인천': 'KR28',
    '전남': 'KR46',
    '전북': 'KR45',
    '제주': 'KR49',
    '충남': 'KR44',
    '충북': 'KR43',
  };

  /**
   * API에서 지역별 데이터(여론/정책/Gap 점수) 불러오기
   * - 초기 마운트 시 한 번만 실행
   * - API 실패 시 fallback 데이터 사용
   */
  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        setLoading(true);
        setError(null);
        const result = await getRegionSummary();

        if (result.success) {
          const formattedData = {};

          // API 응답 데이터 정규화 (배열 형태로 변환)
          let regions = result.data.data || result.data;
          if (!Array.isArray(regions)) {
            regions = Object.values(regions);
          }

          // 지역명을 코드로 변환하고 점수 매핑
          regions.forEach(region => {
            const regionCode = regionNameToCode[region.region_name];
            if (regionCode) {
              formattedData[regionCode] = {
                여론: region.sentiment_score || 0,
                정책: region.policy_score || 0,
                Gap: region.gap_score || 0,
              };
            }
          });
          setRegionData(formattedData);
        } else {
          console.error('API Error:', result.error);
          // Fallback 데이터 사용
          setRegionData({
            'KR11': { 여론: 100, 정책: 38, Gap: 7 },
            'KR26': { 여론: 52, 정책: 48, Gap: 4 },
            'KR27': { 여론: 41, 정책: 35, Gap: 6 },
            'KR28': { 여론: 48, 정책: 42, Gap: 6 },
            'KR29': { 여론: 39, 정책: 33, Gap: 6 },
            'KR30': { 여론: 44, 정책: 40, Gap: 4 },
            'KR31': { 여론: 50, 정책: 45, Gap: 5 },
            'KR41': { 여론: 47, 정책: 43, Gap: 4 },
            'KR42': { 여론: 43, 정책: 39, Gap: 4 },
            'KR43': { 여론: 40, 정책: 36, Gap: 4 },
            'KR44': { 여론: 42, 정책: 38, Gap: 4 },
            'KR45': { 여론: 38, 정책: 34, Gap: 4 },
            'KR46': { 여론: 36, 정책: 32, Gap: 4 },
            'KR47': { 여론: 32, 정책: 28, Gap: 4 },
            'KR48': { 여론: 46, 정책: 41, Gap: 5 },
            'KR49': { 여론: 55, 정책: 50, Gap: 5 },
            'KR50': { 여론: 49, 정책: 44, Gap: 5 },
          });
        }
      } catch (err) {
        console.error('Fetch Error:', err.message);
        // Fallback 데이터 사용
        setRegionData({
          'KR11': { 여론: 100, 정책: 38, Gap: 7 },
          'KR26': { 여론: 52, 정책: 48, Gap: 4 },
          'KR27': { 여론: 41, 정책: 35, Gap: 6 },
          'KR28': { 여론: 48, 정책: 42, Gap: 6 },
          'KR29': { 여론: 39, 정책: 33, Gap: 6 },
          'KR30': { 여론: 44, 정책: 40, Gap: 4 },
          'KR31': { 여론: 50, 정책: 45, Gap: 5 },
          'KR41': { 여론: 47, 정책: 43, Gap: 4 },
          'KR42': { 여론: 43, 정책: 39, Gap: 4 },
          'KR43': { 여론: 40, 정책: 36, Gap: 4 },
          'KR44': { 여론: 42, 정책: 38, Gap: 4 },
          'KR45': { 여론: 38, 정책: 34, Gap: 4 },
          'KR46': { 여론: 36, 정책: 32, Gap: 4 },
          'KR47': { 여론: 32, 정책: 28, Gap: 4 },
          'KR48': { 여론: 46, 정책: 41, Gap: 5 },
          'KR49': { 여론: 55, 정책: 50, Gap: 5 },
          'KR50': { 여론: 49, 정책: 44, Gap: 5 },
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRegionData();
  }, []);

  /**
   * 활성 탭에 따른 기본 색상 반환
   * - 여론: 빨강 (#F96C6C)
   * - 정책: 파랑 (#7781F6)
   * - Gap: 보라 (#8564BB)
   */
  const getDotColor = useCallback(() => {
    switch(activeTab) {
      case '여론':
        return '#F96C6C';
      case '정책':
        return '#7781F6';
      case 'Gap':
        return '#8564BB';
      default:
        return '#F96C6C';
    }
  }, [activeTab]);

  /**
   * Hex 색상을 HSL 배열로 변환
   * @param {string} hex - '#RRGGBB' 형식의 색상 코드
   * @returns {number[]} [H, S, L] 배열 (H: 0-360, S: 0-100, L: 0-100)
   */
  const hexToHSL = useCallback((hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0; // 무채색
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
        default: h = 0;
      }
    }

    return [h * 360, s * 100, l * 100];
  }, []);

  /**
   * 지역 코드와 점수에 따른 색상 계산
   * - 점수가 높을수록 채도가 높아져 진하게 표현 (saturation 높음)
   * - 점수가 낮을수록 채도가 낮아져 연하게 표현 (saturation 낮음)
   * - HSL 색상 모델을 사용하여 직관적인 색상 조절
   * @param {string} code - 지역 코드 (예: 'KR11')
   * @returns {string} hsl 색상 문자열
   */
  const getRegionColor = useCallback((code) => {
    const score = regionData[code]?.[activeTab] || 0;
    const baseColor = getDotColor();

    const [h, , l] = hexToHSL(baseColor);

    // 점수를 0~100 범위의 채도로 변환 (최소 10% 채도로 가시성 확보)
    const saturation = Math.min(Math.max(score, 10), 100);

    return `hsl(${h}, ${saturation}%, ${l}%)`;
  }, [activeTab, regionData, getDotColor, hexToHSL]);


  /**
   * SVG path 요소들에 색상 적용
   * - activeTab 변경 시 지역별 색상 재계산 및 적용
   * - 선택된 지역에 selected 클래스 추가
   *
   * 실행 조건:
   * 1. 데이터 로딩 완료
   * 2. 지역 데이터 존재
   * 3. SVG 로드 완료
   */
  useEffect(() => {
    // console.log('Color effect triggered:', { loading, hasData: Object.keys(regionData).length, svgLoaded });

    if (loading) {
      // console.log('Still loading...');
      return;
    }

    if (Object.keys(regionData).length === 0) {
      // console.log('No region data yet');
      return;
    }

    if (!svgLoaded) {
      // console.log('SVG not loaded yet');
      return;
    }

    // console.log('Applying colors for activeTab:', activeTab);
    // console.log('Region data:', regionData);

    const svg = document.querySelector(`.${styles.svgContainer}`);
    if (!svg) {
      // console.log('SVG not found in DOM');
      return;
    }

    const paths = svg.querySelectorAll('path[id]');
    // console.log('Found paths:', paths.length);

    // 각 지역 path에 색상 및 스타일 적용
    paths.forEach((pathElement) => {
      const code = pathElement.id;
      if (regionNames[code]) {
        const color = getRegionColor(code);
        // const score = regionData[code]?.[activeTab] || 0;
        // console.log(`Region ${code}: score=${score}, color=${color}`);

        // fill 속성과 style 모두 설정 (브라우저 호환성)
        pathElement.setAttribute('fill', color);
        pathElement.style.fill = color;
        pathElement.style.cursor = 'pointer';

        // 선택된 지역 강조
        if (selectedRegion === code) {
          pathElement.classList.add(styles.selected);
        } else {
          pathElement.classList.remove(styles.selected);
        }
      }
    });
  }, [activeTab, regionData, loading, svgLoaded, selectedRegion, getRegionColor, regionNames, styles.svgContainer, styles.selected]); 

  /**
   * 외부 컴포넌트에서 전달된 지역 이름으로 지역 선택
   * - selectedRegionName prop이 변경되면 해당 지역 선택
   */
  useEffect(() => {
    if (selectedRegionName) {
      const foundCode = Object.entries(regionNames).find(
        ([, name]) => name === selectedRegionName
      );
      if (foundCode) {
        setSelectedRegion(foundCode[0]);
      }
    }
  }, [selectedRegionName, regionNames]);

  /**
   * 지역 클릭 이벤트 핸들러
   * - 지역 선택 상태 업데이트
   * - 부모 컴포넌트에 선택 이벤트 전달
   */
  const handleRegionClick = (e) => {
    const target = e.target;
    const code = target.id;

    if (code && regionNames[code]) {
      setSelectedRegion(code);
      if (onRegionSelect) {
        const regionName = regionNames[code];
        onRegionSelect(regionName);
      }
    }
  };

  /**
   * 지역 마우스 오버 이벤트 핸들러
   * - 툴팁 표시를 위한 hoveredRegion 상태 업데이트
   */
  const handleRegionMouseEnter = (e) => {
    const target = e.target;
    const code = target.id;

    // console.log('Mouse enter:', code, regionNames[code]);

    if (code && regionNames[code]) {
      setHoveredRegion(code);
    }
  };

  /**
   * 마우스 이동 이벤트 핸들러
   * - 툴팁 위치 계산 및 업데이트
   */
  const handleRegionMouseMove = (e) => {
    const mapWrapper = e.currentTarget;
    const rect = mapWrapper.getBoundingClientRect();
    setTooltipPosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  /**
   * 마우스 휠 이벤트 핸들러
   * - 마우스 휠로 지도 확대/축소
   */
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1; // 휠 방향에 따라 확대/축소
    setZoom((prevZoom) => {
      const newZoom = prevZoom + delta;
      return Math.min(Math.max(newZoom, 0.5), 3); // 50% ~ 300% 제한
    });
  }, []);

  /**
   * 확대 버튼 핸들러
   */
  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  /**
   * 축소 버튼 핸들러
   */
  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 0.5));
  };

  /**
   * 리셋 버튼 핸들러
   */
  const handleZoomReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 }); // 위치도 초기화
  };

  /**
   * 마우스 다운 이벤트 - 드래그 시작
   */
  const handleMouseDown = (e) => {
    // SVG path 클릭이 아닌 경우만 드래그 시작
    if (e.target.tagName !== 'path') {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - pan.x,
        y: e.clientY - pan.y,
      });
    }
  };

  /**
   * 마우스 무브 이벤트 - 드래그 중
   */
  const handleMouseMoveForDrag = useCallback((e) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  }, [isDragging, dragStart]);

  /**
   * 마우스 업 이벤트 - 드래그 종료
   */
  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // 전역 마우스 이벤트 리스너 등록
  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMoveForDrag);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMoveForDrag);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMoveForDrag]);

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.mapWrapper}>Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.mapWrapper}>Error: {error}</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 확대/축소 컨트롤 버튼 */}
      <div className={styles.zoomControls}>
        <button className={styles.zoomButton} onClick={handleZoomIn} title="확대">
          +
        </button>
        <button className={styles.zoomButton} onClick={handleZoomReset} title="리셋">
          ⟲
        </button>
        <button className={styles.zoomButton} onClick={handleZoomOut} title="축소">
          −
        </button>
      </div>

      <div
        className={styles.mapWrapper}
        onMouseMove={handleRegionMouseMove}
        onMouseLeave={() => setHoveredRegion(null)}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      >
        <div
          className={styles.mapContainer}
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
            transformOrigin: 'center center',
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          <FeatureMap
            ref={svgRef}
            className={styles.svgContainer}
            onClick={handleRegionClick}
            onMouseOver={handleRegionMouseEnter}
          />
        </div>

        {/* 툴팁 */}
        {hoveredRegion && regionNames[hoveredRegion] && (
          <div
            className={styles.tooltip}
            style={{
              left: `${tooltipPosition.x + 10}px`,
              top: `${tooltipPosition.y - 60}px`,
            }}
          >
            <div className={styles.tooltipRegion}>
              {regionNames[hoveredRegion]}
            </div>
            <div className={styles.tooltipScore}>
              <svg className={styles.tooltipDot} xmlns="http://www.w3.org/2000/svg" width="4" height="4" viewBox="0 0 4 4" fill="none">
                <circle cx="2" cy="2" r="2" fill={getDotColor()}/>
              </svg>
              <span className={styles.tooltipValue}>
                {regionData[hoveredRegion]?.[activeTab] || 0}점
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Org_Map;
