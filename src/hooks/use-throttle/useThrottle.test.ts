import { renderHook } from '@testing-library/react';
import { useThrottle } from './useThrottle';

describe('useThrottle', () => {
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

  it('options가 없을 경우, 최초 호출 시점과 마지막 호출 시점에 함수가 호출됩니다.', () => {
    const { result } = renderHook(() => useThrottle({ func, wait }));
    result.current();
    result.current();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('leading이 true일 경우, 최초 호출 시점에 함수가 호출됩니다.', () => {
    const { result } = renderHook(() =>
      useThrottle({
        func,
        wait,
        options: { leading: true },
      }),
    );

    result.current();
    result.current();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('trailing이 true일 경우, 마지막 호출 시점에 함수가 호출됩니다.', () => {
    const { result } = renderHook(() =>
      useThrottle({
        func,
        wait,
        options: { trailing: true },
      }),
    );

    result.current();
    result.current();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it('leading과 trailing이 모두 true일 경우, 최초 호출 시점과 마지막 호출 시점에 함수가 호출됩니다.', () => {
    const { result } = renderHook(() =>
      useThrottle({
        func,
        wait,
        options: { leading: true, trailing: true },
      }),
    );

    result.current();
    result.current();
    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(wait);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it('leading과 trailing이 모두 false일 경우, 함수가 호출되지 않습니다.', () => {
    const { result } = renderHook(() =>
      useThrottle({
        func,
        wait,
        options: { leading: false, trailing: false },
      }),
    );

    result.current();
    result.current();
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);

    expect(func).not.toHaveBeenCalled();
  });
});
