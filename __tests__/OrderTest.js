import Menu from '../src/Menu';
import Order from '../src/Order';

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
});
