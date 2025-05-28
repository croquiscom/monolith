/**
 * 모든 종류의 function
 */
type AnyFunc = (...args: never[]) => unknown;
/**
 * debounce 처리 된 function
 */
type DebouncedFunc<T extends AnyFunc> = (...args: Parameters<T>) => void;
/**
 * debounce 설정 객체
 */
interface Config<T extends AnyFunc> {
    /**
     * debounce 처리 할 function
     */
    func: T;
    /**
     * 지연 시간(ms)
     * @defaultValue 0
     */
    wait?: number;
    /**
     * 함수 호출 시점
     * @defaultValue "trailing"
     */
    invoke_edge?: 'leading' | 'trailing';
}
/**
 * debounce 효과가 적용된 function 을 생성합니다.
 * 생성된 function 은 지정된 지연 시간(wait) 동안 추가 호출이 없을 때까지
 * 파리미터로 전달 받은 함수(func)의 실행을 지연 시킵니다.
 *
 * invoke_edge 로 함수의 호출 시점을 지정 할 수 있습니다.
 * "trailing" 일 경우, 가장 마지막 호출 시점으로부터 지연 시간이 모두 흐른 뒤에 함수가 호출 됩니다.
 * "leading" 일 경우 함수를 즉시 호출하고, 지연 시간동안 추가적인 호출을 차단합니다.
 *
 * @param config debounce 설정 객체
 * @param config.func 지연 효과를 적용할 함수
 * @param config.wait 지연 시간(ms 단위) [wait=0]
 * @param config.invoke_edge 함수 호출 시점 [invoke_edge="trailing"]
 * @return debounce 처리된 함수
 *
 * @example invoke_edge 가 trailing 일 때
 * ``` typescript
 *   // invoke_edge 가 "trailing" 일 경우...(기본값)
 *   const debounced_func_trailing = debounce({
 *     func: () => {
 *       console.log("invoked")
 *     },
 *     wait: 300,
 *   })
 *
 *   // 마지막 호출로 부터 300ms 후... "invoked" 1 회 출력
 *   debounced_func_trailing()
 *   debounced_func_trailing()
 * ```
 *
 * @example invoke_edge 가 "leading" 일 때
 * ``` typescript
 *   // invoke_edge 가 "leading" 일 경우...
 *   const debounced_func_leading = debounce({
 *     func: () => {
 *       console.log("invoked")
 *     },
 *     wait: 300,
 *     invoke_edge: "leading"
 *   })
 *
 *   // 즉시 "invoked" 1회 출력 후 마지막 호출로 부터 300ms 가 지나기 전까지 함수 호출 차단
 *   debounced_func_leading()
 *   debounced_func_leading()
 * ```
 */
export declare const debounce: <T extends AnyFunc>({ func, wait, invoke_edge, }: Config<T>) => DebouncedFunc<T>;
export {};
