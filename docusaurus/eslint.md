---
title: ESLint 설정 가이드
description: Monolith 패키지에서 제공하는 ESLint 설정 사용법을 안내합니다.
---

# ESLint 설정 가이드

Monolith 패키지에서 제공하는 ESLint 설정을 사용하여 일관된 코드 품질을 유지할 수 있습니다.

## 설치

### pnpm

```bash
pnpm add -D @croquiscom/monolith
```

### yarn

```bash
yarn add -D @croquiscom/monolith
```

### npm

```bash
npm install --save-dev @croquiscom/monolith
```

## 제공하는 설정

### 1. 기본 설정 (base.eslint.config.js)

TypeScript, React, 접근성 등 기본적인 규칙들을 포함한 설정입니다.

> **[중요]**
>
> - Monolith의 기본 ESLint 규칙은 **ESLint 8, 9 모두에서 사용 가능합니다.**
> - **ESLint 9**에서는 flat config 구조가 기본이므로, 기존 base.eslint.config.js를 flat config로 변환하려면 `@eslint/eslintrc`의 `FlatCompat`를 활용해야 합니다.
> - **ESLint 8 이하**에서는 기존 방식(`.eslintrc.js` 등) 그대로 사용하면 됩니다.

#### ESLint 8 이하 사용 예시

```javascript
// eslint.config.js 또는 .eslintrc.js
module.exports = require('@croquiscom/monolith/configs/base.eslint.config.js');
```

#### ESLint 9(flat config) 사용 예시

```javascript
// eslint.config.js (ESLint 9+)
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('@croquiscom/monolith/configs/base.eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [
  ...compat.config(baseConfig),
  // 필요시 추가 설정
];
```

**포함된 규칙:**

- TypeScript 관련 규칙
- React 관련 규칙
- React Hooks 규칙
- 접근성 (jsx-a11y) 규칙
- Import 순서 및 그룹화 규칙
- Prettier 연동

### 2. Next.js 설정 (next.eslint.config.js)

Next.js 프로젝트에 최적화된 설정입니다. **기본 설정(base.eslint.config.js)을 확장하여 Next.js 전용 규칙을 추가**합니다.

```javascript
// eslint.config.js
module.exports = require('@croquiscom/monolith/configs/next.eslint.config.js');
```

**포함된 규칙:**

- 기본 설정의 모든 규칙 (TypeScript, React, 접근성 등)
- Next.js 전용 규칙들
- `@next/next/no-html-link-for-pages`
- `@next/next/no-img-element`
- `@next/next/no-sync-scripts`
- 기타 Next.js 모범 사례 규칙들

### 3. Nx 모노레포 설정 (nx.eslint.config.js)

Nx 모노레포 환경에서 사용하는 설정입니다.

```javascript
// eslint.config.js
module.exports = require('@croquiscom/monolith/configs/nx.eslint.config.js');
```

**포함된 규칙:**

- 모듈 경계 강제 (`@nx/enforce-module-boundaries`)
- 워크스페이스 관련 규칙들
- 순환 의존성 방지
- 상대 경로 import 금지

## Prettier 설정

Monolith 패키지에서 제공하는 Prettier 설정을 사용하여 일관된 코드 포매팅을 유지할 수 있습니다.

### Prettier 설정 파일

```javascript
// prettier.config.js
module.exports = require('@croquiscom/monolith/configs/prettier.config.js');
```

**포함된 설정:**

- 기본 포매팅 규칙
- ESLint와 충돌하지 않는 설정
- 카카오스타일 FE 컨벤션에 맞는 포매팅

### Prettier 설정 직접 사용

```javascript
// prettier.config.js
module.exports = {
  semi: true,
  trailingComma: 'es5',
  singleQuote: true,
  // ...
  bracketSameLine: false,
  arrowParens: 'avoid',
  endOfLine: 'lf',
};
```

### ESLint와 Prettier 연동

ESLint 설정에 이미 Prettier 연동이 포함되어 있어 별도 설정이 필요하지 않습니다.

```javascript
// eslint.config.js
module.exports = require('@croquiscom/monolith/configs/next.eslint.config.js');
```

### Prettier 스크립트 추가

package.json에 Prettier 스크립트를 추가하여 사용할 수 있습니다.

```json
// package.json
{
  "scripts": {
    "format": "prettier --write .",
    "format:check": "prettier --check ."
  }
}
```

**사용법:**

```bash
# 전체 파일 포매팅
pnpm format
yarn format
npm run format

# 포매팅 검사 (CI/CD에서 사용)
pnpm format:check
yarn format:check
npm run format:check

# npx를 사용한 직접 실행
npx prettier --write .
npx prettier --check .
```

## 설정 오버라이드

프로젝트의 특성에 맞게 규칙을 오버라이드할 수 있습니다.

### Next.js 프로젝트 예시

```javascript
// eslint.config.js
const baseConfig = require('@croquiscom/monolith/configs/next.eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    rules: {
      '@next/next/no-img-element': 'error',
      'react/display-name': 'error',
    },
  },
];
```

### Nx 모노레포 예시

#### 프로젝트 루트 설정 (모노레포 전체 공통)

