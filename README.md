# Welling - 정책·복지·심리 지도

전국 17개 광역시도의 정책심리지표를 시각화하는 인터랙티브 지도 애플리케이션입니다.

## 기능

- 🗺️ **인터랙티브 지도**: Leaflet 기반 한국 지도 시각화
- 📊 **데이터 분석**: Chart.js를 활용한 지역별 통계 차트
- 🔄 **실시간 데이터**: 백엔드 API와 실시간 연동
- 💻 **터미널 로그**: 시스템 상태 실시간 모니터링

## 기술 스택

- **Frontend**: React 19, Vite
- **상태 관리**: Zustand
- **지도**: Leaflet
- **차트**: Chart.js, react-chartjs-2
- **HTTP 클라이언트**: Axios

## 설치 및 실행

### 1. 의존성 설치
```bash
npm install
```

### 2. 환경 변수 설정
`.env` 파일을 생성하고 백엔드 API URL을 설정하세요:
```env
VITE_API_URL=http://localhost:5000
```

### 3. 개발 서버 실행
```bash
npm run dev
```

### 4. 빌드
```bash
npm run build
```

## 백엔드 API

이 프로젝트는 다음 백엔드 API 엔드포인트를 사용합니다:

- `GET /api/analytics/region-summary` - 전국 17개 지역 요약 데이터
- `POST /api/analytics/update-gap` - Gap 점수 갱신
- `GET /api/region/:name` - 특정 지역 데이터 조회
- `POST /api/region` - 지역 데이터 생성
- `PUT /api/region/:name` - 지역 데이터 수정
- `DELETE /api/region/:name` - 지역 데이터 삭제
- `POST /api/analysis/run-map` - 지도 분석 파이프라인 실행

## 프로젝트 구조

```
src/
├── components/     # React 컴포넌트
├── services/       # API 서비스
├── store/          # Zustand 상태 관리
├── App.jsx         # 메인 앱 컴포넌트
└── utils.js        # 유틸리티 함수
```

## GeoJSON 데이터

한국 지도 데이터는 `public/skorea-provinces-2018-geo.json` 파일이 필요합니다.
파일이 없을 경우 앱 내에서 직접 업로드할 수 있습니다.
