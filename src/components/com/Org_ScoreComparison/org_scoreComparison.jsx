import styles from './org_scoreComparison.module.css';

function Org_ScoreComparison({ selectedRegion = '서울특별시' }) {
  // 지역별 데이터
  const regionData = {
    '서울특별시': { opinion: 100, policy: 38, gap: 62 },
    '부산광역시': { opinion: 52, policy: 48, gap: 4 },
    '대구광역시': { opinion: 41, policy: 35, gap: 6 },
    '인천광역시': { opinion: 48, policy: 42, gap: 6 },
    '광주광역시': { opinion: 39, policy: 33, gap: 6 },
    '대전광역시': { opinion: 44, policy: 40, gap: 4 },
    '울산광역시': { opinion: 50, policy: 45, gap: 5 },
    '경기도': { opinion: 47, policy: 43, gap: 4 },
    '강원특별자치도': { opinion: 43, policy: 39, gap: 4 },
    '충청북도': { opinion: 40, policy: 36, gap: 4 },
    '충청남도': { opinion: 42, policy: 38, gap: 4 },
    '전북특별자치도': { opinion: 38, policy: 34, gap: 4 },
    '전라남도': { opinion: 36, policy: 32, gap: 4 },
    '경상북도': { opinion: 32, policy: 28, gap: 4 },
    '경상남도': { opinion: 46, policy: 41, gap: 5 },
    '제주특별자치도': { opinion: 55, policy: 50, gap: 5 },
    '세종특별자치시': { opinion: 49, policy: 44, gap: 5 },
  };

  const data = regionData[selectedRegion] || regionData['서울특별시'];

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
          <div className={styles.bar} style={{ height: `${data.opinion * 1.65}px` }}>
            <div className={`${styles.barFill} ${styles.barRed}`}></div>
          </div>

          <div className={styles.bar} style={{ height: `${data.policy * 1.65}px` }}>
            <div className={`${styles.barFill} ${styles.barBlue}`}></div>
          </div>

          <div className={styles.bar} style={{ height: `${data.gap * 1.65}px` }}>
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
