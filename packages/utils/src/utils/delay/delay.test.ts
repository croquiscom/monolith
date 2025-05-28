import { delay } from './delay';
import '@testing-library/jest-dom';

vi.useFakeTimers();

describe('delay ', () => {
  it('주어진 시간이 지난 이후 delay 이후 로직이 실행됩니다.', async () => {
    const one_second = 1000;
    const mock_cb = vi.fn();

    const promise = delay(one_second).then(mock_cb);

    expect(mock_cb).not.toHaveBeenCalled();

    vi.advanceTimersByTime(one_second);
    await promise;

    expect(mock_cb).toHaveBeenCalled();
  });

  it('0ms를 입력하면 딜레이 없이 즉시 resolve 됩니다.', async () => {
    const ms = 0;
    const mock_cb = vi.fn();

    const promise = delay(ms).then(mock_cb);

    await promise;
    expect(mock_cb).toHaveBeenCalled();
  });
});
