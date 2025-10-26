import styles from './org_topicComparison.module.css';

function Org_TopicComparison({ selectedRegion = '서울특별시' }) {
  // 지역별 주제 데이터
  const regionTopicsData = {
    '서울특별시': [
      { name: '주거\n환경', opinion: 85, policy: 42, gap: 43 },
      { name: '의료\n보건', opinion: 78, policy: 35, gap: 43 },
      { name: '정책\n효능감', opinion: 65, policy: 38, gap: 27 }
    ],
    '부산광역시': [
      { name: '주거\n환경', opinion: 55, policy: 50, gap: 5 },
      { name: '의료\n보건', opinion: 52, policy: 48, gap: 4 },
      { name: '정책\n효능감', opinion: 50, policy: 46, gap: 4 }
    ],
    '대구광역시': [
      { name: '주거\n환경', opinion: 43, policy: 38, gap: 5 },
      { name: '의료\n보건', opinion: 41, policy: 35, gap: 6 },
      { name: '정책\n효능감', opinion: 39, policy: 33, gap: 6 }
    ],
    '인천광역시': [
      { name: '주거\n환경', opinion: 50, policy: 45, gap: 5 },
      { name: '의료\n보건', opinion: 48, policy: 42, gap: 6 },
      { name: '정책\n효능감', opinion: 46, policy: 40, gap: 6 }
    ],
    '광주광역시': [
      { name: '주거\n환경', opinion: 41, policy: 36, gap: 5 },
      { name: '의료\n보건', opinion: 39, policy: 33, gap: 6 },
      { name: '정책\n효능감', opinion: 37, policy: 31, gap: 6 }
    ],
    '대전광역시': [
      { name: '주거\n환경', opinion: 46, policy: 42, gap: 4 },
      { name: '의료\n보건', opinion: 44, policy: 40, gap: 4 },
      { name: '정책\n효능감', opinion: 42, policy: 38, gap: 4 }
    ],
    '울산광역시': [
      { name: '주거\n환경', opinion: 52, policy: 47, gap: 5 },
      { name: '의료\n보건', opinion: 50, policy: 45, gap: 5 },
      { name: '정책\n효능감', opinion: 48, policy: 43, gap: 5 }
    ],
    '경기도': [
      { name: '주거\n환경', opinion: 49, policy: 45, gap: 4 },
      { name: '의료\n보건', opinion: 47, policy: 43, gap: 4 },
      { name: '정책\n효능감', opinion: 45, policy: 41, gap: 4 }
    ],
    '강원특별자치도': [
      { name: '주거\n환경', opinion: 45, policy: 41, gap: 4 },
      { name: '의료\n보건', opinion: 43, policy: 39, gap: 4 },
      { name: '정책\n효능감', opinion: 41, policy: 37, gap: 4 }
    ],
    '충청북도': [
      { name: '주거\n환경', opinion: 42, policy: 38, gap: 4 },
      { name: '의료\n보건', opinion: 40, policy: 36, gap: 4 },
      { name: '정책\n효능감', opinion: 38, policy: 34, gap: 4 }
    ],
    '충청남도': [
      { name: '주거\n환경', opinion: 44, policy: 40, gap: 4 },
      { name: '의료\n보건', opinion: 42, policy: 38, gap: 4 },
      { name: '정책\n효능감', opinion: 40, policy: 36, gap: 4 }
    ],
    '전북특별자치도': [
      { name: '주거\n환경', opinion: 40, policy: 36, gap: 4 },
      { name: '의료\n보건', opinion: 38, policy: 34, gap: 4 },
      { name: '정책\n효능감', opinion: 36, policy: 32, gap: 4 }
    ],
    '전라남도': [
      { name: '주거\n환경', opinion: 38, policy: 34, gap: 4 },
      { name: '의료\n보건', opinion: 36, policy: 32, gap: 4 },
      { name: '정책\n효능감', opinion: 34, policy: 30, gap: 4 }
    ],
    '경상북도': [
      { name: '주거\n환경', opinion: 34, policy: 30, gap: 4 },
      { name: '의료\n보건', opinion: 32, policy: 28, gap: 4 },
      { name: '정책\n효능감', opinion: 30, policy: 26, gap: 4 }
    ],
    '경상남도': [
      { name: '주거\n환경', opinion: 48, policy: 43, gap: 5 },
      { name: '의료\n보건', opinion: 46, policy: 41, gap: 5 },
      { name: '정책\n효능감', opinion: 44, policy: 39, gap: 5 }
    ],
    '제주특별자치도': [
      { name: '주거\n환경', opinion: 57, policy: 52, gap: 5 },
      { name: '의료\n보건', opinion: 55, policy: 50, gap: 5 },
      { name: '정책\n효능감', opinion: 53, policy: 48, gap: 5 }
    ],
    '세종특별자치시': [
      { name: '주거\n환경', opinion: 51, policy: 46, gap: 5 },
      { name: '의료\n보건', opinion: 49, policy: 44, gap: 5 },
      { name: '정책\n효능감', opinion: 47, policy: 42, gap: 5 }
    ]
  };

  const topics = regionTopicsData[selectedRegion] || regionTopicsData['서울특별시'];

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
