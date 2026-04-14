import { Stream } from './stream';

describe('Stream', () => {
  describe('Stream.from()', () => {
    it('배열로부터 Stream 인스턴스를 생성합니다', () => {
      const result = Stream.from([1, 2, 3]).toArray();

      expect(result).toEqual([1, 2, 3]);
    });

    it('빈 배열로 Stream 을 생성하면 toArray() 가 빈 배열을 반환합니다', () => {
      const result = Stream.from([]).toArray();

      expect(result).toEqual([]);
    });
  });

  describe('filter()', () => {
    describe('조건에 맞는 항목이 있을 때', () => {
      it('조건을 만족하는 항목만 남긴 배열을 반환합니다', () => {
        const result = Stream.from([1, 2, 3, 4, 5])
          .filter((n) => n % 2 === 0)
          .toArray();

        expect(result).toEqual([2, 4]);
      });

      it('모든 항목이 조건을 만족하면 원본과 동일한 배열을 반환합니다', () => {
        const result = Stream.from([2, 4, 6])
          .filter((n) => n % 2 === 0)
          .toArray();

        expect(result).toEqual([2, 4, 6]);
      });
    });

    describe('조건에 맞는 항목이 없을 때', () => {
      it('빈 배열을 반환합니다', () => {
        const result = Stream.from([1, 3, 5])
          .filter((n) => n % 2 === 0)
          .toArray();

        expect(result).toEqual([]);
      });

      it('빈 배열에 filter 를 적용하면 빈 배열을 반환합니다', () => {
        const result = Stream.from<number>([])
          .filter((n) => n > 0)
          .toArray();

        expect(result).toEqual([]);
      });
    });

    describe('filter 를 여러 번 체이닝할 때', () => {
      it('각 조건이 순서대로 적용된 결과를 반환합니다', () => {
        const result = Stream.from([1, 2, 3, 4, 5, 6])
          .filter((n) => n % 2 === 0)
          .filter((n) => n > 3)
          .toArray();

        expect(result).toEqual([4, 6]);
      });
    });

    describe('원본 배열 불변성', () => {
      it('filter 를 적용해도 원본 배열은 변경되지 않습니다', () => {
        const original = [1, 2, 3, 4];
        Stream.from(original).filter((n) => n > 2).toArray();

        expect(original).toEqual([1, 2, 3, 4]);
      });
    });
  });

  describe('map()', () => {
    describe('항목을 변환할 때', () => {
      it('각 항목에 변환 함수를 적용한 배열을 반환합니다', () => {
        const result = Stream.from([1, 2, 3])
          .map((n) => n * 2)
          .toArray();

        expect(result).toEqual([2, 4, 6]);
      });

      it('타입 변환(T → U)이 가능합니다', () => {
        const result = Stream.from(['apple', 'banana', 'kiwi'])
          .map((s) => s.length)
          .toArray();

        expect(result).toEqual([5, 6, 4]);
      });

      it('빈 배열에 map 을 적용하면 빈 배열을 반환합니다', () => {
        const result = Stream.from<number>([]).map((n) => n * 2).toArray();

        expect(result).toEqual([]);
      });
    });

    describe('원본 배열 불변성', () => {
      it('map 을 적용해도 원본 배열은 변경되지 않습니다', () => {
        const original = [1, 2, 3];
        Stream.from(original).map((n) => n * 10).toArray();

        expect(original).toEqual([1, 2, 3]);
      });
    });
  });

  describe('filter + map 체이닝', () => {
    it('filter 후 map 을 적용한 결과를 반환합니다', () => {
      const result = Stream.from([1, 2, 3, 4, 5])
        .filter((n) => n % 2 === 0)
        .map((n) => n * 10)
        .toArray();

      expect(result).toEqual([20, 40]);
    });

    it('실제 사용 시나리오 — contentUrl 이 없는 항목의 promotionId 를 추출합니다', () => {
      const items = [
        { promotionId: 'A', contentUrl: 'https://example.com' },
        { promotionId: 'B', contentUrl: '' },
        { promotionId: 'C', contentUrl: 'https://example.com' },
        { promotionId: 'D', contentUrl: '' },
      ];

      const result = Stream.from(items)
        .filter((item) => !item.contentUrl)
        .map((item) => item.promotionId)
        .toArray();

      expect(result).toEqual(['B', 'D']);
    });

    it('실제 사용 시나리오 — filter 여러 번 체이닝 후 map 을 적용합니다', () => {
      const items = [
        { promotionId: 'A', contentUrl: '' },
        { promotionId: '',  contentUrl: '' },
        { promotionId: 'C', contentUrl: 'https://example.com' },
        { promotionId: 'D', contentUrl: '' },
      ];

      const result = Stream.from(items)
        .filter((item) => !item.contentUrl)
        .filter((item) => item.promotionId !== '')
        .map((item) => item.promotionId)
        .toArray();

      expect(result).toEqual(['A', 'D']);
    });
  });
});
