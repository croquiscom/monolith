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
  const originalBlob = new Blob(['original large content'], { type: 'image/jpeg' });
  const validImageFile = new File([originalBlob], 'image.jpg', { type: 'image/jpeg' });

  beforeAll(() => {
    // Prevent potential errors in environments that use blob URLs
    global.URL.createObjectURL = vi.fn(() => 'blob:http://localhost:3000/mock');
  });

  beforeEach(() => {
    // Clear previous mocks to ensure isolation
    vi.clearAllMocks();
  });

  it('압축된 이미지 파일 객체를 반환합니다', async () => {
    const mockBlob = new Blob(['mock content'], { type: 'image/jpeg' });

    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(mockBlob);
    });

    const result = await compressImage(validImageFile);

    expect(result).toBeInstanceOf(File);
    expect(result.name).toBe(validImageFile.name);
    expect(result.type).toBe(validImageFile.type);
  });

  it('max_width가 작으면 더 작은 파일을 반환합니다', async () => {
    const largeBlob = new Blob(['large blob content'], { type: 'image/jpeg' });
    const smallBlob = new Blob(['tiny'], { type: 'image/jpeg' });

    // 1. 큰 maxWidth (500) → 큰 파일
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(largeBlob);
    });
    const largeFile = await compressImage(validImageFile, 500);

    // 2. 작은 maxWidth (100) → 작은 파일
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(smallBlob);
    });
    const smallFile = await compressImage(validImageFile, 100);

    expect(largeFile.size).toBeGreaterThan(smallFile.size);
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
