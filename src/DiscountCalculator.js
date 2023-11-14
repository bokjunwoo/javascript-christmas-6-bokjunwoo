import { DISCOUNT_CONSTANTS } from './constants.js';

class DiscountCalculator {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  shouldApplyDiscount() {
    return (
      this.#order.calculateTotalPrice() >= DISCOUNT_CONSTANTS.DISCOUNT_THRESHOLD
    );
  }

  calculateTotalDiscountAmount() {
    if (!this.shouldApplyDiscount()) {
      return 0;
    }

    return (
      this.calculateChristmasDiscount() +
      this.calculateWeekendOrWeekdayDiscount() +
      this.calculateSpecialDiscount() +
      this.calculateGiftEventDiscount()
    );
  }

  calculateChristmasDiscount() {
    return this.#date.christmasDiscountAmount();
  }

  calculateWeekendOrWeekdayDiscount() {
    const quantity = this.#date.isWeekend()
      ? this.#order.mainMenuTotalQuantity()
      : this.#order.dessertTotalQuantity();

    return quantity * 2023;
  }

  calculateSpecialDiscount() {
    return this.#date.isSpecialDiscountDay()
      ? DISCOUNT_CONSTANTS.SPECIAL_DISCOUNT_AMOUNT
      : 0;
  }

  calculateGiftEventDiscount() {
    return this.#order.calculateTotalPrice() >=
      DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_THRESHOLD
      ? DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_AMOUNT
      : 0;
  }

  calculateAdjustedDiscountAmount() {
    const isGiftEventMenuIncluded = this.#order.isGiftEventMenuIncluded();

    let totalDiscountAmount = this.calculateTotalDiscountAmount();

    if (
      this.#order.calculateTotalPrice() >=
        DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_THRESHOLD &&
      !isGiftEventMenuIncluded
    ) {
      totalDiscountAmount -= DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_AMOUNT;
    }

    return totalDiscountAmount;
  }

  calculateBenefitDetails() {
    if (!this.shouldApplyDiscount()) return null;

    const isWeekend = this.#date.isWeekend();
    const benefits = [
      {
        name: DISCOUNT_CONSTANTS.CHRISTMAS_DISCOUNT_NAME,
        amount: this.calculateChristmasDiscount(),
      },
      {
        name: isWeekend
          ? DISCOUNT_CONSTANTS.WEEKEND_DISCOUNT_NAME
          : DISCOUNT_CONSTANTS.WEEKDAY_DISCOUNT_NAME,
        amount: this.calculateWeekendOrWeekdayDiscount(),
      },
      {
        name: DISCOUNT_CONSTANTS.SPECIAL_DISCOUNT_NAME,
        amount: this.calculateSpecialDiscount(),
      },
      {
        name: DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_NAME,
        amount: this.calculateGiftEventDiscount(),
      },
    ];

    return benefits.filter((benefit) => benefit.amount > 0);
  }
}

export default DiscountCalculator;
