import { Console } from '@woowacourse/mission-utils';
import { OUTPUT_MESSAGES, typeMap } from './constants.js';
import { formatPrice, organizeMenuByType } from './utils.js';
import { menuData } from './data.js';

const OutputView = {
  printIntroduction() {
    Console.print(OUTPUT_MESSAGES.INTRODUCTION);
  },

  printMenuList() {
    Console.print(OUTPUT_MESSAGES.MENU_LIST_HEADER);
    const organizedMenu = organizeMenuByType(menuData);
    Object.keys(organizedMenu).forEach((type) => {
      Console.print(`<${typeMap[type]}>`);
      Console.print(
        organizedMenu[type]
          .map((item) => `${item.name}(${formatPrice(item.price)})`)
          .join(', ')
      );
      Console.print('');
    });
  },

  printEventPreview(todayInfo) {
    Console.print(
      `\n${todayInfo.month}월 ${todayInfo.day}일(${todayInfo.dayOfTheWeek})${OUTPUT_MESSAGES.EVENT_PREVIEW_HEADER}`
    );
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
    Console.print(`${formatPrice(totalOrderAmountBeforeDiscount)}원`);
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
      Console.print(`${detail.name}: -${formatPrice(detail.amount)}원`);
    });
  },

  printResultTotalDiscountAmount(totalDiscountAmount) {
    Console.print(OUTPUT_MESSAGES.RESULT_TOTAL_DISCOUNT_AMOUNT);
    if (totalDiscountAmount === 0) {
      Console.print(OUTPUT_MESSAGES.NO_DISCOUNT);
    } else {
      Console.print(`-${formatPrice(totalDiscountAmount)}원`);
    }
  },

  printPaymentAmountAfterDiscount(paymentAmountAfterDiscount) {
    Console.print(OUTPUT_MESSAGES.PAYMENT_AMOUNT_AFTER_DISCOUNT);
    Console.print(`${formatPrice(paymentAmountAfterDiscount)}원`);
  },

  printDecemberEventBadge(badge) {
    Console.print(OUTPUT_MESSAGES.DECEMBER_EVENT_BADGE);
    Console.print(badge);
  },

  printThankYouMessage() {
    Console.print(OUTPUT_MESSAGES.THANK_YOU_MESSAGE)
  }
};

export default OutputView;
