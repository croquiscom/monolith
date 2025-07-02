import { renderHook } from '@testing-library/react';

import { useIsMounted } from './useIsMounted';

describe('useIsMounted', () => {
  it('컴포넌트 mount가 완료된 이후 isMounted는 true를 반환합니다.', () => {
    const { result } = renderHook(() => useIsMounted(), {
      initialProps: false,
    });

    expect(result.current).toBe(true);
  });
});
