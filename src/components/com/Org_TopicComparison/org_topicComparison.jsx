import { useState, useEffect } from 'react';
import styles from './org_topicComparison.module.css';
import { getTopGaps } from '../../../services/api';

function Org_TopicComparison({ selectedRegion = '서울특별시' }) {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);

  // 지역명 변환 (서울특별시 -> 서울)
  const getShortRegionName = (fullName) => {
    const mapping = {
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
    return mapping[fullName] || fullName;
  };

  // 지역 선택 시 상위 Gap 주제 데이터 불러오기
  useEffect(() => {
    const fetchTopGaps = async () => {
      const regionName = getShortRegionName(selectedRegion);
      setLoading(true);

      try {
        console.log('📈 [TopGaps] Calling API:', `/api/regions/${regionName}/top-gaps/`);
        const result = await getTopGaps(regionName);
        console.log('📈 [TopGaps] Result:', result);

        if (result.success) {
          console.log('✅ [TopGaps] Data:', result.data);

          // API 응답에서 top_gap_topics 배열 추출
          const topicsArray = result.data.top_gap_topics || result.data;

          // API 응답 데이터를 차트 형식으로 변환
          const formattedTopics = topicsArray.map(topic => ({
            name: topic.topic || topic.topic_name || topic.name,
            opinion: topic.sentiment_score || topic.opinion || 0,
            policy: topic.policy_score || topic.policy || 0,
            gap: topic.gap || topic.gap_score || 0,
          }));

          console.log('✅ [TopGaps] Formatted:', formattedTopics);
          setTopics(formattedTopics);
        } else {
          console.error('❌ [TopGaps] Failed:', result.error);
          setTopics([]);
        }
      } catch (err) {
        console.error('❌ [TopGaps] Error:', err);
        setTopics([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTopGaps();
  }, [selectedRegion]);

  if (loading || topics.length === 0) {
    return (
      <div className={styles.container}>
        <h2 className={styles.title}>상위 주제 별 비교</h2>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 1 }}>
          <p style={{ color: '#808080', fontSize: '14px' }}>
            {loading ? '데이터를 불러오는 중...' : '데이터가 없습니다.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>상위 주제 별 비교</h2>

      <div className={styles.legend}>
        <div className={styles.legendItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
            <path d="M0.750002 14L0.75 0" stroke="#F96B6B" strokeWidth="1.5"/>
          </svg>
          <span>여론</span>
        </div>
        <div className={styles.legendItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
            <path d="M0.750002 14L0.75 0" stroke="#7781F6" strokeWidth="1.5"/>
          </svg>
          <span>정책</span>
        </div>
        <div className={styles.legendItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="14" viewBox="0 0 2 14" fill="none">
            <path d="M0.750002 14L0.75 0" stroke="#8563BA" strokeWidth="1.5"/>
          </svg>
          <span>Gap</span>
        </div>
      </div>

      <div className={styles.chartArea}>
        <div className={styles.scaleContainer}>
          <div className={styles.scaleLabels}>
            {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
              <span key={value} style={{ left: `${value}%` }}>{value}</span>
            ))}
          </div>

          <div className={styles.gridLines}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1" height="218" viewBox="0 0 1 218" fill="none" className={styles.gridLine} style={{ left: '0%' }}>
              <path d="M0.5 0L0.50001 218" stroke="#DDDDDD"/>
            </svg>
            {[10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((value) => (
              <svg key={value} xmlns="http://www.w3.org/2000/svg" width="1" height="218" viewBox="0 0 1 218" fill="none" className={styles.gridLineDashed} style={{ left: `${value}%` }}>
                <path d="M0.350098 0L0.35003 218" stroke="#DDDDDD" strokeWidth="0.7" strokeDasharray="6 6"/>
              </svg>
            ))}
          </div>
        </div>

        <div className={styles.topics}>
          {topics.map((topic, index) => (
            <div key={index} className={styles.topicRow}>
              <div className={styles.topicLabel}>
                {topic.name.split('\n').map((line, i) => (
                  <div key={i}>{line}</div>
                ))}
              </div>
              <div className={styles.bars}>
                <div className={styles.barContainer}>
                  <div
                    className={`${styles.bar} ${styles.barOpinion}`}
                    style={{ width: `${topic.opinion}%` }}
                  ></div>
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={`${styles.bar} ${styles.barPolicy}`}
                    style={{ width: `${topic.policy}%` }}
                  ></div>
                </div>
                <div className={styles.barContainer}>
                  <div
                    className={`${styles.bar} ${styles.barGap}`}
                    style={{ width: `${topic.gap}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Org_TopicComparison;
