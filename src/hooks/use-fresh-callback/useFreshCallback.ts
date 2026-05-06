import { useCallback, useRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Callback = (...args: any[]) => any;

/**
 * 매 렌더마다 바뀌는 callback을 감싸서, 항상 최신 버전을 호출하는 stable한 함수를 반환합니다.
 *
 * 반환된 함수는 리렌더링이 일어나도 참조가 바뀌지 않기 때문에,
 * useEffect의 deps 배열이나 자식 컴포넌트의 props로 안전하게 전달할 수 있습니다.
 * 내부적으로는 항상 최신 callback을 바라보므로 stale closure 문제가 발생하지 않습니다.
 *
 * @example
 * ```ts
 * const handleClick = useFreshCallback(() => {
 *   console.log(count); // 항상 최신 count를 읽음
 * });
 * ```
 *
 * @param callback 최신 상태로 유지할 콜백 함수
 * @returns 리렌더링 간 참조가 유지되는 stable한 함수. 호출 시 항상 최신 callback을 실행합니다.
 */
export const useFreshCallback = <C extends Callback>(callback: C): C => {
  const callbackRef = useRef<C>(callback);
  callbackRef.current = callback;

  return useCallback<C>(
    ((...params: Parameters<C>) => {
      return callbackRef.current(...params);
    }) as C,
    [],
  );
};
