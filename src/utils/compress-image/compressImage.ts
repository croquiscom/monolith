//utils/compressImage.ts
import loadImage from "blueimp-load-image";

/**
 * 파일을 압축합니다.
 * @example
 * ```tsx
 * const file = new File([blob], "image.jpg", { type: "image/jpeg" });
 * const compressedFile = await compressImage(file);
 * console.log(compressedFile); // File { name: "image.jpg", type: "image/jpeg", size: 1234, ... }
 * ```
 * @param file - 압축할 파일
 * @param maxWidth - 압축할 최대 너비 (기본값: 375)
 * @returns 압축된 파일
 */
export async function compressImage(
  file: File,
  maxWidth?: number
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
          maxWidth: maxWidth ?? 375,
        }
      );
    } catch (e) {
      reject(e);
    }
  });
}