```javascript
// eslint.config.js (프로젝트 루트)
const baseConfig = require('@croquiscom/monolith/configs/base.eslint.config.js');
const nxConfig = require('@croquiscom/monolith/configs/nx.eslint.config.js');

module.exports = [
  ...baseConfig,
  ...nxConfig,
  {
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['@my-project/*'],
          depConstraints: [
            {
              sourceTag: 'level:app',
              onlyDependOnLibsWithTags: ['*'],
            },
            {
              sourceTag: 'level:domain',
              onlyDependOnLibsWithTags: ['level:common', 'level:widget'],
            },
            {
              sourceTag: 'level:common',
              onlyDependOnLibsWithTags: ['level:common'],
            },
          ],
        },
      ],
    },
  },
];
```

#### 개별 앱 설정 (apps 하위)

**Next.js 앱의 경우:**

```javascript
// apps/my-next-app/eslint.config.js
const rootConfig = require('../../eslint.config.js');
const nextConfig = require('@croquiscom/monolith/configs/next.eslint.config.js');

module.exports = [
  ...rootConfig, // 프로젝트 루트 설정 (base + nx + 공통 규칙)
  ...nextConfig, // Next.js 전용 규칙
  {
    rules: {
      // 앱별 커스텀 규칙
      '@next/next/no-img-element': 'error',
      'react/display-name': 'error',
    },
  },
];
```

**일반 React 앱의 경우:**

```javascript
// apps/my-react-app/eslint.config.js
const rootConfig = require('../../eslint.config.js');

module.exports = [
  ...rootConfig, // 프로젝트 루트 설정 (base + nx + 공통 규칙)
  {
    rules: {
      // 앱별 커스텀 규칙
      'react/display-name': 'error',
    },
  },
];
```

**라이브러리의 경우:**

```javascript
// libs/shared/eslint.config.js
const rootConfig = require('../../eslint.config.js');

module.exports = [
  ...rootConfig, // 프로젝트 루트 설정 (base + nx + 공통 규칙)
  {
    rules: {
      // 라이브러리별 커스텀 규칙
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
];
```

#### 설정 우선순위

1. **프로젝트 루트**: `base` + `nx` + 공통 규칙
2. **앱별 설정**: 루트 설정 + 프레임워크별 설정 + 앱별 커스텀 규칙

#### 장점

- **중복 제거**: 공통 규칙을 루트에서 한 번만 정의
- **일관성**: 모든 앱이 동일한 기본 규칙 사용
- **유연성**: 앱별로 필요한 규칙만 추가
- **유지보수**: 공통 규칙 변경 시 루트만 수정

#### 실제 프로젝트 구조 예시

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

### Prettier 설정 오버라이드

```javascript
// prettier.config.js
const baseConfig = require('@croquiscom/monolith/configs/prettier.config.js');

module.exports = {
  ...baseConfig,
  printWidth: 100,
  tabWidth: 4,
};
```

## 규칙 수준

### Error (에러)

- 빌드 실패를 유발하는 심각한 문제
- 보안 취약점이나 런타임 에러 가능성

### Warn (경고)

- 코드 품질 개선을 위한 권장사항
- 빌드는 성공하지만 개선이 필요한 부분

## 주의사항

1. **ESLint 9 flat config(배열 구조)에서는 기존 base.eslint.config.js를 직접 import해서 사용할 수 없습니다.** 반드시 FlatCompat로 변환해서 사용해야 합니다.
2. **규칙 충돌**: Prettier와 충돌하는 규칙들은 자동으로 비활성화됩니다.
3. **성능**: 대규모 프로젝트에서는 일부 규칙이 성능에 영향을 줄 수 있습니다.
4. **호환성**: TypeScript 버전에 따라 일부 규칙이 다르게 동작할 수 있습니다.
5. **Prettier 버전**: Prettier 버전에 따라 일부 설정이 다르게 동작할 수 있습니다.

## 문제 해결

### 설정이 적용되지 않는 경우

1. ESLint 캐시 삭제:

```bash
npx eslint --cache-location .eslintcache --cache false .
```

2. IDE 재시작:
   - VS Code: `Ctrl+Shift+P` → "ESLint: Restart ESLint Server"

### Prettier 설정 문제

1. Prettier 캐시 삭제:

```bash
npx prettier --write . --cache-location .prettiercache
```

2. IDE Prettier 확장 재시작:
   - VS Code: `Ctrl+Shift+P` → "Prettier: Restart Prettier"

### 특정 파일 제외

```javascript
// eslint.config.js
const baseConfig = require('@croquiscom/monolith/configs/next.eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    ignores: ['dist/', 'node_modules/', '*.config.js'],
  },
];
```

```json
// .prettierignore
dist/
node_modules/
*.config.js
```

## 추가 리소스

- [ESLint 공식 문서](https://eslint.org/)
- [TypeScript ESLint](https://typescript-eslint.io/)
- [Next.js ESLint 설정](https://nextjs.org/docs/basic-features/eslint)
- [Nx ESLint 플러그인](https://nx.dev/recipes/eslint/eslint-plugin-nx)
- [Prettier 공식 문서](https://prettier.io/)
- [ESLint Prettier 플러그인](https://github.com/prettier/eslint-plugin-prettier)
