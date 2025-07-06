---
title: ESLint 설정 가이드
description: Monolith 패키지에서 제공하는 ESLint v8 기반 설정 사용법을 안내합니다.
---

# ESLint 설정 가이드

Monolith 패키지의 ESLint 설정은 **ESLint v8**을 기본 지원합니다. (v9 관련 내용은 별도 문서 참고)

## 지원 및 권장 버전

- **ESLint**: ^8.0.0 (기본 지원)
- **@typescript-eslint/eslint-plugin**: ^6.0.0 || ^7.0.0 || ^8.0.0
- **@typescript-eslint/parser**: ^6.0.0 || ^7.0.0 || ^8.0.0
- **Prettier**: ^2.0.0 || ^3.0.0
- **React**: ^17.0.0 || ^18.0.0 || ^19.0.0

> **ESLint v9, flat config, 마이그레이션, 비교 등은 [ESLint v9 가이드](./eslint-v9.md) 문서를 참고하세요.**

## 설치

### 1. Monolith 패키지 설치

```bash
pnpm add -D @croquiscom/monolith
```

### 2. 필수 의존성 설치

```bash
pnpm add -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks prettier eslint-import-resolver-typescript
```

#### Next.js 설정 사용 시 (선택)

```bash
pnpm add -D @next/eslint-plugin-next
```

#### Nx 모노레포 설정 사용 시 (선택)

```bash
pnpm add -D @nx/eslint-plugin jsonc-eslint-parser
```

## 사용법

### 1. 기본 설정 (base)

```js
// .eslintrc.js
module.exports = require('@croquiscom/monolith/configs/base.eslint.config.js');
```

### 2. Next.js 설정

```js
// .eslintrc.js
module.exports = require('@croquiscom/monolith/configs/next.eslint.config.js');
```

### 3. Nx 모노레포 설정

```js
// .eslintrc.js
module.exports = require('@croquiscom/monolith/configs/nx.eslint.config.js');
```

## Prettier 연동

```js
// prettier.config.js
module.exports = require('@croquiscom/monolith/configs/prettier.config.js');
```

## package.json 스크립트 예시

```json
{
  "scripts": {
    "lint": "eslint ./src --ext .ts,.tsx",
    "lint:fix": "eslint ./src --ext .ts,.tsx --fix",
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

## 규칙 오버라이드 예시

```js
// .eslintrc.js
const baseConfig = require('@croquiscom/monolith/configs/base.eslint.config.js');
module.exports = {
  ...baseConfig,
  rules: {
    ...baseConfig.rules,
    'react/display-name': 'error',
  },
};
```

## Nx/Next.js 프로젝트 구조 예시

```
my-nx-workspace/
├── eslint.config.js          # 루트 설정 (base + nx)
├── apps/
│   ├── web-app/
│   │   └── eslint.config.js  # 루트 + Next.js + 커스텀
│   └── admin-app/
│       └── eslint.config.js  # 루트 + 커스텀
└── libs/
    └── shared/
        └── eslint.config.js  # 루트 + 커스텀
```

## 문제 해결

- **설정이 적용되지 않는 경우**: ESLint 캐시 삭제, IDE 재시작
- **플러그인/파서 에러**: peerDependencies 설치 확인
- **TypeScript alias(import 경로 단축) 관련 에러**: `eslint-import-resolver-typescript`가 설치되어 있는지, 그리고 base.eslint.config.js의 settings에 `import/resolver: { typescript: {} }`가 포함되어 있는지 확인하세요.
- **Nx/Next.js 관련 규칙 에러**: 선택적 의존성 설치 확인

## 참고

- [ESLint 공식 문서](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Next.js ESLint 설정](https://nextjs.org/docs/basic-features/eslint)
- [Nx ESLint 플러그인](https://nx.dev/recipes/eslint/eslint-plugin-nx)
- [Prettier 공식 문서](https://prettier.io/)
