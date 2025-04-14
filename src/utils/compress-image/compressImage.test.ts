import { compressImage } from './compressImage';
import { vi, describe, it, expect, beforeAll, beforeEach } from 'vitest';

// Mock: blueimp-load-image
vi.mock('blueimp-load-image', () => ({
  __esModule: true,
  default: vi.fn((_, callback) => {
    const mockCanvas = document.createElement('canvas');
    callback(mockCanvas);
  }),
}));

describe('compressImage', () => {
  const original_blob = new Blob(['original large content'], { type: 'image/jpeg' });
  const valid_image_file = new File([original_blob], 'image.jpg', { type: 'image/jpeg' });

  beforeAll(() => {
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost:3000/mock');
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('압축된 이미지 파일 객체를 반환합니다', async () => {
    const mock_blob = new Blob(['mock content'], { type: 'image/jpeg' });

    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(mock_blob);
    });

    const result = await compressImage(valid_image_file);

    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe(valid_image_file.name);
    expect(result.type).toBe(valid_image_file.type);
  });

  it('max_width가 작으면 더 작은 파일을 반환합니다', async () => {
    const large_blob = new Blob(['large blob content'], { type: 'image/jpeg' });
    const small_blob = new Blob(['tiny'], { type: 'image/jpeg' });

    // 1. 큰 maxWidth (500) → 큰 파일
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(large_blob);
    });
    const large_file = await compressImage(valid_image_file, 500);

    // 2. 작은 maxWidth (100) → 작은 파일
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(small_blob);
    });
    const small_file = await compressImage(valid_image_file, 100);

    expect(large_file.size).toBeGreaterThan(small_file.size);
  });

  it('파일이 undefined이면 에러를 던집니다', async () => {
    // @ts-expect-error: 의도적으로 undefined를 전달
    await expect(compressImage(undefined)).rejects.toThrow('파일이 제공되지 않았습니다.');
  });

  it('File 타입이 아닌 값이 들어오면 에러를 던집니다', async () => {
    // @ts-expect-error: 의도적으로 잘못된 타입을 전달
    await expect(compressImage({})).rejects.toThrow('유효한 File 객체가 아닙니다.');
  });
});
