// src/services/api.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    console.log(`[API Request] ${config.method?.toUpperCase()} ${config.url}`, config.data);
    return config;
  },
  (error) => {
    console.error('[API Request Error]', error);
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    console.log(`[API Response] ${response.config.url}`, response.data);
    return response;
  },
  (error) => {
    console.error('[API Response Error]', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// API 메서드
export const api = {
  // Analytics API
  // 전국 17개 지역의 정책심리지표 요약 데이터 반환 (지도 시각화용)
  getRegionSummary: async () => {
    try {
      const response = await apiClient.get('/api/analytics/region-summary');
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ 지역 요약 데이터 조회 실패: ${error.message}`
      };
    }
  },

  // DB 내 모든 지역의 Gap 점수 자동 갱신 (지도 데이터 갱신용)
  updateGap: async () => {
    try {
      const response = await apiClient.post('/api/analytics/update-gap');
      return {
        success: true,
        data: response.data,
        message: '✓ Gap 점수 갱신 완료'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ Gap 점수 갱신 실패: ${error.message}`
      };
    }
  },

  // Region API (지역별 정책·심리 점수 수정, 삭제, 조회)
  // 지역 데이터 조회
  getRegion: async (regionName) => {
    try {
      const response = await apiClient.get(`/api/region/${regionName}`);
      return {
        success: true,
        data: response.data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message
      };
    }
  },

  // 지역 데이터 생성
  createRegion: async (regionData) => {
    try {
      const response = await apiClient.post('/api/region', regionData);
      return {
        success: true,
        data: response.data,
        message: '✓ 지역 데이터 생성 완료'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ 지역 데이터 생성 실패: ${error.message}`
      };
    }
  },

  // 지역 데이터 수정
  updateRegion: async (regionName, regionData) => {
    try {
      const response = await apiClient.put(`/api/region/${regionName}`, regionData);
      return {
        success: true,
        data: response.data,
        message: '✓ 지역 데이터 수정 완료'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ 지역 데이터 수정 실패: ${error.message}`
      };
    }
  },

  // 지역 데이터 삭제
  deleteRegion: async (regionName) => {
    try {
      const response = await apiClient.delete(`/api/region/${regionName}`);
      return {
        success: true,
        data: response.data,
        message: '✓ 지역 데이터 삭제 완료'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ 지역 데이터 삭제 실패: ${error.message}`
      };
    }
  },

  // Analysis API
  // 지도용 분석 파이프라인 실행 (전체 지역 점수 일괄 계산)
  runMapAnalysis: async () => {
    try {
      const response = await apiClient.post('/api/analysis/run-map');
      return {
        success: true,
        data: response.data,
        message: '✓ 지도 분석 파이프라인 실행 완료'
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        message: `✗ 지도 분석 파이프라인 실행 실패: ${error.message}`
      };
    }
  }
};

export default apiClient;
