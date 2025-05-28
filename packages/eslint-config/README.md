# @croquiscom/eslint-config

KakaoStyle 프로젝트를 위한 공통 ESLint 설정 패키지

## Installation

```bash
npm install --save-dev @croquiscom/eslint-config
# or
yarn add -D @croquiscom/eslint-config
# or
pnpm add -D @croquiscom/eslint-config
```

## Usage

### Basic JavaScript/TypeScript

`eslint.config.mjs`:
```javascript
import baseConfig from '@croquiscom/eslint-config';

export default baseConfig;
```

### TypeScript

`eslint.config.mjs`:
```javascript
import typescriptConfig from '@croquiscom/eslint-config/typescript.js';

export default typescriptConfig;
```

### React + TypeScript

`eslint.config.mjs`:
```javascript
import reactConfig from '@croquiscom/eslint-config/react.js';

export default reactConfig;
```

### Custom Configuration

설정을 확장하거나 덮어쓸 수 있습니다:

```javascript
import reactConfig from '@croquiscom/eslint-config/react.js';

export default [
  ...reactConfig,
  {
    rules: {
      // 커스텀 규칙 추가
      'no-console': 'error',
    },
    ignores: ['dist', 'build', 'coverage'],
  },
];
```

## Configurations

### Base Configuration (`index.js`)
- ES2024 문법 지원
- 기본 JavaScript 규칙
- Node.js 및 브라우저 환경 지원

### TypeScript Configuration (`typescript.js`)
- TypeScript ESLint 권장 규칙
- 타입 관련 규칙 설정
- 일관된 타입 import 강제

### React Configuration (`react.js`)
- React 및 React Hooks 규칙
- JSX 관련 규칙
- React Refresh 지원
- TypeScript 설정 포함

## License

MIT 
