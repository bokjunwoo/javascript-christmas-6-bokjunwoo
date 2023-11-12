import InputView from './InputView.js';
import Menu from './Menu.js';
import Order from './Order.js';
import OutputView from './OutputView.js';
import VisitDate from './VisitDate.js';

class App {
  #visitDate;
  #order;

  constructor() {
    this.#order = new Order();
  }

  async run() {
    OutputView.printIntroduction();

    await this.UserInputDate();
    await this.UserInputOrderSheet();
  }

  async UserInputDate() {
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

  async UserInputOrderSheet() {
    while (true) {
      try {
        const input = await InputView.inputOrderSheet();
        this.processOrderSheet(input);
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }

  processOrderSheet(orderSheetInput) {
    orderSheetInput.forEach((orderSheet) => {
      const [menuName, quantity] = orderSheet.split('-');
      const menu = new Menu(menuName, quantity);
      this.#order.addMenuItem(menu, parseInt(quantity));
    });
  }
}

export default App;
