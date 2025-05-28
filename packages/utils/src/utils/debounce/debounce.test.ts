import { debounce } from './debounce';
import { afterAll, beforeAll, beforeEach } from 'vitest';

vi.useFakeTimers();

describe('debounce', () => {
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

  it('invokeEdge 가 "trailing" 일 경우, 지연 시간(wait)만큼 함수 호출을 지연 합니다', () => {
    const debounced_func = debounce({
      func,
      wait,
      invoke_edge: 'trailing',
    });

    debounced_func();
    expect(func).not.toHaveBeenCalled();

    // 100 ms 경과
    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('invokeEdge 가 "trailing" 일 경우, 지연 시간(wait) 내에 함수 호출이 발생 할 때 지연 timer 를 리셋 합니다', () => {
    const debounced_func = debounce({
      func,
      wait,
      invoke_edge: 'trailing',
    });

    debounced_func();
    expect(func).not.toHaveBeenCalled();

    for (let i = 0; i < 10; i++) {
      // 지연 시간 내 함수 호출 발생
      vi.advanceTimersByTime(50);
      debounced_func();
    }

    // timer 가 리셋 되었으므로 함수 호출이 발생 하지 않음
    expect(func).not.toHaveBeenCalled();

    // 마지막 함수 호출로 부터 지연시간만큼 지난 시점이므로 함수 호출
    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('invokeEdge 가 "leading" 일 경우, 호출 즉시 함수가 실행 됩니다.', () => {
    const debouncedFunc = debounce({
      func,
      wait,
      invoke_edge: 'leading',
    });

    debouncedFunc();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('invokeEdge 가 "leading" 일 때, 최초 호출 이후 지연 시간 내에 함수 호출이 발생 할 때 지연 timer 를 리셋 합니다', () => {
    const debounced_func = debounce({
      func,
      wait,
      invoke_edge: 'leading',
    });

    debounced_func();
    expect(func).toHaveBeenCalledTimes(1);

    for (let i = 0; i < 10; i++) {
      // 지연 시간 내 함수 호출 발생
      vi.advanceTimersByTime(50);
      debounced_func();
    }

    // 마지막 호출로 부터 지연 시간 만큼 경과
    vi.advanceTimersByTime(100);

    debounced_func();
    expect(func).toHaveBeenCalledTimes(2);
  });
});
