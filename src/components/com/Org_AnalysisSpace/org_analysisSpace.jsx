import { useState, useEffect } from 'react';
import { Org_TabBar_AI } from '../Org_TabBar/org_tabBar';
import styles from './org_analysisSpace.module.css';
import { getDiagnosis, getActionCard } from '../../../services/api';

function Org_AnalysisSpace({ selectedRegion = '서울특별시' }) {
  const [diagnosisData, setDiagnosisData] = useState(null);
  const [ragData, setRagData] = useState(null);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [ragLoading, setRagLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('AI 인사이트');

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

  // 진단 데이터 불러오기 (독립적)
  useEffect(() => {
    const fetchDiagnosis = async () => {
      const regionName = getShortRegionName(selectedRegion);
      setDiagnosisLoading(true);
      setDiagnosisData(null);

      try {
        console.log('📊 [Diagnosis] Calling API:', `/api/analysis/diagnosis/${regionName}`);
        const diagnosisResult = await getDiagnosis(regionName);
        console.log('📊 [Diagnosis] Result:', diagnosisResult);

        if (diagnosisResult.success) {
          console.log('✅ [Diagnosis] Data:', diagnosisResult.data);
          setDiagnosisData(diagnosisResult.data);
        } else {
          console.error('❌ [Diagnosis] Failed:', diagnosisResult.error);
        }
      } catch (err) {
        console.error('❌ [Diagnosis] Error:', err);
      } finally {
        setDiagnosisLoading(false);
      }
    };

    fetchDiagnosis();
  }, [selectedRegion]);

  // RAG 정책 카드 불러오기 (독립적)
  useEffect(() => {
    const fetchRAG = async () => {
      const regionName = getShortRegionName(selectedRegion);
      setRagLoading(true);
      setRagData(null);

      try {
        console.log('🎯 [RAG] Calling API:', `/api/rag/action/${regionName}`);
        const actionResult = await getActionCard(regionName);
        console.log('🎯 [RAG] Result:', actionResult);

        if (actionResult.success) {
          console.log('✅ [RAG] Data:', actionResult.data);
          setRagData(actionResult.data);
        } else {
          console.error('❌ [RAG] Failed:', actionResult.error);
        }
      } catch (err) {
        console.error('❌ [RAG] Error:', err);
      } finally {
        setRagLoading(false);
      }
    };

    fetchRAG();
  }, [selectedRegion]);

  return (
    <div className={styles.layoutBox}>
      {/* 상단 탭바 */}
      <Org_TabBar_AI activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* 메인 콘텐츠 영역 */}
      <div className={styles.contentArea}>
        {/* AI 인사이트 탭 */}
        {activeTab === 'AI 인사이트' && (
          <>
            {diagnosisLoading ? (
              <div className={styles.loading}>분석 데이터를 불러오는 중...</div>
            ) : diagnosisData ? (
              <>
                <div className={styles.titleSection}>
                  <h2 className={styles.title}>{selectedRegion} 지역 분석</h2>
                </div>

                {/* 상위 주제 */}
                {/* {diagnosisData.result?.top_topics && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>상위 주제</h3>
                    <p className={styles.text}>{diagnosisData.result.top_topics}</p>
                  </div>
                )} */}

                {/* 여론 활발도 */}
                {/* {diagnosisData.scarcity_level && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>여론 활발도</h3>
                    <p className={styles.text}>{diagnosisData.scarcity_level}</p>
                  </div>
                )} */}

                {/* 문제 요약 */}
                {diagnosisData.result?.problem_summary && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>문제 요약</h3>
                    <p className={styles.text}>{diagnosisData.result.problem_summary}</p>
                    <div className={styles.dataMaketime}>
                      {`데이터 생성 시간: ${diagnosisData.diagnosed_at || 'N/A'}`}
                    </div>
                  </div>
                )}

                {/* 희소성 인사이트 */}
                {/* {diagnosisData.result?.scarcity_insight && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>여론 분석</h3>
                    <p className={styles.text}>{diagnosisData.result.scarcity_insight}</p>
                  </div>
                )} */}

                {/* 데이터 출처 */}
                {/* {diagnosisData.record_count && (
                  <div className={styles.infoBox}>
                    <p className={styles.infoFooter}>
                      분석 데이터: {diagnosisData.record_count}개 의견 기반
                    </p>
                  </div>
                )} */}
              </>
            ) : (
              <div className={styles.section}>
                <p className={styles.text}>데이터가 없습니다.</p>
              </div>
            )}
          </>
        )}

        {/* AI 컨설팅 탭 - RAG 정책 개선 카드 */}
        {activeTab === 'AI 컨설팅' && (
          <>
            {ragLoading ? (
              <div className={styles.loading}>정책 제안을 불러오는 중...</div>
            ) : ragData ? (
              <>
                <div className={styles.titleSection}>
                  <h2 className={styles.title}>{selectedRegion} 정책 개선 제안</h2>
                </div>

                {/* 주요 주제 */}
                {ragData.main_topic && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>주요 주제</h3>
                    <p className={styles.text}>{ragData.main_topic}</p>
                  </div>
                )}

                {/* RAG 정책 제안 */}
                {ragData.result?.rag_action_card && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>정책 제안</h3>
                    <p className={styles.text}>{ragData.result.rag_action_card}</p>
                  </div>
                )}

                {/* 참고 정책 */}
                {ragData.result?.reference_policies && ragData.result.reference_policies.length > 0 && (
                  <div className={styles.sectionConsulting}>
                    <h3 className={styles.sectionTitle}>참고 정책</h3>
                    <div className={styles.infoBox}>
                      <ul style={{ margin: 0, paddingLeft: '20px' }}>
                        {ragData.result.reference_policies.map((policyName, index) => {

                          // const regionName = ragData.result.reference_regions?.[index] || '';
                          // console.log(`[Policy ${index}] Name: "${policyName}", Region: "${regionName}"`);
                          // console.log('Full ragData.result:', ragData.result);
                          return (
                            <li key={index} className={styles.text} style={{ marginBottom: '8px' }}>
                              {policyName} {/*({regionName})*/}
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className={styles.section}>
                <p className={styles.text}>데이터가 없습니다.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Org_AnalysisSpace;
