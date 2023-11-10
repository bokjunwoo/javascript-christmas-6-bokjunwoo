import InputView from './InputView.js';
import OutputView from './OutputView.js';
import VisitDate from './VisitDate.js';

class App {
  #visitDate;

  async run() {
    OutputView.printIntroduction();

    await this.UserInputDate();
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
}

export default App;
