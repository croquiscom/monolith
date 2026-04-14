/**
 * 배열을 감싸 `filter`, `map` 을 체이닝 방식으로 조합할 수 있는 빌더입니다.
 * 각 연산은 새로운 `Stream` 인스턴스를 반환하므로 원본 배열을 변경하지 않으며,
 * `.toArray()` 를 호출하기 전까지 체이닝을 계속 이어갈 수 있습니다.
 *
 * @example filter + map 체이닝
 * ```typescript
 * const promotionIds = Stream.from(items)
 *   .filter(item => !item.contentUrl)
 *   .map(item => item.promotionId)
 *   .toArray();
 * ```
 *
 * @example filter 여러 번 체이닝
 * ```typescript
 * const promotionIds = Stream.from(items)
 *   .filter(item => !item.contentUrl)
 *   .filter(item => item.promotionId !== '')
 *   .map(item => item.promotionId)
 *   .toArray();
 * ```
 *
 * @example 빈 배열 처리
 * ```typescript
 * const result = Stream.from<number>([])
 *   .filter(n => n > 0)
 *   .map(n => n * 2)
 *   .toArray(); // []
 * ```
 *
 * @example 타입 변환 (T → U)
 * ```typescript
 * const lengths = Stream.from(['apple', 'banana', 'kiwi'])
 *   .filter(s => s.length > 4)
 *   .map(s => s.length)
 *   .toArray(); // [5, 6]
 * ```
 */
export class Stream<T> {
  private constructor(private readonly items: T[]) {}

  /**
   * 배열로부터 `Stream` 인스턴스를 생성합니다.
   * @param items 스트림으로 감쌀 배열
   * @returns Stream 인스턴스
   *
   * @example
   * ```typescript
   * const stream = Stream.from([1, 2, 3]);
   * ```
   */
  static from<T>(items: T[]): Stream<T> {
    return new Stream(items);
  }

  /**
   * 조건 함수를 만족하는 항목만 남긴 새로운 `Stream` 을 반환합니다.
   * 원본 배열은 변경되지 않습니다.
   * @param predicate 각 항목에 대해 포함 여부를 결정하는 함수
   * @returns 조건을 만족하는 항목으로 구성된 새로운 Stream
   *
   * @example
   * ```typescript
   * Stream.from([1, 2, 3, 4])
   *   .filter(n => n % 2 === 0)
   *   .toArray(); // [2, 4]
   * ```
   */
  filter(predicate: (item: T) => boolean): Stream<T> {
    return new Stream(
      this.items.reduce<T[]>((acc, item) => {
        if (predicate(item)) acc.push(item);
        return acc;
      }, []),
    );
  }

  /**
   * 각 항목을 변환한 새로운 `Stream` 을 반환합니다.
   * 타입 변환(T → U)도 가능하며, 원본 배열은 변경되지 않습니다.
   * @param mapper 각 항목을 변환하는 함수
   * @returns 변환된 항목으로 구성된 새로운 Stream
   *
   * @example
   * ```typescript
   * Stream.from(['a', 'bb', 'ccc'])
   *   .map(s => s.length)
   *   .toArray(); // [1, 2, 3]
   * ```
   */
  map<U>(mapper: (item: T) => U): Stream<U> {
    return new Stream(this.items.map(mapper));
  }

  /**
   * 스트림의 최종 결과를 배열로 반환합니다.
   * @returns 변환 및 필터링이 적용된 배열
   *
   * @example
   * ```typescript
   * Stream.from([1, 2, 3]).toArray(); // [1, 2, 3]
   * ```
   */
  toArray(): T[] {
    return this.items;
  }
}
