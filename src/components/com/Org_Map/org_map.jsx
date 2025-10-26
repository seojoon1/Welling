import { useState, useEffect } from 'react';
import styles from './org_map.module.css';

function Org_Map() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [svgContents, setSvgContents] = useState({});

  // 각 지역의 위치와 크기 정보
  // Figma에서 확인한 X, Y, W, H 값을 여기에 입력하세요
  const regionPositions = {
    'KR11': { name: '서울', left: 199.2756, top: 109.3824, width: 37.6856, height: 30.4024 },
    'KR26': { name: '부산', left: 403.9907, top: 397.6476, width: 22.7936, height: 22.7936 },
    'KR27': { name: '대구', left: 359.0314, top: 310.633, width:27.2329 , height: 27.2329 },
    'KR28': { name: '인천', left: 159.2182, top: 124.5557, width: 40.2597, height:21.5798 },
    'KR29': { name: '광주', left: 200.973, top: 398.5359, width: 17.7243, height: 12.734},
    'KR30': { name: '대전', left: 239.1866, top: 253.2231, width: 24.0749, height: 30.0537 },
    'KR31': { name: '울산', left: 408.8999, top: 350.5209, width: 43.8339, height: 41.2038},
    'KR41': { name: '경기', left: -6, top: 48.8242, width: 294.1591, height: 153.014 },
    'KR42': { name: '강원', left: 217.8, top: -2, width: 229.285, height: 232.3196 },
    'KR43': { name: '충북', left: 240, top: 167, width: 131.5016, height: 141.5497 },
    'KR44': { name: '충남', left: 136.8, top: 186.6072, width: 135.2897, height: 121.2628},
    'KR45': { name: '전북', left: 147.6422, top: 296.6736, width: 152.4745, height:96.4345 },
    'KR46': { name: '전남', left: 37.4967, top: 377.2702, width: 249.4485, height: 162.0505 },
    'KR47': { name: '경북', left: 296.9477, top: 100.23, width: 286.3364, height: 286.3364},
    'KR48': { name: '경남', left: 278.1304, top: 327.4575, width: 151.4629, height: 142.8985},
    'KR49': { name: '제주', left: 141.4823, top: 572.9426, width: 72.4271, height: 40.0574 },
    'KR50': { name: '세종', left: 223.9202, top: 229.2156, width: 27.5816, height: 28.4583 },
  };

  // SVG 파일들을 로드
  useEffect(() => {
    const loadSVGs = async () => {
      const contents = {};
      for (const code of Object.keys(regionPositions)) {
        try {
          const response = await fetch(`/maps/${code}.svg`);
          const text = await response.text();
          contents[code] = text;
        } catch (error) {
          console.error(`Failed to load ${code}.svg:`, error);
        }
      }
      setSvgContents(contents);
    };

    loadSVGs();
  }, []);

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
              console.log(info.name);
              e.currentTarget.style.zIndex = '1000';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.zIndex = String(index + 1);
            }}
            dangerouslySetInnerHTML={{ __html: svgContents[code] || '' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Org_Map;
