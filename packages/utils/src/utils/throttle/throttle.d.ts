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
 * throttle 효과가 적용된 function 을 생성합니다.
 *
 * options 로 함수의 호출 시점을 지정 할 수 있습니다.
 * "leading" 일 경우 함수를 즉시 호출하고, 지연 시간동안 추가적인 호출을 차단합니다.
 * "trailing" 일 경우 지연 시간이 모두 흐른 뒤에 함수가 호출 됩니다.
 *
 * @template T - 쓰로틀링될 함수의 파라미터 타입입니다.
 * @param config throttle 설정 객체
 * @param config.func throttle 처리할 함수
 * @param config.wait 지연 시간(ms)
 * @param config.options throttle 옵션
 * @param config.options.leading 타임아웃의 leading edge에서 함수를 호출합니다.
 * @param config.options.trailing 타임아웃의 trailing edge에서 함수를 호출합니다.
 * @returns throttle 처리 된 함수
 *
 * @example
 * ```tsx
 * const throttled_func = throttle({
 *  func: (x: number, y: number) => {
 *    console.log(`throttled: x=${x}, y=${y}`);
 *  },
 *  wait: 1000,
 *  options: { leading: true, trailing: true },
 * });
 *
 * throttled_func(1, 2);
 * throttled_func(3, 4);
 * throttled_func(5, 6);
 * ```
 */
export declare const throttle: <T extends unknown[]>({ func, wait, options, }: Config<T>) => AnyFunc<T>;
export {};
