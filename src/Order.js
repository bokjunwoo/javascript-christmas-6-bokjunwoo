import { checkOrderQuantityLimit, validateMenuQuantity } from './utils.js';

class Order {
  #orderQuantity;

  constructor() {
    this.#orderQuantity = 0;
  }

  validateAndAdd(quantity) {
    try {
      validateMenuQuantity(quantity);
      checkOrderQuantityLimit(this.#orderQuantity, quantity);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default Order;
