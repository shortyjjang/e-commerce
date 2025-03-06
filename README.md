# E-Commerce 애플리케이션

Next.js와 React Query를 활용한 현대적인 이커머스 웹 애플리케이션입니다. 상품 목록, 카테고리 필터링, 검색 기능 등을 제공합니다.

## 아키텍처

이 프로젝트는 다음과 같은 아키텍처로 구성되어 있습니다:

### 디렉토리 구조

```
src/
├── app/                # Next.js 기반 라우팅 구성
├── features/           # 기능별 컴포넌트
│   ├── ProductList/    # 상품 목록 관련 컴포넌트
│   │   ├── CategoryList/ # 카테고리 목록 컴포넌트
│   │   ├── ProductItem/ # 개별 상품 컴포넌트
│   │   └── Search/     # 검색 컴포넌트
├── query/              # API 호출 관련 함수
├── etities/            # 공통 UI 컴포넌트
├── hooks/              # 커스텀 훅
├── assets/             # 스타일, 이미지 등 정적 리소스
└── layout/             # 레이아웃 컴포넌트
```

### 주요 아키텍처 패턴

- **컴포넌트 기반 설계**: 기능별로 모듈화된 컴포넌트 구조
- **서버-클라이언트 하이브리드 렌더링**: Next.js의 SSR과 CSR을 적절히 활용
- **데이터 프리페칭**: 초기 로딩 성능 최적화를 위한 서버 사이드 데이터 프리페칭
- **상태 관리**: React Query를 사용한 서버 상태 관리
- **코드 최적화**: React.memo, useCallback, useMemo를 활용한 렌더링 최적화
- **무한 스크롤**: IntersectionObserver API를 활용한 효율적인 데이터 로딩

## 페이지별 기능 명세서

### 메인 페이지 (홈)

- 상품 카테고리 목록 표시
- 초기 카테고리의 상품 목록 표시
- 서버 사이드 데이터 프리페칭으로 초기 로딩 최적화

### 상품 목록 페이지

- 카테고리별 필터링 기능
- 키워드 검색 기능
- 무한 스크롤을 통한 상품 목록 페이징
- 상품 정보 표시 (이름, 가격, 할인율 등)
- 장바구니 추가 기능

### 상품 상세 페이지

- 상품 상세 정보 표시
- 옵션 선택 기능
- 장바구니 추가 및 바로 구매 기능

## 사용한 주요 라이브러리

| 라이브러리 | 버전 | 사용 목적 |
|------------|------|-----------|
| React | 19.0.0 | UI 컴포넌트 구현 |
| Next.js | 15.2.1 | 서버 사이드 렌더링 및 라우팅 |
| TanStack React Query | 5.67.1 | 서버 상태 관리 및 데이터 페칭 |
| TypeScript | 5.x | 타입 안전성 확보 |
| Tailwind CSS | 4.x | 스타일링 |
| Tailwind Merge | 3.0.2 | Tailwind 클래스 병합 유틸리티 |
| Testing Library | 16.2.0 | 컴포넌트 테스트 |
| Jest | 29.7.0 | 테스트 러너 |
| Framer Motion | 12.4.10 | 애니메이션 구현 |
| React Intersection Observer | 9.16.0 | 무한 스크롤 구현 |

## 설정 및 실행 방법

### 필수 요구사항

- Node.js 18.x 이상
- npm 또는 yarn 패키지 매니저

### 개발 환경 설정

1. 종속성 설치
   ```bash
   npm install
   # 또는
   yarn install
   ```

2. 개발 서버 실행
   ```bash
   npm run dev
   # 또는
   yarn dev
   ```
   개발 서버는 기본적으로 http://localhost:3000 에서 실행됩니다.

### 환경 변수

`.env.local` 파일을 프로젝트 루트에 생성하고 다음 환경 변수를 설정하세요:

```
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 빌드 및 배포

프로덕션 빌드 생성:
```bash
npm run build
# 또는
yarn build
```

프로덕션 서버 실행:
```bash
npm run start
# 또는
yarn start
```

### 테스트 실행

```bash
npm run test
# 또는
yarn test
```

## 라이센스

MIT
