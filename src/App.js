import InputView from './InputView.js';
import OutputView from './OutputView.js';
import VisitDate from './VisitDate.js';

class App {
  #visitDate;

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
        console.log(input)
        break;
      } catch (error) {
        OutputView.printErrorMessage(error.message);
      }
    }
  }
}

export default App;
