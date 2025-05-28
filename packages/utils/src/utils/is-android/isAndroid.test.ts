import { isAndroid } from './isAndroid';

const IOS_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36';
const AOS_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36';
describe('isAndroid', () => {
  it('안드로이드의 userAgent로 호출한 경우 true를 반환합니다.', () => {
    vi.stubGlobal('navigator', {
      userAgent: AOS_USER_AGENT,
    });

    const is_android = isAndroid();

    expect(is_android).toBeTruthy();
  });

  it('안드로이드가 아닌 IOS등의 다른 userAgent로 호출한 경우 false를 반환합니다.', () => {
    vi.stubGlobal('navigator', {
      userAgent: IOS_USER_AGENT,
    });

    const is_android = isAndroid();

    expect(is_android).toBeFalsy();
  });
});
