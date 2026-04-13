/**
 * Kotlin의 `when` 표현식과 유사한 방식으로 조건에 따른 값을 결정합니다.
 * if-else 체인과 달리 표현식(expression)으로 동작하여 `const` 할당이 가능하며,
 * `.else()` 를 통해 기본값 처리가 강제됩니다.
 *
 * - `When.create()` — 조건마다 참조 대상이 다를 때 boolean 조건으로 사용합니다.
 * - `When.of(subject)` — 하나의 변수를 기준으로 분기할 때 사용합니다.
 *
 * @example When.create() 기본 사용
 * ```typescript
 * enum ShowroomStatus { SCHEDULED, ENDED, ACTIVE }
 *
 * const status = When.create<ShowroomStatus>()
 *   .is(now < dateStart, ShowroomStatus.SCHEDULED)
 *   .is(now > dateEnd,   ShowroomStatus.ENDED)
 *   .else(ShowroomStatus.ACTIVE);
 * ```
 *
 * @example When.of() 기본 사용 — 단일 변수 기준 분기
 * ```typescript
 * const label = When.of<number, string>(score)
 *   .is(s => s >= 90, '우수')
 *   .is(s => s >= 70, '양호')
 *   .else('미흡');
 * ```
 *
 * @example 어떤 조건도 매칭되지 않을 때 else 기본값 반환
 * ```typescript
 * const result = When.create<string>()
 *   .is(false, 'A')
 *   .is(false, 'B')
 *   .else('기본값'); // '기본값' 반환
 * ```
 *
 * @example falsy 값(0, false, 빈 문자열)도 결과값으로 사용 가능
 * ```typescript
 * const count = When.create<number>()
 *   .is(isEmpty, 0)
 *   .else(items.length);
 * ```
 */
export class When<TResult, TSubject = void> {
  private isMatched = false;
  private result!: TResult;

  private constructor(private readonly subject: TSubject) {}

  /**
   * 조건마다 참조 대상이 다를 때 boolean 조건으로 When 빌더를 생성합니다.
   * @returns When 빌더 인스턴스
   *
   * @example
   * ```typescript
   * const status = When.create<ShowroomStatus>()
   *   .is(now < dateStart, ShowroomStatus.SCHEDULED)
   *   .is(now > dateEnd,   ShowroomStatus.ENDED)
   *   .else(ShowroomStatus.ACTIVE);
   * ```
   */
  static create<TResult>(): When<TResult, void> {
    return new When<TResult, void>(undefined as void);
  }

  /**
   * 하나의 변수(subject)를 기준으로 분기할 때 When 빌더를 생성합니다.
   * @param subject 조건 함수에 전달될 대상 값
   * @returns When 빌더 인스턴스
   *
   * @example
   * ```typescript
   * const label = When.of<number, string>(score)
   *   .is(s => s >= 90, '우수')
   *   .is(s => s >= 70, '양호')
   *   .else('미흡');
   * ```
   */
  static of<TSubject, TResult>(subject: TSubject): When<TResult, TSubject> {
    return new When<TResult, TSubject>(subject);
  }

  /**
   * 조건이 true 일 때 반환할 값을 등록합니다.
   * 이미 이전 조건이 매칭된 경우 이후 조건은 평가하지 않습니다.
   * @param condition `When.create()` 에서는 `boolean`, `When.of()` 에서는 subject 를 받는 함수
   * @param value 조건이 true 일 때 반환할 값
   * @returns 체이닝을 위한 When 인스턴스
   */
  is(condition: TSubject extends void ? boolean : (s: TSubject) => boolean, value: TResult): this {
    if (this.isMatched) {
      return this;
    }

    const matched =
        typeof condition === 'function'
          ? (condition as (s: TSubject) => boolean)(this.subject)
          : (condition as boolean);

      if (matched) {
        this.isMatched = true;
        this.result = value;
      }
      
    return this;
    
  }

  /**
   * 어떤 조건도 매칭되지 않았을 때 반환할 기본값을 지정하고 최종 결과를 반환합니다.
   * @param value 기본 반환값
   * @returns 매칭된 값 또는 기본값
   */
  else(value: TResult): TResult {
    return this.isMatched ? this.result : value;
  }
}
