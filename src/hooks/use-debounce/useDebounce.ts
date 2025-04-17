import { useMemo, useRef } from 'react';
import { debounce } from '../../utils/debounce/debounce.ts';

type AnyFunc = (...args: never[]) => unknown;

interface Config<T extends AnyFunc> {
  func: T;
  wait?: number;
  invoke_edge: 'leading' | 'trailing';
}

/**
 * 주어진 콜백 함수에 debounce 효과를 적용하여 리턴 합니다.
 * 생성된 함수는 지정된 지연 시간(wait) 동안 추가 호출이 없을 때까지 함수(func)의 실행을 지연 시킵니다.
 *
 * invoke_edge 로 함수의 호출 시점을 지정 할 수 있습니다.
 * "trailing" 일 경우, 가장 마지막 호출 시점으로부터 지연 시간이 모두 흐른 뒤에 함수가 호출 됩니다.
 * "leading" 일 경우 함수를 즉시 호출하고, 지연 시간동안 추가적인 호출을 차단합니다.
 *
 * 리턴된 함수는 memo 처리 되어 있습니다.
 *
 * @param config debounce 설정 객체
 * @param config.func 지연 효과를 적용할 함수
 * @param config.wait 지연 시간(ms 단위) [wait=0]
 * @param config.invoke_edge 함수 호출 시점 [invoke_edge="trailing"]
 * @return debounce 및 memo 처리된 함수
 *
 * @example invoke_edge 가 trailing 일 때
 * ``` jsx
 *   // invoke_edge 가 "trailing" 일 경우, 마지막 호출로 부터 300ms 후... 서버에 양식 데이터가 제출 됩니다.(기본값)
 *   const handleSubmit = useDebounce({
 *     func: (values: FormData) => {
 *       // form data 를 서버에 제출 합니다
 *     },
 *     wait: 300,
 *   })
 *
 *   //
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       ...
 *     </form>
 *   )
 * ```
 *
 * @example invoke_edge 가 "leading" 일 때
 * ``` jsx
 *   // invoke_edge 가 "leading" 일 경우, 즉시 서버에 양식 데이터를 제출하고 이후의 호출은 300ms가 지나기 전까지 차단 됩니다.
 *   const handleSubmit = useDebounce({
 *     func: (values: FormData) => {
 *       // form data 를 서버에 제출 합니다
 *     },
 *     wait: 300,
 *     invoke_edge: "leading"
 *   })
 *
 *   //
 *   return (
 *     <form onSubmit={handleSubmit}>
 *       ...
 *     </form>
 *   )
 * ```
 */
export const useDebounce = <T extends AnyFunc>({ func, wait, invoke_edge }: Config<T>) => {
  const func_ref = useRef<T>(func);
  func_ref.current = func;

  return useMemo(() => {
    return debounce<T>({
      func: ((...params: Parameters<T>) => func_ref.current(...params)) as T,
      wait,
      invoke_edge: invoke_edge,
    });
  }, [wait, invoke_edge]);
};
