# @croquiscom/monolith

KakaoStyle frontend common utility library

## Installation

```bash
npm install @croquiscom/monolith
# or
yarn add @croquiscom/monolith
# or
pnpm add @croquiscom/monolith
```

## Features

### Components
- `SwitchCase` - 조건부 렌더링을 위한 컴포넌트

### Hooks
- `useMount` - 컴포넌트 마운트 시 실행되는 Hook
- `useIsMounted` - 컴포넌트 마운트 상태를 확인하는 Hook
- `useCountDownTimer` - 카운트다운 타이머 Hook
- `useIsomorphicLayoutEffect` - SSR 환경을 고려한 useLayoutEffect Hook
- `usePreloadImage` - 이미지 프리로드 Hook
- `useDebounce` - 디바운스 Hook
- `useDelayLoading` - 로딩 지연 Hook
- `useThrottle` - 쓰로틀 Hook

### Utils
- `createArray` - 배열 생성 유틸리티
- `delay` - 지연 실행 유틸리티
- `isEqual` - 깊은 비교 유틸리티
- `isIos` - iOS 환경 체크
- `isAndroid` - Android 환경 체크
- `compressImage` - 이미지 압축 유틸리티
- `debounce` - 디바운스 함수
- `throttle` - 쓰로틀 함수

## Usage

```typescript
import { useMount, SwitchCase, delay } from '@croquiscom/monolith';

// Hook 사용 예시
function MyComponent() {
  useMount(() => {
    console.log('Component mounted!');
  });

  return (
    <SwitchCase
      value={status}
      caseBy={{
        loading: <div>Loading...</div>,
        error: <div>Error occurred</div>,
        success: <div>Success!</div>,
      }}
      defaultComponent={<div>Unknown status</div>}
    />
  );
}

// Util 사용 예시
async function fetchData() {
  await delay(1000); // 1초 대기
  // ... fetch logic
}
```

## License

MIT 
