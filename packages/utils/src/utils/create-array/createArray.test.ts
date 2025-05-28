import { createArray } from './createArray';
import '@testing-library/jest-dom';

describe('[utils]createArray', () => {
  it('각 element의 값이 index에 해당하는 주어진 길이를 가지는 배열을 생성 해야 합니다.', () => {
    expect(createArray(5)).toEqual([0, 1, 2, 3, 4]);
  });

  it('array_count가 0일 경우, 길이가 0인 배열을 생성합니다.', () => {
    expect(createArray(0)).toEqual([]);
  });

  it('array_count 값이 음수가 주어질 경우, 길이가 0인 배열을 생성합니다.', () => {
    expect(createArray(-100)).toEqual([]);
  });
});
