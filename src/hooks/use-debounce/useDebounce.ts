import { useMemo, useRef } from 'react';
import { debounce } from '../../utils/debounce/debounce.ts';

type AnyFunc = (...args: never[]) => unknown;

interface Config<T extends AnyFunc> {
  func: T;
  wait?: number;
  invoke_edge: 'leading' | 'trailing';
}

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
