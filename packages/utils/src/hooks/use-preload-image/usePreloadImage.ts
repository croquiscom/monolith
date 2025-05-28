import { useEffect, useState } from 'react';

/**
 * 성능상의 이슈로 preload 가 필요한 이미지들의 경우
 * 해당 hook을 사용하여 인자로 주어진 이미지 리스트를 preload 합니다.
 *
 * @param image_src_list - preload 할 이미지 링크리스트
 * @return is_preload_completed - preload 완료 여부
 * 
 * @example 
 *  const is_completed_load_image = usePreloadImage(['https://example.com/image1.jpg', 'https://example.com/image2.jpg']);
 * is_completed_load_image - true(전부 이미지 로드가 완료된 경우 true 아니면 false)
 */
export const usePreloadImage = (image_src_list: string[]) => {
  const [is_preload_completed, setIsPreloadCompleted] = useState(false);

  useEffect(() => {
    let loaded_count = 0;

    if (image_src_list.length === 0) {
      setIsPreloadCompleted(true);
      return;
    }

    const completeLoadImage = () => {
      loaded_count++;
      if (loaded_count === image_src_list.length) {
        setIsPreloadCompleted(true);
      }
    };

    [...image_src_list].forEach((image) => {
      const img = new Image();

      img.onload = completeLoadImage;
      img.onerror = completeLoadImage;

      img.src = image;
    });
  }, [image_src_list]);

  return is_preload_completed;
};


