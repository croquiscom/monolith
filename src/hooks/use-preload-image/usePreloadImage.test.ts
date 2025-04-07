import { renderHook } from '@testing-library/react';
import { usePreloadImage } from './usePreloadImage';

describe('usePreloadAsset 훅', () => {
  it('주어진 이미지 리스트 갯수만큼 이미지를 preload 합니다.', () => {
    const image_src_list = ['https://placehold.co/600x400', 'https://placehold.co/300x100'];

    const image_mock = vi.spyOn(global, 'Image');

    renderHook(() => usePreloadImage(image_src_list));

    expect(image_mock).toHaveBeenCalledTimes(image_src_list.length);
    expect(image_mock).toHaveBeenCalledWith();
  });

  it('이미지 리스트가 빈배열로 주어진 경우 어떠한preload도 발생하지 않습니다.', () => {
    const image_list: string[] = [];
    const image_mock = vi.spyOn(global, 'Image');

    renderHook(() => usePreloadImage(image_list));

    expect(image_mock).not.toHaveBeenCalled();
  });
});
