import Menu from '../src/Menu';
import Order from '../src/Order';

class MockMenu {
  constructor(name, price, type) {
    this.name = name;
    this.price = price;
    this.type = type;
  }

  menuInfo() {
    return { name: this.name, price: this.price, type: this.type };
  }
}

describe('Order 클래스', () => {
  let order;

  beforeEach(() => {
    order = new Order();
  });

  describe('calculateTotalAmount 메소드', () => {
    test('올바른 총 가격을 계산', () => {
      const menu1 = new Menu('초코케이크');
      const menu1Quantity = 2;
      const menu2 = new Menu('레드와인');
      const menu2Quantity = 1;

      order.addMenuItem(menu1, menu1Quantity);
      order.addMenuItem(menu2, menu2Quantity);

      expect(order.calculateTotalAmount()).toBe(90000);
    });

    test('올바른 계산이 아닌 경우', () => {
      const menu1 = new Menu('초코케이크');
      const menu1Quantity = 2;
      const menu2 = new Menu('레드와인');
      const menu2Quantity = 1;

      order.addMenuItem(menu1, menu1Quantity);
      order.addMenuItem(menu2, menu2Quantity);

      expect(order.calculateTotalAmount()).not.toBe(100000);
    });
  });

  describe('menuOrdered 메소드', () => {
    test('주문이 없을 때 빈 배열을 반환해야 함', () => {
      const result = order.menuOrdered();
      expect(result).toEqual([]);
    });

    test('주문이 있을 때 각 메뉴와 수량을 문자열로 반환해야 함', () => {
      const menu1 = new Menu('초코케이크');
      const menu2 = new Menu('레드와인');

      order.addMenuItem(menu1, 2);
      order.addMenuItem(menu2, 1);

      const result = order.menuOrdered();
      expect(result).toEqual(['초코케이크-2', '레드와인-1']);
    });
  });

  describe('addMenuItem 메소드', () => {
    test('주문 수량이 한도를 초과하면 에러를 던져야 함', () => {
      const menu1 = new Menu('초코케이크');

      expect(() => order.addMenuItem(menu1, 21)).toThrowError('[ERROR]');
    });

    test('주문 수량이 한도를 초과하면 에러를 던져야 함', () => {
      const mockMenu = new Menu('초코케이크');

      order.addMenuItem(mockMenu, 5);

      expect(() => order.addMenuItem(mockMenu, 16)).toThrowError('[ERROR]');
    });
  });

  describe('메인, 디저트 총 주문 수량 메소드', () => {
    test('주문된 메인 메뉴의 총 수량을 반환해야 함', () => {
      const mockMenu1 = new MockMenu('아메리카노', 3000, 'main');
      const mockMenu2 = new MockMenu('햄버거', 5000, 'main');
      const mockMenu3 = new MockMenu('치킨 스테이크', 8000, 'main');

      order.addMenuItem(mockMenu1, 2);
      order.addMenuItem(mockMenu2, 1);
      order.addMenuItem(mockMenu3, 3);

      const result = order.mainMenuTotalQuantity();
      expect(result).toBe(6);
    });

    test('주문된 디저트 메뉴의 총 수량을 반환해야 함', () => {
      const mockMenu1 = new MockMenu('초콜릿 케이크', 6000, 'dessert');
      const mockMenu2 = new MockMenu('치즈케이크', 7000, 'dessert');

      order.addMenuItem(mockMenu1, 2);
      order.addMenuItem(mockMenu2, 1);

      const result = order.dessertTotalQuantity();
      expect(result).toBe(3);
    });
  });
});
