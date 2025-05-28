import loadImage from 'blueimp-load-image';

/**
 * 주어진 이미지 파일을 압축하여 새로운 파일 객체를 반환합니다.
 * 이 함수는 주로 이미지 업로드 전에 파일 크기를 줄이기 위해 사용됩니다.
 * 내부적으로 `blueimp-load-image` 라이브러리를 사용하여 이미지를 로드하고,
 * HTMLCanvasElement를 활용해 이미지를 압축합니다.
 *
 * @example
 * ```tsx
 * import { compressImage } from "./compressImage";
 *
 * async function handleImageUpload(event: Event) {
 *   const input = event.target as HTMLInputElement;
 *   if (input.files && input.files[0]) {
 *     const file = input.files[0];
 *     console.log("Original File:", file);
 *
 *     // 이미지 압축
 *     const compressed_file = await compressImage(file, 500);
 *     console.log("Compressed File:", compressed_file);
 *
 *     // 압축된 파일을 업로드
 *     const form_data = new FormData();
 *     form_data.append("image", compressed_file);
 *     await fetch("/presigned-url", {
 *       method: "PUT",
 *       body: form_data,
 *     });
 *   }
 * }
 * ```
 *
 * @param file - 압축할 이미지 파일. `File` 객체여야 하며, 일반적으로 `<input type="file">`에서 선택된 파일입니다.
 * @param max_width - 압축할 이미지의 최대 너비. 기본값은 `375`이며, 이 값을 초과하는 너비의 이미지는 비율에 맞게 축소됩니다.
 *                   이 값이 작을수록 압축된 이미지의 크기가 작아집니다.
 * @returns 압축된 이미지 파일을 포함하는 `Promise<File>` 객체.
 *          반환된 파일은 원본 파일과 동일한 이름과 MIME 타입을 가지며, 크기만 줄어듭니다.
 */
export async function compressImage(file: File, max_width?: number): Promise<File> {
  if (!file) {
    throw new Error('파일이 제공되지 않았습니다.');
  }

  if (!(file instanceof File)) {
    throw new Error('유효한 File 객체가 아닙니다.');
  }

  if (!file.type.startsWith('image/')) {
    throw new Error('이미지 파일이 아닙니다.');
  }

  return new Promise<File>((resolve, reject) => {
    try {
      loadImage(
        file,
        (canvas) => {
          if (canvas instanceof HTMLCanvasElement) {
            canvas.toBlob((blob) => {
              if (blob) {
                const compressed_file = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressed_file);
              }
            });
          }
        },
        {
          maxWidth: max_width ?? 375,
          canvas: true,
        },
      );
    } catch (e) {
      reject(e);
    }
  });
}
