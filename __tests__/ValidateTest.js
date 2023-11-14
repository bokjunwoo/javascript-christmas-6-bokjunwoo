import {
  checkDuplicateMenu,
  checkOrderType,
  validateMenuQuantity,
} from '../src/validate.js';
import { checkOrderQuantityLimit } from '../src/utils.js';

describe('Order 클래스 테스트', () => {
  describe('validateMenuQuantity() 유효성 검사', () => {
    test('유효한 주문 수량인 경우', () => {
      const input = 1;
      expect(() => validateMenuQuantity(input)).not.toThrow();
    });

    test('주문 수량이 입력되지 않은 경우 에러반환', () => {
      const input = undefined;
      expect(() => validateMenuQuantity(input)).toThrow('[ERROR]');
    });

    test('주문 수량이 숫자가 아닌 날짜에 대해 에러반환', () => {
      const input = '1A';
      expect(() => validateMenuQuantity(input)).toThrow('[ERROR]');
    });

    test('주문 수량이 정수가 아닌 날짜에 대해 에러반환', () => {
      const input = 1.1;
      expect(() => validateMenuQuantity(input)).toThrow('[ERROR]');
    });

    test('주문 수량이 20을 넘어간 경우 에러반환', () => {
      const input = 21;
      expect(() => validateMenuQuantity(input)).toThrow('[ERROR]');
    });
  });

  describe('checkOrderQuantityLimit() 유효성 검사', () => {
    test('유효한 총 주문 수량인 경우', () => {
      const currentQuantity = 10;
      const additionalQuantity = 1;
      expect(() =>
        checkOrderQuantityLimit(currentQuantity, additionalQuantity)
      ).not.toThrow();
    });
    test('총 주문 수량이 20개가 넘어간 경우 에러반환', () => {
      const currentQuantity = 20;
      const additionalQuantity = 1;
      expect(() =>
        checkOrderQuantityLimit(currentQuantity, additionalQuantity)
      ).toThrow('[ERROR]');
    });
  });

  describe('checkDuplicateMenu() 유효성 검사', () => {
    test('중복된 메뉴가 없는 경우', () => {
      const orderItems = [
        { name: '초코케이크' },
        { name: '레드와인' },
        { name: '타파스' },
      ];

      expect(() => checkDuplicateMenu(orderItems)).not.toThrow();
    });

    test('중복된 메뉴가 있으면 에러 반환', () => {
      const orderItems = [
        { name: '초코케이크' },
        { name: '레드와인' },
        { name: '초코케이크' },
      ];

      expect(() => checkDuplicateMenu(orderItems)).toThrow('[ERROR]');
    });
  });

  describe('checkOrderType() 유효성 검사', () => {
    test('음료 외 다른 메뉴도 주문 한 경우', () => {
      const orderItems = [
        { name: '초코케이크', type: 'main' },
        { name: '레드와인', type: 'drink' },
        { name: '타파스', type: 'appetizer' },
      ];

      expect(() => checkOrderType(orderItems)).not.toThrow();
    });

    test('음료만 주문한 경우 에러 반환', () => {
      const orderItems = [
        { name: '제로콜라', type: 'drink' },
        { name: '레드와인', type: 'drink' },
      ];

      expect(() => checkOrderType(orderItems)).toThrow('[ERROR]');
    });
  });
});
