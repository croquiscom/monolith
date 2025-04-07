import { useState } from 'react';
import { useMount } from '../use-mount/useMount';

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
export const useIsMounted = () => {
  const [is_mounted, setIsMounted] = useState(false);

  useMount(() => {
    setIsMounted(true);
  });

  return is_mounted;
};
