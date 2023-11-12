import DiscountEvent from '../src/DiscountEvent';

describe('DiscountEvent', () => {
  describe('shouldApplyDiscount 메소드', () => {
    const date = {};

    test('총 가격이 10000 이상이면 할인 적용되어야 함', () => {
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(10000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(2),
        dessertTotalQuantity: jest.fn().mockReturnValue(1),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.shouldApplyDiscount();

      expect(result).toBe(true);
    });

    test('총 가격이 10000 미만이면 할인 적용되지 않아야 함', () => {
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(8000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(2),
        dessertTotalQuantity: jest.fn().mockReturnValue(1),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.shouldApplyDiscount();

      expect(result).toBe(false);
    });
  });
});
