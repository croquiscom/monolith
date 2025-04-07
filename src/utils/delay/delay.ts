/**
 * 정해진 시간 동안 기다립니다
 *
 * @example
 * <pre>
 *   const delayForOneSecond = async () => {
 *     await wait(1000);
 *     console.log('1초 후 출력됩니다.');
 *   }
 * </pre>
 *
 * @param ms - 딜레이 할 ms 단위를 입력합니다.
 */
export function delay(ms: number) {
  return new Promise<void>((resolve) => {
    if (ms === 0) {
      resolve();
    } else {
      setTimeout(resolve, ms);
    }
  });
}
