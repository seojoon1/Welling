import styles from './org_topicComparison.module.css';

function Org_TopicComparison() {
  // 추후 API 연결 예정
  const topics = [
    {
      name: '주거\n환경',
      opinion: 72,
      policy: 72,
      gap: 24
    },
    {
      name: '의료\n보건',
      opinion: 72,
      policy: 72,
      gap: 24
    },
    {
      name: '정책\n효능감',
      opinion: 72,
      policy: 72,
      gap: 24
    }
  ];

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
        <div className={styles.scaleLabels}>
          <span>0</span>
          <span>10</span>
          <span>20</span>
          <span>30</span>
          <span>40</span>
          <span>50</span>
          <span>60</span>
          <span>70</span>
          <span>80</span>
          <span>90</span>
          <span>100</span>
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
