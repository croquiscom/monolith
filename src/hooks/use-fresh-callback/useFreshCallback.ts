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
 * @remarks
 * 다음과 같은 케이스에서 이점을 얻을 수 있습니다:
 *
 * **1. useEffect deps 배열 관리가 번거로울 때**
 * 콜백이 자주 바뀌어도 deps에 추가할 필요 없이 항상 최신 콜백을 실행할 수 있습니다.
 * ```ts
 * const stableCallback = useFreshCallback(() => {
 *   console.log(latestValue); // deps 없이 항상 최신 값 접근
 * });
 *
 * useEffect(() => {
 *   const id = setInterval(stableCallback, 1000);
 *   return () => clearInterval(id);
 * }, []); // stableCallback을 deps에 추가하지 않아도 됩니다
 * ```
 *
 * **2. React.memo로 감싼 자식 컴포넌트에 콜백을 props로 전달할 때**
 * 부모가 리렌더링되어도 콜백 참조가 바뀌지 않아 자식의 불필요한 리렌더를 방지합니다.
 * ```ts
 * const handleChange = useFreshCallback((value: string) => {
 *   setState(value);
 * });
 *
 * // MemoizedChild는 handleChange 참조가 바뀌지 않으므로 리렌더되지 않습니다
 * return <MemoizedChild onChange={handleChange} />;
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
