import { throttle } from './throttle';
import { afterAll, beforeAll, beforeEach } from 'vitest';

vi.useFakeTimers();

describe('throttle', () => {
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

  it('leading이 true일 경우 첫 호출에서 즉시 실행되어야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
      options: { leading: true, trailing: false }
    });

    throttled_func();
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('지정된 대기 시간 동안은 추가 호출을 무시해야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
      options: { leading: true, trailing: false }
    });

    throttled_func();
    throttled_func();
    throttled_func();
    
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('trailing이 true일 경우 대기 시간 이후 마지막 호출이 실행되어야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
      options: { leading: false, trailing: true }
    });

    throttled_func();
    throttled_func();
    
    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(1);
  });

  it('leading과 trailing이 모두 true일 경우 첫 호출과 마지막 호출이 모두 실행되어야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
      options: { leading: true, trailing: true }
    });

    throttled_func();
    throttled_func();
    throttled_func();
    
    expect(func).toHaveBeenCalledTimes(1); // leading 호출

    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(2); // trailing 호출
  });

  it('options 가 없을 경우 기본값으로 leading과 trailing이 true로 설정되어야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
    });

    throttled_func();
    throttled_func();

    expect(func).toHaveBeenCalledTimes(1);

    vi.advanceTimersByTime(wait);
    expect(func).toHaveBeenCalledTimes(2);
  });

  it('leading과 trailing이 모두 false일 경우 함수가 호출되지 않아야 합니다', () => {
    const throttled_func = throttle({
      func,
      wait,
      options: { leading: false, trailing: false }
    });

    throttled_func();
    throttled_func();

    expect(func).not.toHaveBeenCalled();

    vi.advanceTimersByTime(wait);
    expect(func).not.toHaveBeenCalled();
  });
});
