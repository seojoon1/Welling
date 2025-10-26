import styles from './org_scoreComparison.module.css';

function Org_ScoreComparison() {
  // 추후 API 연결 예정
  const data = {
    opinion: 72,
    policy: 72,
    gap: 24
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>종합 점수 비교</h2>

      <div className={styles.scoreGrid}>
        <div className={styles.scoreItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="40" viewBox="0 0 2 40" fill="none" className={styles.scoreLine}>
            <path d="M0.750002 40L0.75 0" stroke="#F96B6B" strokeWidth="1.5"/>
          </svg>
          <div className={styles.scoreContent}>
            <div className={styles.label}>여론</div>
            <div className={styles.value}>
              {data.opinion}<span className={styles.maxValue}>/100</span>
            </div>
          </div>
        </div>

        <div className={styles.scoreItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="40" viewBox="0 0 2 40" fill="none" className={styles.scoreLine}>
            <path d="M0.750002 40L0.75 0" stroke="#7781F6" strokeWidth="1.5"/>
          </svg>
          <div className={styles.scoreContent}>
            <div className={styles.label}>정책</div>
            <div className={styles.value}>
              {data.policy}<span className={styles.maxValue}>/100</span>
            </div>
          </div>
        </div>

        <div className={styles.scoreItem}>
          <svg xmlns="http://www.w3.org/2000/svg" width="2" height="40" viewBox="0 0 2 40" fill="none" className={styles.scoreLine}>
            <path d="M0.750002 40L0.75 0" stroke="#8563BA" strokeWidth="1.5"/>
          </svg>
          <div className={styles.scoreContent}>
            <div className={styles.label}>Gap</div>
            <div className={styles.value}>{data.gap}</div>
          </div>
        </div>
      </div>

      <div className={styles.chartFrame}>
        <div className={styles.chartContainer}>
          <div className={styles.bar} style={{ height: `${data.opinion * (165/72)}px` }}>
            <div className={`${styles.barFill} ${styles.barRed}`}></div>
          </div>

          <div className={styles.bar} style={{ height: `${data.policy * (165/72)}px` }}>
            <div className={`${styles.barFill} ${styles.barBlue}`}></div>
          </div>

          <div className={styles.bar} style={{ height: `${data.gap * (165/72)}px` }}>
            <div className={`${styles.barFill} ${styles.barPurple}`}></div>
          </div>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" width="258" height="1" viewBox="0 0 258 1" fill="none" className={styles.baseline}>
          <path d="M0 0.5H258" stroke="#DDDDDD"/>
        </svg>
      </div>
    </div>
  );
}

export default Org_ScoreComparison;
