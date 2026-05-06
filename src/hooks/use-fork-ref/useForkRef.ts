import { useCallback, Ref, RefCallback } from 'react';

/**
 * 단일 element 에 여러 ref 를 바인딩 해야 할 경우 사용합니다.
 *
 * @example
 * ```tsx
 * const Component = forwardRef((props, forwardedRef) => {
 *   const elementRef = useRef<HTMLElement>();
 *   const { ref: inViewRef } = useInView();
 *
 *   // 다수의 ref 를 단일 element 에 binding
 *   const forkRef = useForkRef(forwardedRef, elementRef, inViewRef);
 *
 *   return (
 *     <div ref={forkRef}>
 *       ...
 *     </div>
 *   )
 * })
 * ```
 *
 * @param refList 하나의 element에 동시에 연결할 ref 목록. object ref와 callback ref 모두 전달 가능합니다.
 * @returns element를 받아 모든 ref에 동시에 할당하는 callback ref. ref 목록이 변경될 때만 새로운 참조를 반환합니다.
 */
export const useForkRef = <T extends HTMLElement>(...refList: Ref<T>[]) => {
  return useCallback<RefCallback<T>>(
    (element: T | null) => {
      const cleanups: Array<() => void> = [];
      refList.forEach((ref) => {
        if (typeof ref === 'function') {
          const cleanup = ref(element);
          cleanups.push(typeof cleanup === 'function' ? cleanup : () => ref(null));
        }
        if (ref !== null && typeof ref === 'object') {
          ref.current = element;
          cleanups.push(() => {
            ref.current = null;
          });
        }
      });

      return () => cleanups.forEach((fn) => fn());
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...refList],
  );
};
