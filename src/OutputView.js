import { Console } from '@woowacourse/mission-utils';
import { RESTAURANT_EVENT_PLANNER_MESSAGE } from './constants.js';

const OutputView = {
  printIntroduction() {
    Console.print(RESTAURANT_EVENT_PLANNER_MESSAGE);
  },

  printErrorMessage(message) {
    Console.print(`${message}\n`);
  },

  printOrderMenu(menuOrdered) {
    Console.print('\n<주문 메뉴>');
    menuOrdered.forEach((menu) => {
      Console.print(menu);
    });
  },

  printTotalOrderAmountBeforeDiscount(totalOrderAmountBeforeDiscount) {
    Console.print('\n<할인 전 총주문 금액>');
    Console.print(`${totalOrderAmountBeforeDiscount.toLocaleString()}원`);
  },

  printGiftEvent(giftMenu) {
    Console.print('\n<증정 메뉴>');
    Console.print(giftMenu);
  },

  printBenefitDetails(benefitDetails) {
    Console.print('\n<혜택 내역>');
    if (!benefitDetails) {
      Console.print('없음');
      return;
    }

    benefitDetails.forEach((detail) => {
      Console.print(`${detail.name}: -${detail.amount.toLocaleString()}원`);
    });
  },

  printResultTotalDiscountAmount(totalDiscountAmount) {
    Console.print('\n<총혜택 금액>');
    if (totalDiscountAmount === 0) {
      Console.print('없음');
    } else {
      Console.print(`-${totalDiscountAmount.toLocaleString()}원`);
    }
  },
};

export default OutputView;
