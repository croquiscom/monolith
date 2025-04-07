import { useEffect } from 'react';

/**
 * 성능상의 이슈로 preload 가 필요한 이미지들의 경우
 * 해당 hook을 사용하여 인자로 주어진 이미지 리스트를 preload 합니다.
 *
 * @param image_src_list - preload 할 이미지 링크리스트
 */
export const usePreloadImage = (image_src_list: string[]) => {
  useEffect(() => {
    [...image_src_list].forEach((image) => {
      const img = new Image();
      img.src = image;
    });
  }, [image_src_list]);
};
