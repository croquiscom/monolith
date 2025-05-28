/**
 * 컴포넌트가 mount 되었는지 여부를 반환합니다.
 *
 * @return 컴포넌트가 mount 되었는지 여부를 반환합니다.
 *
 * @example
 * ```typescript
 * const CompoA = () => {
 *   const is_mounted = useIsMounted();
 *   return <div>{is_mounted ? '마운트됨' : '마운트안됨'}</div>;
 * };
 * ```
 */
export declare const useIsMounted: () => boolean;
