# AGENTS.md

## 프로젝트 개요

이 프로젝트는 **3개의 사이트를 통합 관리하는 시스템**으로, Concentrix 사이트, Concentrix 어드민, DMS(Delivery Management System)를 하나의 Nuxt 3 애플리케이션으로 구성한 멀티 사이트 관리 플랫폼입니다.

### 3개 사이트 구성

1. **Concentrix 사이트** (`/` - 공개 사이트)
   - 뉴스레터 및 채용공고 공개 조회
   - 일반 사용자 대상 공개 웹사이트
   - Concentrix 브랜딩 적용

2. **Concentrix 어드민** (`/admin/*`, `/dashboard` - 관리자 사이트)
   - 뉴스레터 및 채용공고 관리 (CRUD)
   - 관리자 사용자 관리
   - 시스템 로그 및 감사 추적
   - AWS Cognito 기반 인증

3. **DMS** (`/dms/*` - Delivery Management System)
   - 프로젝트 및 수익 관리
   - 클라이언트, 직원, 조직 관리
   - 접근 제어 관리
   - 독립적인 로그인 시스템 (Concentrix 이메일 기반)

## 기술 스택

### Frontend

- **Framework**: Nuxt 3 (Vue 3 기반)
- **UI Library**: TailwindCSS
- **Language**: TypeScript
- **State Management**: VueUse
- **Charts**: Chart.js, Vue-ChartJS

### Backend

- **Runtime**: Node.js (Nuxt 3 Server API)
- **Database**: MySQL (Prisma ORM)
- **Authentication**: AWS Cognito
- **API Documentation**: OpenAPI 3.0 (Swagger)

### DevOps & Tools

- **Package Manager**: npm
- **Linting**: ESLint + Prettier
- **Type Checking**: TypeScript
- **Build Tool**: Vite

## 프로젝트 구조

```
admin-panel/
├── app/                    # Nuxt 3 앱 설정
├── components/            # Vue 컴포넌트
│   ├── ui/               # 재사용 가능한 UI 컴포넌트
│   ├── dms/              # DMS 관련 컴포넌트
│   └── concentrix/       # Concentrix 관련 컴포넌트
├── composables/          # Vue 3 Composables
│   ├── useAuth.ts        # Admin에서 사용
│   ├── useYear.ts        # DMS에서 사용
├── layouts/              # Nuxt 레이아웃 (3개 사이트별)
│   ├── concentrix.vue   # Concentrix 사이트 레이아웃
│   ├── admin.vue        # Concentrix 어드민 레이아웃
│   ├── dms.vue          # DMS 레이아웃
│   ├── dms-login.vue    # DMS 로그인 레이아웃
│   └── scss/            # SCSS 스타일 파일
├── middleware/           # Nuxt 미들웨어 (인증 등)
├── pages/               # 페이지 라우팅 (3개 사이트별)
│   ├── index.vue        # Concentrix 사이트 홈페이지
│   ├── admin/           # Concentrix 어드민 페이지
│   ├── dms/             # DMS 페이지
│   ├── 그 외 폴더         # Concentrix 사이트의 메뉴들
│   ├── login.vue        # 일반 로그인 (admin용)
│   ├── logout.vue       # 로그아웃 (admin용)
│   └── callback.vue     # OAuth 콜백 (admin용)
├── plugins/             # Nuxt 플러그인
├── prisma/              # 데이터베이스 스키마
├── public/              # 정적 파일
├── server/              # 서버 API
│   └── api/            # API 엔드포인트
├── stores/              # 상태 관리
├── types/               # TypeScript 타입 정의
└── utils/               # 유틸리티 함수
```

## 주요 기능

### 1. Concentrix 사이트 (공개 사이트)

- **뉴스레터 조회**: 발행된 뉴스레터 공개 조회
- **채용공고 조회**: 발행된 채용공고 공개 조회
- **반응형 디자인**: 모바일/데스크톱 최적화
- **Concentrix 브랜딩**: 일관된 브랜드 경험

### 2. Concentrix 어드민 (관리자 사이트)

- **사용자 관리**: AWS Cognito 기반 인증
- **권한 관리**: 역할 기반 접근 제어
- **감사 로그**: 사용자 활동 추적
- **뉴스레터 관리**: CRUD 기능 (생성, 조회, 수정, 삭제)
- **채용공고 관리**: CRUD 기능 (생성, 조회, 수정, 삭제)
- **관리자 관리**: 관리자 계정 및 권한 관리
- **시스템 모니터링**: 로그 및 메트릭 조회

