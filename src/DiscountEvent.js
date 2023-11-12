class DiscountEvent {
  #date;
  #order;

  constructor(date, order) {
    this.#date = date;
    this.#order = order;
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
