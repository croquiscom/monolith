type AnyFunc = (...args: never[]) => unknown;
type DebouncedFunc<T extends AnyFunc> = (...args: Parameters<T>) => void;

interface Config<T extends AnyFunc> {
  func: T;
  wait?: number;
  invoke_edge?: 'leading' | 'trailing';
}

/**
 * debounce 효과가 적용된 함수를 생성합니다.
 * 생성된 함수는 지정된 지연 시간(wait) 동안 추가 호출이 없을 때까지 함수(func)의 실행을 지연 시킵니다.
 *
 * invoke_edge 로 함수의 호출 시점을 지정 할 수 있습니다.
 * "trailing" 일 경우, 가장 마지막 호출 시점으로부터 지연 시간이 모두 흐른 뒤에 함수가 호출 됩니다.
 * "leading" 일 경우 함수를 즉시 호출하고, 지연 시간동안 추가적인 호출을 차단합니다.
 *
 * @param func {Function} - 지연 효과를 적용할 함수
 * @param wait {number} - [wait=0] 지연 시간(ms 단위)
 * @param invoke_edge {"leading" | "trailing"} - [invoke_edge="trailing"] 함수 호출 시점.
 * leading 일 경우 지연 시작 지점에 함수를 호출 합니다.
 * trailing 일 경우
 */
export const debounce = <T extends AnyFunc>({
  func,
  wait = 0,
  invoke_edge = 'trailing',
}: Config<T>): DebouncedFunc<T> => {
  let timer_id: NodeJS.Timeout | undefined = undefined;

  if (invoke_edge === 'leading') {
    return (...params: Parameters<T>) => {
      if (typeof timer_id === 'undefined') {
        func(...params);
      }
      clearTimeout(timer_id);
      timer_id = setTimeout(() => {
        timer_id = undefined;
      }, wait);
    };
  }

  return (...params: Parameters<T>) => {
    clearTimeout(timer_id);
    timer_id = setTimeout(() => {
      timer_id = undefined;
      func(...params);
    }, wait);
  };
};
