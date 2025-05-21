import { throttle } from 'lodash-es';
import { useMemo, useRef } from 'react';

type AnyFunction = (...args: never[]) => unknown;

interface Config<T extends AnyFunction> {
  func: T;
  wait?: number;
  options?: {
    leading?: boolean;
    trailing?: boolean;
  };
}

/**
 * 주어진 콜백 함수를 지정된 시간 간격으로 제한하여 호출할 수 있도록 하는 훅입니다.
 * 주로 성능 최적화 및 불필요한 함수 호출을 방지하기 위해 사용됩니다.
 *
 * @param func - 호출할 함수
 * @param wait - 함수 호출을 제한할 시간 간격 (밀리초 단위)
 * @param options.leading - true일 경우, 최초 호출 시점에 함수를 호출합니다.
 * @param options.trailing - true일 경우, 마지막 호출 시점에 함수를 호출합니다.
 * @return - throttle 및 memo 처리된 함수
 *  
 * @example
 * ```typescript
 * const callback = () => {
 *   console.log('callback function invoked');
 * };
 * const throttle = useThrottle(callback, 1000);
 * 
 * throttle();
 * ```
 */
export const useThrottle = <T extends AnyFunction>({
  func,
  wait,
  options = { leading: true, trailing: true },
}: Config<T>) => {
  const func_ref = useRef<T>(func);
  func_ref.current = func;
  const { leading, trailing } = options;

  return useMemo(
    () => throttle((...args: Parameters<T>) => func_ref.current(...args) as ReturnType<T>, wait, { leading, trailing }),
    [wait, leading, trailing],
  );
};
