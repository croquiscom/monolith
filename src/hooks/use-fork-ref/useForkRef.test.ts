import { renderHook } from '@testing-library/react';
import { createRef, useRef } from 'react';
import { useForkRef } from './useForkRef';

describe('useForkRef', () => {
  it('object ref의 current에 element가 할당됩니다.', () => {
    const ref = createRef<HTMLDivElement>();
    const { result } = renderHook(() => useForkRef(ref));

    const element = document.createElement('div');
    result.current(element);

    expect(ref.current).toBe(element);
  });

  it('function ref가 element와 함께 호출됩니다.', () => {
    const callback_ref = vi.fn();
    const { result } = renderHook(() => useForkRef(callback_ref));

    const element = document.createElement('div');
    result.current(element);

    expect(callback_ref).toHaveBeenCalledWith(element);
  });

  it('여러 ref에 동시에 동일한 element가 할당됩니다.', () => {
    const object_ref = createRef<HTMLDivElement>();
    const callback_ref = vi.fn();
    const { result } = renderHook(() => useForkRef(object_ref, callback_ref));

    const element = document.createElement('div');
    result.current(element);

    expect(object_ref.current).toBe(element);
    expect(callback_ref).toHaveBeenCalledWith(element);
  });

  it('null이 전달되면 ref가 null로 초기화됩니다.', () => {
    const object_ref = createRef<HTMLDivElement>();
    const callback_ref = vi.fn();
    const { result } = renderHook(() => useForkRef(object_ref, callback_ref));

    const element = document.createElement('div');
    result.current(element);
    result.current(null);

    expect(object_ref.current).toBeNull();
    expect(callback_ref).toHaveBeenLastCalledWith(null);
  });

  it('React 19: cleanup 함수가 반환되고 호출 시 모든 ref가 정리됩니다.', () => {
    const object_ref = createRef<HTMLDivElement>();
    const callback_ref = vi.fn();
    const { result } = renderHook(() => useForkRef(object_ref, callback_ref));

    const element = document.createElement('div');
    const cleanup = result.current(element);

    expect(typeof cleanup).toBe('function');

    cleanup?.();

    expect(object_ref.current).toBeNull();
    expect(callback_ref).toHaveBeenLastCalledWith(null);
  });

  it('React 19: cleanup을 반환하는 function ref의 cleanup이 호출됩니다.', () => {
    const inner_cleanup = vi.fn();
    const callback_ref = vi.fn().mockReturnValue(inner_cleanup);
    const { result } = renderHook(() => useForkRef(callback_ref));

    const element = document.createElement('div');
    const cleanup = result.current(element);

    cleanup?.();

    expect(inner_cleanup).toHaveBeenCalledTimes(1);
  });

  it('ref가 변경되면 콜백이 재생성됩니다.', () => {
    const ref_a = createRef<HTMLDivElement>();
    const ref_b = createRef<HTMLDivElement>();

    let active_ref = ref_a;
    const { result, rerender } = renderHook(() => useForkRef(active_ref));

    const first = result.current;

    active_ref = ref_b;
    rerender();

    expect(result.current).not.toBe(first);
  });

  it('동일한 ref가 유지되면 콜백 참조가 변경되지 않습니다.', () => {
    const ref = createRef<HTMLDivElement>();
    const { result, rerender } = renderHook(() => useForkRef(ref));

    const first = result.current;
    rerender();

    expect(result.current).toBe(first);
  });

  it('useRef로 생성한 ref도 올바르게 할당됩니다.', () => {
    const { result } = renderHook(() => {
      const inner_ref = useRef<HTMLDivElement>(null);
      const fork = useForkRef(inner_ref);
      return { inner_ref, fork };
    });

    const element = document.createElement('div');
    result.current.fork(element);

    expect(result.current.inner_ref.current).toBe(element);
  });
});
