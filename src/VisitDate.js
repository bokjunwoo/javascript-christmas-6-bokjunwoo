import { isValidVisitDate } from './utils.js';

class VisitDate {
  #date

  constructor(date) {
    this.#validate(date)
    this.#date = date;
  }

  #validate(date) {
    isValidVisitDate(date)
  }
}

export default VisitDate