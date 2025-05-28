/**
 * userAgent를 기반으로 iOS인지 아닌지를 판별합니다.
 *
 * @example
 * ```tsx
 * const is_ios = isIos();
 *   or
 * const agent = navigator.userAgent // 특정한 agent가 필요한 경우;
 * const is_ios = isIos(agent);
 * ```
 *
 * @param user_agent - 유저에이전트를 직접 입력할 수 있습니다. 기본적으로 navigator.userAgent를 사용합니다.
 * @return iOS 여부를 반환합니다.
 */

export function isIos(user_agent: string = navigator.userAgent) {
  return Boolean(user_agent && /iPhone|iPad|iPod|\bOS X\b/gi.test(user_agent));
}
