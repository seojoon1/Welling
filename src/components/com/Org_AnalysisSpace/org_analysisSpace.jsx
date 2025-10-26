import { Org_TabBar_AI } from '../Org_TabBar/org_tabBar';
import styles from './org_analysisSpace.module.css';

function Org_AnalysisSpace() {
  return (
    <div className={styles.layoutBox}>
      {/* 상단 탭바 */}
      <Org_TabBar_AI />

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.contentArea}>
        {/* 타이틀 섹션 */}
        <div className={styles.titleSection}>
          <h2 className={styles.title}>재귀 컴포넌트를 위한 SEO 적용기</h2>
        </div>

        {/* 재귀 컴포넌트 섹션 */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>재귀 컴포넌트</h3>
          <p className={styles.text}>
            사용자의 의견 조사 여부를 판단에만 랜더링니다.
          </p>
          <p className={styles.text}>
            그래서 달성한 SEO 계기 수 100건 크스트를 과학하는 동시에, 상호작용 기능을
          </p>
          <p className={styles.text}>
            제 경우는 이러한 목적과 더 보문 크스트를 갖긴 수 있습니다.
          </p>
        </div>

        {/* 이유 섹션 */}
        <div className={styles.section}>
          <p className={styles.text}>
            이유는 필수적으로 제작으로 사용자에게 이루어질 제한적인 사항을 대상 여우새와 집의 공이며,
          </p>
          <p className={styles.text}>
            그 경우 메버하는 점은 의견 조사의 팩은 크기 같은 값을 SEO 니즈는 반환을 주 야합니다.
          </p>
          <p className={styles.text}>
            특히 어플 스터이러니 이륜하 목적에 대한 관련성 및 의미가 무엇일 해면이요 스터이 활용 대크 안합니다.
          </p>
        </div>

        {/* 하단 정보 박스 */}
        <div className={styles.infoBox}>
          <p className={styles.infoTitle}>
            도입 역순으로 것이 있거나 랜게원되어서 시예티 크롤러, 산타적 동거의 공하는 도그나 크크나이
          </p>
          <p className={styles.infoSubtitle}>
            바폭용창붕나화
          </p>
          <p className={styles.infoFooter}>
            퉁퉁퉁사후르
          </p>
        </div>
      </div>
    </div>
  );
}

export default Org_AnalysisSpace;
