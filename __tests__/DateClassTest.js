import VisitDate from '../src/VisitDate';

describe('VisitDate 클래스 테스트', () => {
  test('유효한 날짜에 대해 true를 반환', () => {
    expect(() => {
      new VisitDate('1');
    }).not.toThrow();
  });

  test('숫자가 아닌 날짜에 대해 에러반환', () => {
    expect(() => {
      new VisitDate('1A');
    }).toThrow('[ERROR]');
  });

  test('정수가 아닌 날짜에 대해 에러반환', () => {
    expect(() => {
      new VisitDate('1.1');
    }).toThrow('[ERROR]');
  });

  test('범위를 벗어난 날짜에 대해 에러반환', () => {
    expect(() => {
      new VisitDate('0');
    }).toThrow('[ERROR]');
  });

  describe('VisitDate의 날짜 관련 메소드', () => {
    test('1일부터 25일까지 isChristmasDiscountDay()가 true를 반환', () => {
      const visitDate = new VisitDate(1);
      expect(visitDate.isChristmasDiscountDay()).toBe(true);
    });

    test('26일부터 isChristmasDiscountDay()가 false를 반환', () => {
      const visitDate = new VisitDate(26);
      expect(visitDate.isChristmasDiscountDay()).toBe(false);
    });

    test('주중(일 ~ 목)에 isWeekend()는 false를 반환', () => {
      const visitDate = new VisitDate(6);
      expect(visitDate.isWeekend()).toBe(false);
    });

    test('주말(금 ~ 토)에 isWeekend()는 true를 반환', () => {
      const visitDate = new VisitDate(8);
      expect(visitDate.isWeekend()).toBe(true);
    });

    test('25일인 경우 isSpecialDiscountDay()가 true를 반환', () => {
      const visitDate = new VisitDate(25);
      expect(visitDate.isSpecialDiscountDay()).toBe(true);
    });

    test('11일인 경우 isSpecialDiscountDay()가 false를 반환', () => {
      const visitDate = new VisitDate(11);
      expect(visitDate.isSpecialDiscountDay()).toBe(false);
    });
  });
});
