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

  describe('calculateWeekendOrWeekdayDiscount 메소드', () => {
    const order = {
      mainMenuTotalQuantity: jest.fn().mockReturnValue(3),
      dessertTotalQuantity: jest.fn().mockReturnValue(2),
    };

    test('주말이면 메인 메뉴 수량에 따른 할인이 반환되어야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(true),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateWeekendOrWeekdayDiscount();

      expect(result).toBe(6069);
    });

    test('주중이면 디저트 수량에 따른 할인이 반환되어야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateWeekendOrWeekdayDiscount();

      expect(result).toBe(4046);
    });
  });
});
