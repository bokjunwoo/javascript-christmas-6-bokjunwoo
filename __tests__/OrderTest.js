import Menu from '../src/Menu';
import Order from '../src/Order';

describe('Order 클래스', () => {
  test('calculateTotalPrice() 메소드는 올바른 총 가격을 계산', () => {
    const order = new Order();

    const menu1 = new Menu('초코케이크');
    const menu1Quantity = 2;
    const menu2 = new Menu('레드와인');
    const menu2Quantity = 1;

    order.addMenuItem(menu1, menu1Quantity);
    order.addMenuItem(menu2, menu2Quantity);

    expect(order.calculateTotalPrice()).toBe(90000);
  });
});