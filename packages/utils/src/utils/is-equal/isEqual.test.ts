import { isEqual } from './isEqual';

describe('isEqual', () => {
  test('기본 타입 비교', () => {
    expect(isEqual(1, 1)).toBe(true);
    expect(isEqual('hello', 'hello')).toBe(true);
    expect(isEqual(true, true)).toBe(true);
    expect(isEqual(null, null)).toBe(true);
    expect(isEqual(undefined, undefined)).toBe(true);

    expect(isEqual(1, 2)).toBe(false);
    expect(isEqual('hello', 'world')).toBe(false);
    expect(isEqual(true, false)).toBe(false);
    expect(isEqual(null, undefined)).toBe(false);
  });

  test('객체 비교', () => {
    expect(isEqual({}, {})).toBe(true);
    expect(isEqual({ a: 1 }, { a: 1 })).toBe(true);
    expect(isEqual({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 1 } })).toBe(true);

    expect(isEqual({ a: 1 }, { a: 2 })).toBe(false);
    expect(isEqual({ a: 1 }, { b: 1 })).toBe(false);
    expect(isEqual({ a: { b: 1 } }, { a: { b: 2 } })).toBe(false);
  });

  test('배열 비교', () => {
    expect(isEqual([], [])).toBe(true);
    expect(isEqual([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(isEqual([[1], [2]], [[1], [2]])).toBe(true);
    expect(isEqual([{ a: 1 }], [{ a: 1 }])).toBe(true);

    expect(isEqual([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(isEqual([1, 2], [1, 2, 3])).toBe(false);
    expect(isEqual([[1]], [[2]])).toBe(false);
  });

  test('함수 비교', () => {
    const func1 = () => {
      console.log('hello');
      return 1;
    };
    const func2 = () => {
      console.log('hello');
      return 2;
    };
    expect(isEqual(func1, func1)).toBe(true);
    expect(isEqual(func1, func2)).toBe(false);
  });

  test('복합적인 데이터 구조 비교', () => {
    const obj1 = {
      a: [1, 2, { b: 3 }],
      c: { d: [4, 5] },
      e: { f: {g: 6}}
    };
    const obj2 = {
      a: [1, 2, { b: 3 }],
      c: { d: [4, 5] },
      e: { f: {g: 6}}
    };
    expect(isEqual(obj1, obj2)).toBe(true);

    const obj3 = {
      a: [1, 2, { b: 4 }],
      c: { d: [4, 5] },
      e: { f: {g: 6}}
    };
    expect(isEqual(obj1, obj3)).toBe(false);

    const obj4 = {
      a: [1, 2, { b: 3 }],
      c: { d: [4, 5] },
      e: { f: {g: 7}}
    };
    expect(isEqual(obj1, obj4)).toBe(false);
  });
});
