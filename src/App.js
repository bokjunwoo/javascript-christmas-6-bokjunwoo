import InputView from './InputView.js';
import Menu from './Menu.js';
import Order from './Order.js';
import OutputView from './OutputView.js';
import VisitDate from './VisitDate.js';
import DiscountCalculator from './DiscountCalculator.js';
import { getBadge, getGiftEvent } from './utils.js';

class App {
  #visitDate;
  #order;

  constructor() {
    this.#order = new Order();
  }

  async run() {
    OutputView.printIntroduction();
    OutputView.printMenuList();

    await this.#userInputDate();
    await this.#userInputOrderSheet();
  }

  async #userInputDate() {
    while (true) {
      try {
        const input = await InputView.inputDate();
        this.#visitDate = new VisitDate(input);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  async #userInputOrderSheet() {
    while (true) {
      try {
        const input = await InputView.inputOrderSheet();
        this.#processOrderSheet(input);
        this.#displayOrderDetails();
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  #processOrderSheet(orderSheetInput) {
    orderSheetInput.forEach((orderSheet) => {
      const [menuName, quantity] = orderSheet.split('-');
      const menu = new Menu(menuName);
      this.#order.addMenuItem(menu, parseInt(quantity));
    });
  }

  #displayOrderDetails() {
    const discountCalculator = new DiscountCalculator(
      this.#visitDate,
      this.#order
    );

    const totalOrderAmountBeforeDiscount = this.#order.calculateTotalAmount();
    const { totalDiscountAmount, finalDiscountAmount } =
      this.#calculateDiscountAmounts(discountCalculator);

    this.#printOrderDetails(
      discountCalculator,
      totalOrderAmountBeforeDiscount,
      totalDiscountAmount,
      finalDiscountAmount
    );
  }

  #calculateDiscountAmounts(discountCalculator) {
    const totalDiscountAmount =
      discountCalculator.calculateTotalDiscountAmount();
    const finalDiscountAmount =
      discountCalculator.calculateAdjustedDiscountAmount();
    return { totalDiscountAmount, finalDiscountAmount };
  }

  #printOrderDetails(
    discountCalculator,
    totalOrderAmountBeforeDiscount,
    totalDiscountAmount,
    finalDiscountAmount
  ) {
    const benefitDetails = discountCalculator.calculateBenefitDetails();
    const paymentAmountAfterDiscount =
      totalOrderAmountBeforeDiscount - finalDiscountAmount;

    this.#outputOrderDetails(
      totalOrderAmountBeforeDiscount,
      benefitDetails,
      totalDiscountAmount,
      paymentAmountAfterDiscount
    );
  }

  #outputOrderDetails(
    totalOrderAmountBeforeDiscount,
    benefitDetails,
    totalDiscountAmount,
    paymentAmountAfterDiscount
  ) {
    OutputView.printEventPreview(this.#visitDate.todayInfo());
    OutputView.printOrderMenu(this.#order.menuOrdered());
    OutputView.printTotalOrderAmountBeforeDiscount(
      totalOrderAmountBeforeDiscount
    );
    OutputView.printGiftEvent(getGiftEvent(totalOrderAmountBeforeDiscount));
    OutputView.printBenefitDetails(benefitDetails);
    OutputView.printResultTotalDiscountAmount(totalDiscountAmount);
    OutputView.printPaymentAmountAfterDiscount(paymentAmountAfterDiscount);
    OutputView.printDecemberEventBadge(getBadge(totalDiscountAmount));
    OutputView.printThankYouMessage();
  }
}

export default App;
