---
title: ESLint v9(flat config) 가이드
description: Monolith 패키지에서 ESLint v9(flat config) 사용법, v8과의 차이, 마이그레이션, 호환성 문제 해결법을 안내합니다.
---

# ESLint v9(flat config) 가이드

이 문서는 Monolith 패키지에서 **ESLint v9(flat config)** 환경을 사용할 때 필요한 설정, v8과의 차이, 마이그레이션, 호환성, 문제 해결법을 안내합니다.

> **Monolith는 기본적으로 ESLint v8을 공식 지원합니다. v9(flat config)는 실험적 지원이며, 플러그인 호환성 등 이슈가 있을 수 있습니다.**

## 주요 차이점 (v8 vs v9)

| 구분               | ESLint v8            | ESLint v9(flat config)    |
| ------------------ | -------------------- | ------------------------- |
| **설정 파일 구조** | 객체(.eslintrc.js)   | 배열(eslint.config.js)    |
| **extends**        | 지원                 | 제한적(FlatCompat 필요)   |
| **plugins**        | 직접 지원            | 제한적(FlatCompat 필요)   |
| **parser**         | parser 옵션          | languageOptions 내부 설정 |
| **성능**           | 상대적으로 느림      | 더 빠름                   |
| **호환성**         | 플러그인 대부분 지원 | 일부 플러그인 호환성 문제 |

## 마이그레이션: v8 → v9(flat config)

### 1. 의존성 설치

```bash
pnpm add -D eslint@^9.0.0 @eslint/eslintrc @eslint/js
```

### 2. 설정 파일 변환

```js
// eslint.config.js (v9 flat config)
const { FlatCompat } = require('@eslint/eslintrc');
const js = require('@eslint/js');
const baseConfig = require('@croquiscom/monolith/configs/base.eslint.config.js');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

module.exports = [...compat.config(baseConfig)];
```

### 3. package.json 스크립트

```json
{
  "scripts": {
    "lint": "eslint . --ext .ts,.tsx",
    "lint:fix": "eslint . --ext .ts,.tsx --fix"
  }
}
```

## v9 환경에서 발생할 수 있는 문제와 해결법

### 1. "Failed to load config" 에러

- **원인**: v8 방식 설정을 flat config에서 직접 import 시 발생
- **해결**: 반드시 FlatCompat로 변환해서 사용

### 2. 플러그인/규칙 로드 실패

- **원인**: 플러그인 로딩 방식 변경, flat config 미지원 플러그인 존재
- **해결**: FlatCompat 사용, 또는 수동 flat config 변환

### 3. Nx/Next.js 플러그인 호환성 문제

- **원인**: Nx v17~21은 v8만 공식 지원, v9에서 규칙/플러그인 미작동
- **해결**: v8 사용 권장, 실험적 사용 시 FlatCompat로 변환

### 4. 기타

- **설정이 적용되지 않는 경우**: ESLint 캐시 삭제, IDE 재시작
- **플러그인/파서 에러**: peerDependencies 설치 확인

## FlatCompat 없이 수동 변환 예시

```js
const js = require('@eslint/js');
const tseslint = require('typescript-eslint');
const reactPlugin = require('eslint-plugin-react');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const importPlugin = require('eslint-plugin-import');
const jsxA11yPlugin = require('eslint-plugin-jsx-a11y');

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      'react': reactPlugin,
      'react-hooks': reactHooksPlugin,
      'import': importPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      // Monolith 설정의 규칙들을 여기에 복사
    },
  },
];
```

## 참고

- [ESLint 공식 문서](https://eslint.org/)
- [ESLint v9 Flat Config 가이드](https://eslint.org/docs/latest/use/configure/configuration-files-new/)
- [ESLint v8에서 v9 마이그레이션](https://eslint.org/docs/latest/use/configure/migration-guide)
- [TypeScript ESLint Flat Config](https://typescript-eslint.io/users/typed-linting/migration/)
- [ESLint FlatCompat 문서](https://eslint.org/docs/latest/use/configure/configuration-files-new#using-eslintrc-style-configs-in-flat-config)
