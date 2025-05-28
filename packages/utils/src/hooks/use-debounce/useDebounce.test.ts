import { renderHook } from '@testing-library/react';
import { useDebounce } from './useDebounce';

describe('useDebounce', () => {
  const wait = 100;
  let func = vi.fn();

  beforeAll(() => {
    vi.useFakeTimers();
  });

  beforeEach(() => {
    func = vi.fn();
  });

  afterAll(() => {
    vi.useRealTimers();
  });

  it('invoke_edge 가 "trailing" 일 경우, 지연 시간 이후에 함수가 호출 됩니다.', () => {
    const { result } = renderHook(() =>
      useDebounce({
        func,
        wait,
        invoke_edge: 'trailing',
      }),
    );

    result.current();
    result.current();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(100);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('invoke_edge 가 "leading" 일 경우, 함수가 즉시 호출 됩니다.', () => {
    const { result } = renderHook(() =>
      useDebounce({
        func,
        wait,
        invoke_edge: 'leading',
      }),
    );

    result.current();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(50);

    result.current();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(100);

    result.current();
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('지연 시간 내에 호출이 발생 하면 타이머가 리셋 됩니다.', () => {
    const { result } = renderHook(() =>
      useDebounce({
        func,
        wait,
        invoke_edge: 'trailing',
      }),
    );

    result.current();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    result.current();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(50);

    expect(func).toHaveBeenCalledTimes(1);
  });
});
