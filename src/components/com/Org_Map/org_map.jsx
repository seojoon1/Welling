import { useState, useEffect } from 'react';
import styles from './org_map.module.css';

function Org_Map({ activeTab = '여론' }) {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [svgContents, setSvgContents] = useState({});

  // 각 지역의 위치와 크기 정보
  // Figma에서 확인한 X, Y, W, H 값을 여기에 입력하세요
  const regionPositions = {
    'KR11': { name: '서울특별시', left: 199.2756, top: 109.3824, width: 37.6856, height: 30.4024 },
    'KR26': { name: '부산광역시', left: 403.9907, top: 397.6476, width: 22.7936, height: 22.7936 },
    'KR27': { name: '대구광역시', left: 359.0314, top: 310.633, width:27.2329 , height: 27.2329 },
    'KR28': { name: '인천광역시', left: 159.2182, top: 124.5557, width: 40.2597, height:21.5798 },
    'KR29': { name: '광주광역시', left: 200.973, top: 398.5359, width: 17.7243, height: 12.734},
    'KR30': { name: '대전광역시', left: 239.1866, top: 253.2231, width: 24.0749, height: 30.0537 },
    'KR31': { name: '울산광역시', left: 408.8999, top: 350.5209, width: 43.8339, height: 41.2038},
    'KR41': { name: '경기도', left: -6, top: 48.8242, width: 294.1591, height: 153.014 },
    'KR42': { name: '강원특별자치도', left: 217.8, top: -2, width: 229.285, height: 232.3196 },
    'KR43': { name: '충청북도', left: 240, top: 167, width: 131.5016, height: 141.5497 },
    'KR44': { name: '충청남도', left: 136.8, top: 186.6072, width: 135.2897, height: 121.2628},
    'KR45': { name: '전북특별자치도', left: 147.6422, top: 296.6736, width: 152.4745, height:96.4345 },
    'KR46': { name: '전라남도', left: 37.4967, top: 377.2702, width: 249.4485, height: 162.0505 },
    'KR47': { name: '경상북도', left: 296.9477, top: 100.23, width: 286.3364, height: 286.3364},
    'KR48': { name: '경상남도', left: 278.1304, top: 327.4575, width: 151.4629, height: 142.8985},
    'KR49': { name: '제주특별자치도', left: 141.4823, top: 572.9426, width: 72.4271, height: 40.0574 },
    'KR50': { name: '세종특별자치시', left: 223.9202, top: 229.2156, width: 27.5816, height: 28.4583 },
  };

  // 임시 데이터 (나중에 API로 대체)
  const regionData = {
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
  };

  // 탭 타입에 따른 점 색상
  const getDotColor = () => {
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
  };

  // 지수에 따른 지역 색상 (0~100 범위를 0~1 투명도로 변환)
  const getRegionColor = (code) => {
    const score = regionData[code]?.[activeTab] || 0;
    const opacity = Math.min(Math.max(score / 100, 0.1), 1); // 최소 0.1, 최대 1
    const baseColor = getDotColor();

    // hex to rgba 변환
    const r = parseInt(baseColor.slice(1, 3), 16);
    const g = parseInt(baseColor.slice(3, 5), 16);
    const b = parseInt(baseColor.slice(5, 7), 16);

    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // SVG 파일들을 로드하고 색상 적용
  useEffect(() => {
    const loadSVGs = async () => {
      const contents = {};
      for (const code of Object.keys(regionPositions)) {
        try {
          const response = await fetch(`/maps/${code}.svg`);
          let text = await response.text();

          // SVG의 fill 색상을 지수에 따라 변경
          const color = getRegionColor(code);
          text = text.replace(/fill="[^"]*"/g, `fill="${color}"`);

          contents[code] = text;
        } catch (error) {
          console.error(`Failed to load ${code}.svg:`, error);
        }
      }
      setSvgContents(contents);
    };

    loadSVGs();
  }, [activeTab]); // activeTab이 변경되면 다시 로드

  const handleRegionClick = (code) => {
    setSelectedRegion(code);
  };

  // 크기 순으로 정렬 (큰 지역부터 먼저 렌더링, 작은 지역이 위에 오도록)
  const sortedRegions = Object.entries(regionPositions).sort(([, a], [, b]) => {
    const areaA = a.width * a.height;
    const areaB = b.width * b.height;
    return areaB - areaA; // 큰 것부터
  });

  return (
    <div className={styles.container}>
      <div className={styles.mapWrapper}>
        {sortedRegions.map(([code, info], index) => (
          <div
            key={code}
            className={`${styles.region} ${selectedRegion === code ? styles.selected : ''}`}
            style={{
              left: `${info.left}px`,
              top: `${info.top}px`,
              width: `${info.width}px`,
              height: `${info.height}px`,
              zIndex: index + 1,
            }}
            onClick={() => handleRegionClick(code)}
            onMouseEnter={(e) => {
              setHoveredRegion(code);
              e.currentTarget.style.zIndex = '1000';
            }}
            onMouseLeave={(e) => {
              setHoveredRegion(null);
              e.currentTarget.style.zIndex = String(index + 1);
            }}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setTooltipPosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            }}
            dangerouslySetInnerHTML={{ __html: svgContents[code] || '' }}
          />
        ))}

        {/* 툴팁 */}
        {hoveredRegion && regionPositions[hoveredRegion] && (
          <div
            className={styles.tooltip}
            style={{
              left: `${regionPositions[hoveredRegion].left + tooltipPosition.x + 10}px`,
              top: `${regionPositions[hoveredRegion].top + tooltipPosition.y - 60}px`,
            }}
          >
            <div className={styles.tooltipRegion}>
              {regionPositions[hoveredRegion].name}
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
