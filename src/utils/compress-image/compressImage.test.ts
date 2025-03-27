import { compressImage } from "./compressImage";

vi.mock("blueimp-load-image", () => ({
  __esModule: true,
  default: vi.fn((_, callback) => {
    // Mocked canvas element
    const mockCanvas = document.createElement("canvas");
    callback(mockCanvas); // Call the callback with the mocked canvas
  }),
}));

describe("compressImage", () => {
  beforeAll(() => {
    global.URL.createObjectURL = vi
      .fn()
      .mockReturnValue("blob:http://localhost:3000/1234");
  });

  it("파일을 압축하고 파일 객체를 리턴합니다", async () => {
    const mockBlob = new Blob(["mock content"], { type: "image/jpeg" });
    const mockFile = new File([mockBlob], "image.jpg", { type: "image/jpeg" });

    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(mockBlob);
    });

    const compressedFile = await compressImage(mockFile);

    expect(compressedFile).toBeInstanceOf(File);
    expect(compressedFile.name).toBe("image.jpg");
    expect(compressedFile.type).toBe("image/jpeg");
  });

  it("파일 사이즈를 줄입니다", async () => {
    const originalBlob = new Blob(["original big size content"], {
      type: "image/jpeg",
    });
    const mockFile = new File([originalBlob], "image.jpg", {
      type: "image/jpeg",
    });

    const compressedBlob = new Blob(["compressed content"], {
      type: "image/jpeg",
    });
    HTMLCanvasElement.prototype.toBlob = vi.fn((callback) => {
      callback(compressedBlob); // Return the smaller blob
    });

    const compressedFile = await compressImage(mockFile);
    expect(compressedFile.size).toBeLessThan(mockFile.size);
  });
});
