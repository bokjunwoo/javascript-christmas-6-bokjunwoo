import Menu from '../src/Menu';

describe('Menu 클래스 테스트', () => {
  test('유효한 메뉴이름에 대해 true를 반환(1)', () => {
    expect(() => {
      new Menu('초코케이크');
    }).not.toThrow();
  });

  test('유효한 메뉴이름에 대해 true를 반환(2)', () => {
    expect(() => {
      new Menu('바비큐립');
    }).not.toThrow();
  });

  test('유효한 메뉴이름이 아닌 경우 에러반환(1)', () => {
    expect(() => {
      new Menu('치킨샐러드');
    }).toThrow('[ERROR]');
  });

  test('유효한 메뉴이름이 아닌 경우 에러반환(2)', () => {
    expect(() => {
      new Menu('초코 케이크');
    }).toThrow('[ERROR]');
  });
});