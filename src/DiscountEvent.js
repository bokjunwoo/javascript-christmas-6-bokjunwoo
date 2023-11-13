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
    return this.#date.isSpecialDiscountDay() ? 1000 : 0;
  }

  calculateGiftEventDiscount() {
    return this.#order.calculateTotalPrice() >= 120000 ? 25000 : 0;
  }

  calculateAdjustedDiscountAmount() {
    const isGiftEventMenuIncluded = this.#order.isGiftEventMenuIncluded();

    let totalDiscountAmount = this.calculateTotalDiscountAmount();

    if (
      this.#order.calculateTotalPrice() >= 120000 &&
      !isGiftEventMenuIncluded
    ) {
      totalDiscountAmount -= 25000;
    }

    return totalDiscountAmount;
  }

  calculateBenefitDetails() {
    const benefits = [
      {
        name: '크리스마스 디데이 할인',
        amount: this.calculateChristmasDiscount(),
      },
      {
        name: this.#date.isWeekend() ? '주말 할인' : '평일 할인',
        amount: this.calculateWeekendOrWeekdayDiscount(),
      },
      { name: '특별 할인', amount: this.calculateSpecialDiscount() },
      { name: '증정 이벤트', amount: this.calculateGiftEventDiscount() },
    ];

    const filteredBenefits = benefits.filter((benefit) => benefit.amount > 0);

    return filteredBenefits.length > 0 ? filteredBenefits : null;
  }
}

export default DiscountEvent;
