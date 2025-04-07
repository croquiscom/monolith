import { renderHook } from '@testing-library/react';
import { useMount } from './useMount';

describe('useMount', () => {
  it('useEffect 함수는 마운트시 의존성에 상관없이 한번만 렌더링 되어야 합니다.', () => {
    const effectCallback = vi.fn();

    const { unmount, rerender } = renderHook(() => useMount(effectCallback));

    expect(effectCallback).toHaveBeenCalledTimes(1);

    rerender();
    expect(effectCallback).toHaveBeenCalledTimes(1);

    unmount();
    expect(effectCallback).toHaveBeenCalledTimes(1);
  });
});
