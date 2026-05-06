import { renderHook } from '@testing-library/react';
import { useFreshCallback } from './useFreshCallback';

describe('useFreshCallback', () => {
  it('반환된 콜백은 리렌더링 후에도 동일한 참조를 유지합니다.', () => {
    let callback = vi.fn();
    const { result, rerender } = renderHook(() => useFreshCallback(callback));

    const first = result.current;

    callback = vi.fn();
    rerender();

    expect(result.current).toBe(first);
  });

  it('콜백이 교체된 이후에도 최신 콜백이 호출됩니다.', () => {
    const first = vi.fn().mockReturnValue('first');
    const second = vi.fn().mockReturnValue('second');

    let callback = first;
    const { result, rerender } = renderHook(() => useFreshCallback(callback));

    callback = second;
    rerender();

    const returnValue = result.current();

    expect(first).not.toHaveBeenCalled();
    expect(second).toHaveBeenCalledTimes(1);
    expect(returnValue).toBe('second');
  });

  it('파라미터가 최신 콜백에 올바르게 전달됩니다.', () => {
    const callback = vi.fn();
    const { result } = renderHook(() => useFreshCallback(callback));

    result.current('a', 1, true);

    expect(callback).toHaveBeenCalledWith('a', 1, true);
  });

  it('최신 콜백의 반환값이 그대로 전달됩니다.', () => {
    const callback = vi.fn().mockReturnValue(42);
    const { result } = renderHook(() => useFreshCallback(callback));

    expect(result.current()).toBe(42);
  });
});
