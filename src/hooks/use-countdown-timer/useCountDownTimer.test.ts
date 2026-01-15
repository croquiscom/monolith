import { renderHook, act } from '@testing-library/react';
import { vi } from 'vitest';

import { useCountDownTimer } from './useCountDownTimer';

describe('useCountdownTimer', () => {
  beforeEach(() => {
    // requestAnimationFrame과 cancelAnimationFrame을 모킹하여 타이머 동작을 제어합니다.
    vi.stubGlobal(
      'requestAnimationFrame',
      vi.fn((callback) => setTimeout(callback, 0)),
    );
    vi.stubGlobal('cancelAnimationFrame', vi.fn());
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.unstubAllGlobals(); // 전역 모킹 해제
  });

  it('카운트다운이 정상적으로 작동합니다.', () => {
    const five_minutes = Date.now() + 5 * 60 * 1_000;

    const { result } = renderHook(() => useCountDownTimer({ end_at: five_minutes }));

    expect(result.current.minutes).toEqual(5);

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 4,
      seconds: 59,
      milliseconds: 0,
      is_finished: false,
    });
  });

  it('타이머가 완료시점이 끝나는 경우 업데이트가 타이머는 동작하지 않고 모든 시간 타이머 정보는 0으로 노출됩니다.', () => {
    const end_at = Date.now();

    const { result } = renderHook(() => useCountDownTimer({ end_at }));

    // 타이머 종료 후 상태 확인
    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      is_finished: true,
    });
  });

  it('타이머의 enable이 false일 때는 타이머가 시작되지 않습니다.', () => {
    const five_minutes = Date.now() + 5 * 60 * 1_000;

    const { result } = renderHook(() => useCountDownTimer({ end_at: five_minutes, enable: false }));

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      is_finished: false,
    });

    act(() => {
      vi.advanceTimersByTime(1_000);
    });

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
      is_finished: false,
    });
  });

  it('throttle_time이 설정된 시간 이전에는 타이머 업데이트가 되지 않습니다.', () => {
    const end_at = Date.now() + 10 * 1_000; // 10초 후

    const { result } = renderHook(() => useCountDownTimer({ end_at, enable: true, throttle_time: 500 }));

    expect(result.current.seconds).toBe(10);

    act(() => {
      vi.advanceTimersByTime(200);
    });

    expect(result.current.seconds).toBe(10);

    act(() => {
      vi.advanceTimersByTime(400);
    });

    expect(result.current.seconds).toBe(9);
  });

  it('타이머가 정상적으로 종료된 이후 is_finished 에서는 true를 응답합니다.', () => {
    const end_at = Date.now() + 10 * 1_000; // 10초 후

    const { result } = renderHook(() => useCountDownTimer({ end_at, enable: true }));

    expect(result.current.is_finished).toBe(false);

    act(() => {
      vi.advanceTimersByTime(10_000);
    });

    expect(result.current.is_finished).toBe(true);
  });
});
