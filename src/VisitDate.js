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
    if (this.#date >= 1 && this.#date <= 25) {
      const baseDiscount = 1000;
      const dailyIncrease = 100;
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
    const isChristmas = this.#date === 25;

    return isSunday || isChristmas;
  }
}

export default VisitDate;
