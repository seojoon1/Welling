import axios from 'axios';

// Axios 인스턴스 생성
const api = axios.create({
  baseURL: '/api', // 프록시를 통해 /api로 시작하는 요청은 백엔드로 전달됨
  timeout: 30000, // 30초 타임아웃 (LLM 응답이 느릴 수 있음)
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 (필요시 토큰 추가 등)
api.interceptors.request.use(
  (config) => {
    // 토큰이 필요한 경우 여기서 추가
    // const token = localStorage.getItem('token');
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 (에러 처리)
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API 에러:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ============================================
// Analytics API
// ============================================

/**
 * 지도 데이터 표시 - 지역별 종합 점수 조회
 * @returns {Promise} 지역별 여론, 정책, Gap 점수 데이터
 */
export const getRegionSummary = async () => {
  try {
    const response = await api.get('/analytics/region-summary');

    // 응답에 error 필드가 있으면 실패로 처리
    if (response.data && response.data.error) {
      return { success: false, error: response.data.error };
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * Gap 자동 갱신
 * @returns {Promise} 갱신 결과
 */
export const updateGap = async () => {
  try {
    const response = await api.post('/analytics/update-gap');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// Analysis API (LLM 분석)
// ============================================

/**
 * 지역 진단 패널 - LLM 분석 결과 조회
 * @param {string} regionName - 지역명 (예: '서울')
 * @returns {Promise} LLM 분석 결과
 */
export const getDiagnosis = async (regionName) => {
  try {
    const response = await api.get(`/analysis/diagnosis/${regionName}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// RAG API (Cross-Region RAG)
// ============================================

/**
 * 정책 개선 카드 - Cross-Region RAG 조회
 * @param {string} regionName - 지역명 (예: '서울')
 * @returns {Promise} RAG 기반 정책 개선 카드
 */
export const getActionCard = async (regionName) => {
  try {
    const response = await api.get(`/rag/action/${regionName}`);
    // console.log('🎯 [API] RAG Action Card Response:', response.data);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// ============================================
// 추가 유틸리티 함수
// ============================================

/**
 * 특정 지역의 상세 데이터 조회
 * @param {string} regionName - 지역명
 * @returns {Promise} 지역 상세 데이터
 */
export const getRegionDetail = async (regionName) => {
  try {
    const response = await api.get(`/analytics/region/${regionName}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 전체 지역 목록 조회
 * @returns {Promise} 지역 목록
 */
export const getRegionList = async () => {
  try {
    const response = await api.get('/analytics/regions');
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

/**
 * 지역별 상위 Gap 주제 조회
 * @param {string} regionName - 지역명 (예: '서울')
 * @returns {Promise} 상위 Gap 주제 데이터
 */
export const getTopGaps = async (regionName) => {
  try {
    const response = await api.get(`/regions/${regionName}/top-gaps/`);

    // 응답에 error 필드가 있으면 실패로 처리
    if (response.data && response.data.error) {
      return { success: false, error: response.data.error };
    }

    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

// 기본 export
export default api;