### 3. DMS (Delivery Management System)

- **프로젝트 관리**: 프로젝트 목록, 수익 관리
- **클라이언트 관리**: 클라이언트 정보 관리
- **직원 관리**: 직원 정보 관리
- **조직 관리**: 부서 및 조직 구조 관리
- **접근 제어 관리**: 사용자별 권한 설정
- **권한 관리**: 세부 권한 설정
- **사용자 관리**: 시스템 사용자 관리
- **SSO**: 외주 등 비용 관리
- **IP 접근 제어**: 등록된 IP에서만 접근 허용
- **DMS 전용 로그인**: 독립적인 인증 시스템

## API 엔드포인트

### Concentrix 어드민 API (인증 필요)

- `GET /api/admin/newsletters` - 뉴스레터 목록 조회
- `POST /api/admin/newsletters` - 뉴스레터 생성
- `GET /api/admin/newsletters/{id}` - 뉴스레터 상세 조회
- `PUT /api/admin/newsletters/{id}` - 뉴스레터 수정
- `DELETE /api/admin/newsletters/{id}` - 뉴스레터 삭제
- `GET /api/admin/recruits` - 채용공고 목록 조회
- `POST /api/admin/recruits` - 채용공고 생성
- `GET /api/admin/recruits/{id}` - 채용공고 상세 조회
- `PUT /api/admin/recruits/{id}` - 채용공고 수정
- `DELETE /api/admin/recruits/{id}` - 채용공고 삭제
- `GET /api/admin/logs` - 감사 로그 조회
- `GET /api/admin/mngr` - 관리자 정보 조회

### Concentrix 사이트 API (공개, 인증 불필요)

- `GET /api/public/newsletters` - 발행된 뉴스레터 조회
- `GET /api/public/newsletters/{id}` - 뉴스레터 상세 조회
- `GET /api/public/recruits` - 발행된 채용공고 조회
- `GET /api/public/recruits/{id}` - 채용공고 상세 조회

### DMS API (Delivery Management System 전용)

- `POST /api/dms/login` - DMS 로그인
- `POST /api/dms/logout` - DMS 로그아웃
- `GET /api/dms/session` - DMS 세션 확인
- `GET /api/dms/check-ip-access` - IP 접근 제어 확인

#### DMS 클라이언트 관리 API

- `GET /api/dms/clients` - 고객사 목록 조회
- `POST /api/dms/clients` - 고객사 생성
- `PUT /api/dms/clients/{id}` - 고객사 수정
- `DELETE /api/dms/clients/{id}` - 고객사 삭제

### 시스템 API

- `GET /api/system/metrics` - 시스템 메트릭 조회
- `GET /api/test` - 테스트 API
- `GET /api/docs/swagger` - Swagger UI
- `GET /api/docs/openapi` - OpenAPI 스펙

## 데이터베이스 스키마

### 주요 테이블

**Concentrix 시스템**

- **admin_users**: 관리자 사용자 정보
- **departments**: 부서 정보
- **roles**: 역할 정보
- **audit_logs**: 감사 로그
- **newsletters**: 뉴스레터 데이터
- **recruits**: 채용공고 데이터

**DMS 시스템**

- **dms_admin_users**: DMS 관리자 사용자 정보
- **dms_ip_access_control**: DMS IP 접근 제어 규칙
- **dms_clients**: DMS 고객사 정보 (고객사명, 생성일, 수정일)

## 환경 설정

### 필수 환경 변수

```env
# 데이터베이스
DATABASE_URL="mysql://username:password@localhost:3306/database_name"

# AWS Cognito (Concentrix 시스템)
NUXT_PUBLIC_COGNITO_USER_POOL_ID="your_user_pool_id"
NUXT_PUBLIC_COGNITO_APP_CLIENT_ID="your_app_client_id"
NUXT_PUBLIC_COGNITO_REGION="your_region"
NUXT_PUBLIC_COGNITO_DOMAIN="your_cognito_domain"
NUXT_PUBLIC_REDIRECT_SIGN_IN="http://localhost:3000/callback"
NUXT_PUBLIC_REDIRECT_SIGN_OUT="http://localhost:3000/logout"
```

