// src/App.jsx
import { useState, useEffect } from 'react';
import styles from './App.module.css';
import Org_topGNB from './components/com/Org_topGNB/org_topGNB.jsx';
import Org_leftGNB from './components/com/Org_leftGNB/org_leftGNB.jsx';
import Org_MapWithTabBar from './components/com/Org_MapWithTabBar/org_mapWithTabBar.jsx';
import Org_ScoreComparison from './components/com/Org_ScoreComparison/org_scoreComparison.jsx';
import Org_TopicComparison from './components/com/Org_TopicComparison/org_topicComparison.jsx';
import Org_AnalysisSpace from './components/com/Org_AnalysisSpace/org_analysisSpace.jsx';
import { getRegionSummary } from './services/api';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState('서울특별시');
  const [regionData, setRegionData] = useState({});

  // 지역명 매핑 (간단한 이름 형태)
  const regionNameMap = {
    '서울특별시': '서울',
    '부산광역시': '부산',
    '대구광역시': '대구',
    '인천광역시': '인천',
    '광주광역시': '광주',
    '대전광역시': '대전',
    '울산광역시': '울산',
    '세종특별자치시': '세종',
    '경기도': '경기',
    '강원특별자치도': '강원',
    '충청북도': '충북',
    '충청남도': '충남',
    '전북특별자치도': '전북',
    '전라남도': '전남',
    '경상북도': '경북',
    '경상남도': '경남',
    '제주특별자치도': '제주',
  };

  // API에서 지역 데이터 불러오기
  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const result = await getRegionSummary();

        if (result.success) {
          // API 응답이 {count, data} 형태인 경우 data 추출
          let regions = result.data.data || result.data;

          if (!Array.isArray(regions)) {
            regions = Object.values(regions);
          }

          const formattedData = {};
          regions.forEach(region => {
            // region.region_name (예: '서울')을 전체 이름으로 변환
            const fullName = Object.entries(regionNameMap).find(
              ([full, short]) => short === region.region_name
            )?.[0];

            if (fullName) {
              formattedData[fullName] = {
                sentiment: region.sentiment_score || 0,
                policy: region.policy_score || 0,
                gap: region.gap_score || 0,
              };
            }
          });
          setRegionData(formattedData);
        } else {
          console.error('API failed:', result.error);
        }
      } catch (err) {
        console.error('Failed to fetch region data:', err);
      }
    };

    fetchRegionData();
  }, []);

  const handleRegionSelect = (regionName) => {
    setSelectedRegion(regionName);
  };

  return (
    <div className={styles.root}>
      {/* 상단 헤더 */}
      <Org_topGNB />

      {/* 하단 영역 (사이드바 + 메인 콘텐츠) */}
      <div className={styles.contentWrapper}>
        {/* 왼쪽 사이드바 */}
        <Org_leftGNB
          selectedRegion={selectedRegion}
          onRegionSelect={handleRegionSelect}
        />

        {/* 메인 콘텐츠 */}
        <div className={styles.mainContent}>
          <div className={styles.topSection}>
            {/* 지도 영역 */}
            <div className={styles.mapSection}>
              <h2 className={styles.mapTitle}>{selectedRegion}의 WELLING</h2>
              <Org_MapWithTabBar
                onRegionSelect={handleRegionSelect}
                selectedRegionName={selectedRegion}
              />
            </div>

            {/* 오른쪽 컬럼 (차트 + 분석 공간) */}
            <div className={styles.rightColumn}>
              {/* 차트 영역 */}
              <div className={styles.chartSection}>
                <Org_ScoreComparison
                  selectedRegion={selectedRegion}
                  regionData={regionData}
                />
                <Org_TopicComparison
                  selectedRegion={selectedRegion}
                />
              </div>

              {/* 분석 공간 */}
              <div className={styles.analysisSection}>
                <Org_AnalysisSpace selectedRegion={selectedRegion} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
