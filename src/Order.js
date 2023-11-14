import { MENU_NAMES, MENU_TYPES } from './constants.js';
import { checkOrderQuantityLimit } from './utils.js';
import {
  checkDuplicateMenu,
  checkOrderType,
  validateMenuQuantity,
} from './validate.js';

class Order {
  #orderItems;
  #orderQuantity;

  constructor() {
    this.#orderItems = [];
    this.#orderQuantity = 0;
  }

  menuOrdered() {
    return this.#orderItems.map((item) => `${item.name}-${item.quantity}`);
  }

  addMenuItem(menu, quantity) {
    this.validateAndAdd(quantity);

    const { name, price, type } = menu.menuInfo();

    this.#orderItems.push({ name, quantity, price, type });
    this.#orderQuantity += quantity;
  }

  calculateTotalAmount() {
    const total = this.#orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
    return total;
  }

  mainMenuTotalQuantity() {
    return this.totalQuantityByType(MENU_TYPES.MAIN);
  }

  dessertTotalQuantity() {
    return this.totalQuantityByType(MENU_TYPES.DESSERT);
  }

  totalQuantityByType(menuType) {
    const items = this.#orderItems.filter((item) => item.type === menuType);
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  isGiftEventMenuIncluded() {
    return this.#orderItems.some((item) => item.name === MENU_NAMES.CHAMPAGNE);
  }

  validateAndAdd(quantity) {
    try {
      validateMenuQuantity(quantity);
      checkOrderQuantityLimit(this.#orderQuantity, quantity);
    } catch (error) {
      throw new Error(error.message);
    }
  }

  handleDuplicateAndTypeError() {
    try {
      checkDuplicateMenu(this.#orderItems);
      checkOrderType(this.#orderItems);
    } catch (error) {
      this.#orderItems = [];
      throw error;
    }
  }
}

export default Order;