## 개발 가이드

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
```

### 코드 품질 관리

```bash
# 린팅
npm run lint

# 린팅 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format

# 타입 체크
npm run type-check
```

### 데이터베이스 관리

```bash
# Prisma Studio 실행 (GUI 데이터베이스 관리)
npx prisma studio

# 데이터베이스 스키마 동기화
npx prisma db push

# 마이그레이션 생성 및 적용
npx prisma migrate dev --name migration_name

# Prisma Client 재생성
npx prisma generate
```

#### Prisma Studio

**Prisma Studio**는 데이터베이스를 시각적으로 관리할 수 있는 웹 기반 GUI 도구입니다.

**주요 기능:**

- **테이블 보기**: 모든 테이블과 데이터를 브라우저에서 확인
- **데이터 편집**: 직접 데이터 추가, 수정, 삭제 가능
- **관계 시각화**: 테이블 간 관계를 시각적으로 확인
- **스키마 확인**: 테이블 구조와 필드 정보 확인
- **실시간 업데이트**: 변경사항이 즉시 반영

**사용법:**

1. `npx prisma studio` 실행
2. 브라우저에서 `http://localhost:5555` 접속
3. 원하는 테이블 선택하여 데이터 관리

**접근 가능한 테이블:**

- `admin_users`: Concentrix 어드민 사용자
- `dms_admin_users`: DMS 관리자 사용자
- `newsletters`: 뉴스레터 데이터
- `recruits`: 채용공고 데이터
- `departments`: 부서 정보
- `roles`: 역할 정보
- `audit_logs`: 감사 로그

## 배포

### 빌드 및 배포

1. 환경 변수 설정
2. 데이터베이스 마이그레이션 실행
3. 프로덕션 빌드: `npm run build`
4. 서버에 배포

### AWS Cognito 설정

- User Pool 생성 및 설정
- App Client 생성
- 도메인 설정
- 리다이렉트 URL 설정

## 보안 고려사항

1. **멀티 사이트 인증**:
   - Concentrix 어드민: AWS Cognito 기반 인증
   - DMS: 독립적인 로그인 시스템 (Concentrix 이메일 + bcrypt)
   - Concentrix 사이트: 공개 접근 (인증 불필요)

2. **권한 관리**:
   - 역할 기반 접근 제어 (RBAC)
   - 사이트별 독립적인 권한 체계

3. **감사 로그**:
   - 모든 관리자 활동 추적
   - 사이트별 로그 분리

4. **API 보안**:
   - 사이트별 API 엔드포인트 분리
   - 인증이 필요한 API와 공개 API 분리

5. **IP 접근 제어**:
   - DMS 시스템은 등록된 IP에서만 접근 가능
   - CIDR 표기법을 통한 IP 대역 허용
   - localhost 자동 허용으로 개발 환경 지원
   - 실시간 IP 체크 및 접근 차단

6. **데이터 보호**:
   - 민감한 정보 암호화 및 안전한 저장
   - 사이트별 데이터 격리

## 모니터링 및 로깅

- **멀티 사이트 로깅**:
  - Concentrix 사이트: 공개 접근 로그
  - Concentrix 어드민: 관리자 활동 로그
  - DMS: Delivery Management System 사용자 활동 로그

- **시스템 메트릭**:
  - 사이트별 성능 모니터링
  - API 응답 시간 및 사용량 추적

- **에러 로깅**:
  - 애플리케이션 오류 추적
  - 사이트별 에러 분류 및 알림

## 기여 가이드

1. **코드 스타일**: ESLint + Prettier 가이드 준수
2. **타입 안정성**: TypeScript 타입 안정성 유지
3. **멀티 사이트 고려**:
   - 사이트별 독립적인 컴포넌트 개발
   - 레이아웃별 스타일 분리
   - API 엔드포인트 명명 규칙 준수
4. **테스트**: 테스트 코드 작성 권장
5. **문서화**: API 문서 업데이트 (OpenAPI 스펙)
6. **보안**: 보안 검토 필수
7. **사이트별 브랜딩**: 각 사이트의 브랜드 가이드라인 준수

## 라이선스

이 프로젝트는 회사 내부 사용을 위한 프라이빗 프로젝트입니다.

---

**최종 업데이트**: 2025년 9월 19일
**문서 버전**: 0.0.4
