import { renderHook } from '@testing-library/react';
import { useIsomorphicLayoutEffect } from './useIsomorphicLayoutEffect';

describe('useIsomorphicLayoutEffect', () => {
  it('브라우저 환경에서 실행시 useLayoutEffect가 실행됩니다.', () => {
    vi.stubGlobal('window', {}); // 브라우저 환경 모킹

    const effect_callback = vi.fn();

    renderHook(() => useIsomorphicLayoutEffect(effect_callback));

    expect(effect_callback).toHaveBeenCalledTimes(1);

    vi.unstubAllGlobals(); // 모킹 해제
  });
});
