import { act, renderHook } from '@testing-library/react';

import { usePreloadImage } from './usePreloadImage';

describe('usePreloadAsset 훅', () => {
  let original_image: typeof Image;

  beforeEach(() => {
    original_image = global.Image;

    global.Image = class {
      _src = '';
      onload: () => void = () => {};
      onerror: () => void = () => {};

      set src(value: string) {
        this._src = value;

        setTimeout(() => {
          if (value.includes('fail')) {
            this.onerror();
          } else {
            this.onload();
          }
        }, 10);
      }

      get src() {
        return this._src;
      }
    } as unknown as typeof Image;
  });

  afterEach(() => {
    global.Image = original_image;
  });

  it('주어진 이미지 리스트 갯수만큼 이미지를 preload 합니다. 전부 load되기 기전에는 반환값은  fasle를 반환합니다. 전부 load 이후 true를 반환 합니다.', async () => {
    const { result } = renderHook(() => usePreloadImage(['img1.jpg', 'img2.jpg', 'img3.jpg']));

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 30));
    });

    expect(result.current).toBe(true);
  });

  it('이미지 리스트가 빈배열로 주어진 경우 어떠한preload도 발생하지 않습니다.', () => {
    const image_list: string[] = [];

    const { result } = renderHook(() => usePreloadImage(image_list));
    expect(result.current).toBe(true);
  });

  it('중간에 실패한 이미지가 있어도 실패 시그널이 나온다면 전부 로드 완료로 반환합니다', async () => {
    const { result } = renderHook(() => usePreloadImage(['img1.jpg', 'fail.jpg', 'img2.jpg']));

    expect(result.current).toBe(false);

    await act(async () => {
      await new Promise((res) => setTimeout(res, 30));
    });

    expect(result.current).toBe(true);
  });
});
