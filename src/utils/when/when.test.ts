import { When } from './when';

describe('When', () => {
  describe('When.create()', () => {
    describe('조건이 매칭될 때', () => {
      it('첫 번째로 true 인 조건의 값을 반환합니다', () => {
        const result = When.create<string>()
          .is(true, 'first')
          .is(true, 'second')
          .else('default');

        expect(result).toBe('first');
      });

      it('중간 조건이 매칭될 때 해당 값을 반환합니다', () => {
        const result = When.create<string>()
          .is(false, 'A')
          .is(true, 'B')
          .is(true, 'C')
          .else('default');

        expect(result).toBe('B');
      });

      it('결과값이 0 이어도 else 기본값이 아닌 매칭된 0 을 반환합니다', () => {
        const result = When.create<number>().is(true, 0).else(99);

        expect(result).toBe(0);
      });

      it('결과값이 빈 문자열이어도 else 기본값이 아닌 매칭된 빈 문자열을 반환합니다', () => {
        const result = When.create<string>().is(true, '').else('default');

        expect(result).toBe('');
      });

      it('결과값이 false 이어도 else 기본값이 아닌 매칭된 false 를 반환합니다', () => {
        const result = When.create<boolean>().is(true, false).else(true);

        expect(result).toBe(false);
      });
    });

    describe('조건이 매칭되지 않을 때', () => {
      it('모든 조건이 false 일 때 else 기본값을 반환합니다', () => {
        const result = When.create<string>()
          .is(false, 'A')
          .is(false, 'B')
          .else('default');

        expect(result).toBe('default');
      });

      it('.is() 가 하나도 없을 때 else 기본값을 반환합니다', () => {
        const result = When.create<string>().else('default');

        expect(result).toBe('default');
      });
    });

    describe('실제 사용 시나리오', () => {
      it('showroom 상태 분기에 사용할 수 있습니다', () => {
        enum ShowroomStatus {
          SCHEDULED = 'SCHEDULED',
          ENDED = 'ENDED',
          ACTIVE = 'ACTIVE',
        }
        const date_start = new Date('2024-01-01');
        const date_end = new Date('2024-12-31');
        const now_before_start = new Date('2023-06-15');
        const now_active = new Date('2024-06-15');
        const now_after_end = new Date('2025-03-01');

        const scheduled_status = When.create<ShowroomStatus>()
          .is(now_before_start < date_start, ShowroomStatus.SCHEDULED)
          .is(now_before_start > date_end, ShowroomStatus.ENDED)
          .else(ShowroomStatus.ACTIVE);

        const active_status = When.create<ShowroomStatus>()
          .is(now_active < date_start, ShowroomStatus.SCHEDULED)
          .is(now_active > date_end, ShowroomStatus.ENDED)
          .else(ShowroomStatus.ACTIVE);

        const ended_status = When.create<ShowroomStatus>()
          .is(now_after_end < date_start, ShowroomStatus.SCHEDULED)
          .is(now_after_end > date_end, ShowroomStatus.ENDED)
          .else(ShowroomStatus.ACTIVE);

        expect(scheduled_status).toBe(ShowroomStatus.SCHEDULED);
        expect(active_status).toBe(ShowroomStatus.ACTIVE);
        expect(ended_status).toBe(ShowroomStatus.ENDED);
      });
    });
  });

  describe('When.of()', () => {
    describe('subject 기반 조건이 매칭될 때', () => {
      it('subject 를 조건 함수에 전달하여 true 를 반환하는 첫 번째 값을 반환합니다', () => {
        const result = When.of<number, string>(85)
          .is((s) => s >= 90, '우수')
          .is((s) => s >= 70, '양호')
          .else('미흡');

        expect(result).toBe('양호');
      });

      it('첫 번째 조건이 매칭된 이후 나머지 조건 함수를 호출하지 않습니다', () => {
        const second_condition = vi.fn().mockReturnValue(true);

        When.of<number, string>(95)
          .is((s) => s >= 90, '우수')
          .is(second_condition, '양호')
          .else('미흡');

        expect(second_condition).not.toHaveBeenCalled();
      });

      it('subject 가 string 타입일 때 조건 함수에 올바른 타입으로 전달됩니다', () => {
        const result = When.of<string, number>('hello')
          .is((s) => s.length > 3, 1)
          .else(0);

        expect(result).toBe(1);
      });
    });

    describe('subject 기반 조건이 매칭되지 않을 때', () => {
      it('모든 조건 함수가 false 를 반환하면 else 기본값을 반환합니다', () => {
        const result = When.of<number, string>(50)
          .is((s) => s >= 90, '우수')
          .is((s) => s >= 70, '양호')
          .else('미흡');

        expect(result).toBe('미흡');
      });
    });

    describe('실제 사용 시나리오', () => {
      it('점수 구간별 등급 분류에 사용할 수 있습니다', () => {
        const getGrade = (score: number) =>
          When.of<number, string>(score)
            .is((s) => s >= 90, 'A')
            .is((s) => s >= 80, 'B')
            .is((s) => s >= 70, 'C')
            .else('F');

        expect(getGrade(95)).toBe('A');
        expect(getGrade(85)).toBe('B');
        expect(getGrade(75)).toBe('C');
        expect(getGrade(60)).toBe('F');
      });
    });
  });
});
