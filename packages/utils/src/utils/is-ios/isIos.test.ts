import { isIos } from './isIos';

const IOS_USER_AGENT =
  'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/537.36 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/537.36';
const AOS_USER_AGENT =
  'Mozilla/5.0 (Linux; Android 14; SM-S911B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Mobile Safari/537.36';
describe('isIos', () => {
  it('아이폰의 userAgent로 호출한 경우 true를 반환합니다.', () => {
    vi.stubGlobal('navigator', {
      userAgent: IOS_USER_AGENT,
    });

    const is_ios = isIos();

    expect(is_ios).toBeTruthy();
  });

  it('아이폰이 아닌 AOS등의 다른 userAgent로 호출한 경우 false를 반환합니다.', () => {
    vi.stubGlobal('navigator', {
      userAgent: AOS_USER_AGENT,
    });

    const is_ios = isIos();

    expect(is_ios).toBeFalsy();
  });
});
