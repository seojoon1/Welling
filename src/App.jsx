// src/App.jsx
import { useState } from 'react';
import styles from './App.module.css';
import Org_topGNB from './components/com/Org_topGNB/org_topGNB.jsx';
import Org_leftGNB from './components/com/Org_leftGNB/org_leftGNB.jsx';
import Org_MapWithTabBar from './components/com/Org_MapWithTabBar/org_mapWithTabBar.jsx';
import Org_ScoreComparison from './components/com/Org_ScoreComparison/org_scoreComparison.jsx';
import Org_TopicComparison from './components/com/Org_TopicComparison/org_topicComparison.jsx';
import Org_AnalysisSpace from './components/com/Org_AnalysisSpace/org_analysisSpace.jsx';

export default function App() {
  const [selectedRegion, setSelectedRegion] = useState('서울특별시');

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
                <Org_ScoreComparison selectedRegion={selectedRegion} />
                <Org_TopicComparison selectedRegion={selectedRegion} />
              </div>

              {/* 분석 공간 */}
              <div className={styles.analysisSection}>
                <Org_AnalysisSpace />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
