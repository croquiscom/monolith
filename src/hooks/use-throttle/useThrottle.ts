import { useMemo, useRef } from 'react';
import { throttle } from '../../utils/throttle/throttle';

type AnyFunc<T extends unknown[]> = (...args: T) => unknown;

interface Config<T extends unknown[]> {
  func: AnyFunc<T>;
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
 * @template T - 쓰로틀링될 함수의 파라미터 타입입니다.
 * @param {Config<T>} config - 쓰로틀 설정을 위한 객체입니다.
 * @param {T} config.func - 쓰로틀링될 함수입니다.
 * @param {number} config.wait - 밀리초 단위의 대기 시간입니다. 이 시간 동안 함수 호출 빈도가 제한됩니다.
 * @param {object} [config.options={ leading: true, trailing: true }] - (선택적) lodash 쓰로틀 옵션입니다.
 * @param {boolean} [config.options.leading=true] - `true`인 경우, 타임아웃의 leading edge에서 함수를 호출합니다.
 * @param {boolean} [config.options.trailing=true] - `true`인 경우, 타임아웃의 trailing edge에서 함수를 호출합니다.
 * @returns 원본 함수와 동일한 시그니처를 가지는 메모이제이션되고 쓰로틀링된 버전의 함수를 반환합니다.
 *
 * @example
 * ```tsx
 * const throttle = useThrottle({
 *  func: (x: number, y: number) => {
 *    console.log(`마우스 위치: x=${x}, y=${y} (쓰로틀됨)`);
 *  },
 *  wait: 1000,
 *  options: { leading: true, trailing: true }, // 시작과 끝 시점에서 함수를 호출합니다.
 *  // options를 생략하면 기본값은 { leading: true, trailing: true }입니다.
 *  // options: { leading: false, trailing: true }로 설정하면 끝 시점에서만 함수를 호출합니다.
 *  // options: { leading: true, trailing: false }로 설정하면 시작 시점에서만 함수를 호출합니다.
 *  // options: { leading: false, trailing: false }로 설정하면 함수를 호출하지 않습니다.
 * });
 * 
 * const handleMouseMove = (e) => {
 *  throttle(e.clientX, e.clientY); // 쓰로틀링된 함수 호출
 * };
 * 
 * return <div onMouseMove={handleMouseMove}>Move your mouse</div>;
 * ```
 */
export const useThrottle = <T extends unknown[]>({
  func,
  wait,
  options,
}: Config<T>): AnyFunc<T> => {
  const func_ref = useRef<AnyFunc<T>>(func);
  func_ref.current = func;

  return useMemo(
    () => throttle({
      func: func_ref.current,
      wait,
      options,
    }),
    [wait, options],
  );
};
