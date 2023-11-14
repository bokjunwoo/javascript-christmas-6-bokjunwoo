import { Console } from '@woowacourse/mission-utils';
import {
  OUTPUT_MESSAGES,
} from './constants.js';

const OutputView = {
  printIntroduction() {
    Console.print(OUTPUT_MESSAGES.INTRODUCTION);
  },

  printErrorMessage(message) {
    Console.print(`${message}\n`);
  },

  printOrderMenu(menuOrdered) {
    Console.print(OUTPUT_MESSAGES.ORDER_MENU);
    menuOrdered.forEach((menu) => {
      Console.print(menu);
    });
  },

  printTotalOrderAmountBeforeDiscount(totalOrderAmountBeforeDiscount) {
    Console.print(OUTPUT_MESSAGES.TOTAL_ORDER_AMOUNT_BEFORE_DISCOUNT);
    Console.print(`${totalOrderAmountBeforeDiscount.toLocaleString()}원`);
  },

  printGiftEvent(giftMenu) {
    Console.print(OUTPUT_MESSAGES.GIFT_EVENT);
    Console.print(giftMenu);
  },

  printBenefitDetails(benefitDetails) {
    Console.print(OUTPUT_MESSAGES.BENEFIT_DETAILS);
    if (!benefitDetails) {
      Console.print(OUTPUT_MESSAGES.NO_RESULT);
      return;
    }

    benefitDetails.forEach((detail) => {
      Console.print(`${detail.name}: -${detail.amount.toLocaleString()}원`);
    });
  },

  printResultTotalDiscountAmount(totalDiscountAmount) {
    Console.print(OUTPUT_MESSAGES.RESULT_TOTAL_DISCOUNT_AMOUNT);
    if (totalDiscountAmount === 0) {
      Console.print(OUTPUT_MESSAGES.NO_DISCOUNT);
    } else {
      Console.print(`-${totalDiscountAmount.toLocaleString()}원`);
    }
  },

  printPaymentAmountAfterDiscount(paymentAmountAfterDiscount) {
    Console.print(OUTPUT_MESSAGES.PAYMENT_AMOUNT_AFTER_DISCOUNT);
    Console.print(`${paymentAmountAfterDiscount.toLocaleString()}원`);
  },

  printDecemberEventBadge(badge) {
    Console.print(OUTPUT_MESSAGES.DECEMBER_EVENT_BADGE);
    Console.print(badge);
  },
};

export default OutputView;
