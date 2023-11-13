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

  describe('calculateSpecialDiscount 메소드', () => {
    const order = {
      calculateTotalPrice: jest.fn().mockReturnValue(12000),
    };

    test('특별 할인 날이면 1000의 할인이 반환되어야 함', () => {
      const date = {
        isSpecialDiscountDay: jest.fn().mockReturnValue(true),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateSpecialDiscount();

      expect(result).toBe(1000);
    });

    test('특별 할인 날이 아니면 할인이 적용되지 않아야 함', () => {
      const date = {
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateSpecialDiscount();

      expect(result).toBe(0);
    });
  });

  describe('calculateGiftEventDiscount 메소드', () => {
    const date = {};
    test('주문 총 가격이 120000 이상이면 증정 이벤트 가격이 할인이 반환되어야 함', () => {
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(130000),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateGiftEventDiscount();

      expect(result).toBe(25000);
    });

    test('주문 총 가격이 120000 미만이면 증정 이벤트 가격 할인이 적용되지 않아야 함', () => {
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(100000),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateGiftEventDiscount();

      expect(result).toBe(0);
    });
  });

  describe('calculateDiscountAmount 메소드', () => {
    test('크리스마스 디데이 할인이 적용(1,500원), 평일 할인 적용, 특별 할인 미적용, 디저트 주문이 총 3개 일 때', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
        christmasDiscountAmount: jest.fn().mockReturnValue(1500),
      };
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(10000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(2),
        dessertTotalQuantity: jest.fn().mockReturnValue(3),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateTotalDiscountAmount();

      expect(result).toBe(7569);
    });

    test('크리스마스 디데이 할인이 미적용, 평일 할인 적용, 특별 할인 적용, 디저트 주문이 총 10개 일 때', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(true),
        christmasDiscountAmount: jest.fn().mockReturnValue(0),
      };
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(12000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(0),
        dessertTotalQuantity: jest.fn().mockReturnValue(10),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateTotalDiscountAmount();

      expect(result).toBe(21230);
    });

    test('크리스마스 디데이 할인이 적용(3200), 주말 할인 적용, 특별 할인 적용, 주문 금액이 12만원 이상, 메인 주문이 총 5개 일 때', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(true),
        isSpecialDiscountDay: jest.fn().mockReturnValue(true),
        christmasDiscountAmount: jest.fn().mockReturnValue(3200),
      };
      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(130000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(5),
        dessertTotalQuantity: jest.fn().mockReturnValue(10),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateTotalDiscountAmount();

      expect(result).toBe(39315);
    });
  });

  describe('calculateAdjustedDiscountAmount 메소드', () => {
    test('증정 이벤트 메뉴가 포함되어 있으면 기존 할인 그대로 반환되어야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
        christmasDiscountAmount: jest.fn().mockReturnValue(0),
      };

      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(120000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(0),
        dessertTotalQuantity: jest.fn().mockReturnValue(0),
        isGiftEventMenuIncluded: jest.fn().mockReturnValue(true),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateAdjustedDiscountAmount();

      expect(result).toBe(25000);
    });

    test('증정 이벤트 메뉴가 미포함되어 있으면 기존 할인에서 증정 이벤트 할인을 차감한 값을 반환해야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
        christmasDiscountAmount: jest.fn().mockReturnValue(0),
      };

      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(120000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(0),
        dessertTotalQuantity: jest.fn().mockReturnValue(0),
        isGiftEventMenuIncluded: jest.fn().mockReturnValue(false),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateAdjustedDiscountAmount();

      expect(result).toBe(0);
    });
  });

  describe('calculateBenefitDetails 메소드', () => {
    test('할인이 없으면 null을 반환해야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
        christmasDiscountAmount: jest.fn().mockReturnValue(0),
      };

      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(8000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(0),
        dessertTotalQuantity: jest.fn().mockReturnValue(0),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateBenefitDetails();

      expect(result).toBeNull();
    });

    test('할인이 적용된 항목들을 배열로 반환해야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(true),
        isSpecialDiscountDay: jest.fn().mockReturnValue(true),
        christmasDiscountAmount: jest.fn().mockReturnValue(1500),
      };

      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(120000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(5),
        dessertTotalQuantity: jest.fn().mockReturnValue(5),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateBenefitDetails();

      expect(result).toEqual([
        { name: '크리스마스 디데이 할인', amount: 1500 },
        { name: '주말 할인', amount: 5 * 2023 },
        { name: '특별 할인', amount: 1000 },
        { name: '증정 이벤트', amount: 25000 },
      ]);
    });

    test('하나의 할인이 적용된 경우 해당 항목만 배열로 반환해야 함', () => {
      const date = {
        isWeekend: jest.fn().mockReturnValue(false),
        isSpecialDiscountDay: jest.fn().mockReturnValue(false),
        christmasDiscountAmount: jest.fn().mockReturnValue(0),
      };

      const order = {
        calculateTotalPrice: jest.fn().mockReturnValue(12000),
        mainMenuTotalQuantity: jest.fn().mockReturnValue(0),
        dessertTotalQuantity: jest.fn().mockReturnValue(3),
      };

      const discountEvent = new DiscountEvent(date, order);
      const result = discountEvent.calculateBenefitDetails();

      expect(result).toEqual([{ name: '평일 할인', amount: 3 * 2023 }]);
    });
  });
});
