import { DATES, DISCOUNT_CONSTANTS } from './constants.js';
import { isValidVisitDate } from './utils.js';

class VisitDate {
  #date;

  constructor(date) {
    this.#validate(date);
    this.#date = date;
  }

  #validate(date) {
    isValidVisitDate(date);
  }

  christmasDiscountAmount() {
    if (
      this.#date >= DATES.CHRISTMAS_DISCOUNT_START_DATE &&
      this.#date <= DATES.CHRISTMAS_DISCOUNT_END_DATE
    ) {
      const baseDiscount = DISCOUNT_CONSTANTS.CHRISTMAS_DISCOUNT_BASE_DISCOUNT;
      const dailyIncrease =
        DISCOUNT_CONSTANTS.CHRISTMAS_DISCOUNT_DAILY_INCREASE;
      return Math.max(baseDiscount + dailyIncrease * (this.#date - 1), 0);
    }
    return 0;
  }

  isWeekend() {
    const dayOfWeek = new Date(`2023-12-${this.#date}`).getDay();
    return dayOfWeek === 5 || dayOfWeek === 6;
  }

  isSpecialDiscountDay() {
    const dayOfWeek = new Date(`2023-12-${this.#date}`).getDay();
    const isSunday = dayOfWeek === 0;
    const isChristmas = this.#date === DATES.CHRISTMAS_DAY;

    return isSunday || isChristmas;
  }
}

export default VisitDate;
