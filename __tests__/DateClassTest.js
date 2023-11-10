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
});
