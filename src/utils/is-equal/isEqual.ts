/**
 * isEqual 함수는 두 값이 같은지 여부를 반환합니다.
 * 두 값이 같으면 true, 다르면 false를 반환합니다.
 * 두 값의 타입이 다른 경우 false를 반환합니다.
 * 두 값이 모두 배열인 경우, 두 배열의 모든 요소가 같은지 여부를 반환합니다.
 * 두 값이 모두 객체인 경우, 두 객체의 모든 키와 값이 같은지 여부를 반환합니다.
 * 두 값이 모두 함수인 경우, 두 함수가 같은지 여부를 반환합니다.
 * 두 값이 모두 문자열인 경우, 두 문자열이 같은지 여부를 반환합니다.
 * @param a - 비교할 값 1
 * @param b - 비교할 값 2
 * @returns 두 값이 같은지 여부
 */
export const isEqual = (a: unknown, b: unknown): boolean => {
  if (a === null || b === null) return a === b;

  if (typeof a === 'undefined' || typeof b === 'undefined') return a === b;

  if (typeof a !== typeof b) return false;

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;

    return a.every((item, index) => isEqual(item, b[index]));
  }

  if (typeof a === 'object' && typeof b === 'object') {
    return Object.keys(a).every((key) => isEqual(a[key as keyof typeof a], b[key as keyof typeof b]));
  }

  if (typeof a === 'function' && typeof b === 'function') {
    return a.toString() === b.toString();
  }

  if (typeof a === 'string' && typeof b === 'string') {
    return a === b;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    return a === b;
  }

  return a === b;
};
