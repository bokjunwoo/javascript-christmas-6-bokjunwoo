import { checkOrderQuantityLimit, validateMenuQuantity } from './utils.js';

class Order {
  #orderItems;
  #orderQuantity;

  constructor() {
    this.#orderItems = [];
    this.#orderQuantity = 0;
  }

  addMenuItem(menu, quantity) {
    this.validateAndAdd(quantity);

    const { name, price, type } = menu.menuInfo();

    this.#orderItems.push({ name, quantity, price, type });
    this.#orderQuantity += quantity;
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
