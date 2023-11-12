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

  calculateTotalPrice() {
    const total = this.#orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return total;
  }

  mainMenuTotalQuantity() {
    const mainMenuItems = this.#orderItems.filter((item) => item.type === 'main');
    const mainMenuTotalQuantity = mainMenuItems.reduce((total, item) => total + item.quantity, 0);
    return mainMenuTotalQuantity;
  }

  dessertTotalQuantity() {
    const dessertItems = this.#orderItems.filter((item) => item.type === 'dessert');
    const dessertTotalQuantity = dessertItems.reduce((total, item) => total + item.quantity, 0);
    return dessertTotalQuantity;
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
