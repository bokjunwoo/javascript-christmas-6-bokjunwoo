class DiscountEvent {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
  }

  shouldApplyDiscount() {
    return this.#order.calculateTotalPrice() >= 10000;
  }

  calculateDiscountAmount() {
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
    return this.#date.isSpecialDiscountDay() ? 1000 : 0;
  }

  calculateGiftEventDiscount() {
    return this.#order.calculateTotalPrice() > 120000 ? 25000 : 0;
  }
}

export default DiscountEvent;
