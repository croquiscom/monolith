import { useEffect, useLayoutEffect } from 'react';

/**
 * 클라이언트에서는 useLayoutEffect 를 사용하고 서버사이드에서는 useEffect를 사용합니다.
 * useLayoutEffect 를 SSR지원해야 하는 영역에서 주로 사용합니다.
 *
 * @example
 * ```typescript
 * const Component = () => {
 *
 *
 *   useIsomorphicLayoutEffect(() => {
 *      do something
 *   },[]);
 *
 *   return (
 *    <div>
 *     {...}
 *    </div>
 *   );
 * }
 * ```
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;
