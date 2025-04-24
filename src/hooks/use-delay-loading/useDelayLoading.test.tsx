import { act, renderHook } from '@testing-library/react';

import { useDelayLoading } from './useDelayLoading';

describe('useDelayLoading', () => {
  it('로딩을 true로 변경한 경우 최소시간(200)이후 true로 반환합니다.', async () => {
    const { result } = renderHook(() => useDelayLoading(true));

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 250));
    });

    expect(result.current).toBe(true);
  });

  it('로딩 지연 최소시간을 변경한 경우 해당 변경시간 이후 true로 반환합니다.', async () => {
    const { result } = renderHook(() => useDelayLoading(true, 300));

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 250));
    });

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 60));
    });

    expect(result.current).toBe(true);
  });

  it('로딩이 중간에 false로 변경하면 즉시 false로 반영되어야 합니다.', async () => {
    let is_loading = true;
    const { result, rerender } = renderHook(() => useDelayLoading(is_loading, 300));

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 250));
    });

    is_loading = false;
    rerender();
    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 60));
    });

    expect(result.current).toBe(false);
  });
});
