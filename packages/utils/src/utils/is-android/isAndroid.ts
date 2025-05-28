/**
 * userAgent를 기반으로 Aos인지 아닌지를 판별합니다.
 *
 * @example
 * ```tsx
 * const is_android = isAndroid();
 *   or
 * const agent = navigator.userAgent // 특정한 agent가 필요한 경우;
 * const is_android = isAndroid(agent);
 * ```
 *
 * @param user_agent - 유저에이전트를 직접 입력할 수 있습니다. 기본적으로 navigator.userAgent를 사용합니다.
 * @return android 여부를 반환합니다.
 */

export function isAndroid(user_agent: string = navigator.userAgent) {
  return Boolean(user_agent && /(android)/i.test(user_agent));
}
