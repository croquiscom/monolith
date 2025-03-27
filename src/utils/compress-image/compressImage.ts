//utils/compressImage.ts
import loadImage, { LoadImageOptions } from "blueimp-load-image";

/**
 * 파일을 압축합니다.
 * @example
 * ```tsx
 * const file = new File([blob], "image.jpg", { type: "image/jpeg" });
 * const compressedFile = await compressImage(file);
 * console.log(compressedFile); // File { name: "image.jpg", type: "image/jpeg", size: 1234, ... }
 * ```
 * @param file - 압축할 파일
 * @param options - 압축 옵션
 * @returns 압축된 파일
 */
export async function compressImage(
  file: File,
  { maxWidth = 375, canvas = true, meta = true, ...rest }: LoadImageOptions = {}
): Promise<File> {
  return new Promise<File>((resolve, reject) => {
    try {
      loadImage(
        file,
        (canvas) => {
          if (canvas instanceof HTMLCanvasElement) {
            canvas.toBlob((blob) => {
              if (blob) {
                const compressedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now(),
                });
                resolve(compressedFile);
              }
            });
          }
        },
        {
          ...rest,
          maxWidth,
          canvas,
          meta,
          orientation: true,
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
