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
    this.#resetOrder();
  }

  #resetOrder() {
    this.#orderItems = [];
    this.#orderQuantity = 0;
  }

  addMenuItem(menu, quantity) {
    this.#validateAndAdd(quantity);

    const { name, price, type } = menu.menuInfo();

    this.#orderItems.push({ name, quantity, price, type });
    this.#orderQuantity += quantity;
  }

  calculateTotalAmount() {
    return this.#orderItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );
  }

  #totalQuantityByType(menuType) {
    const items = this.#orderItems.filter((item) => item.type === menuType);
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  mainMenuTotalQuantity() {
    return this.#totalQuantityByType(MENU_TYPES.MAIN);
  }

  dessertTotalQuantity() {
    return this.#totalQuantityByType(MENU_TYPES.DESSERT);
  }

  isGiftEventMenuIncluded() {
    return this.#orderItems.some((item) => item.name === MENU_NAMES.CHAMPAGNE);
  }

  #validateAndAdd(quantity) {
    try {
      validateMenuQuantity(quantity);
      checkOrderQuantityLimit(this.#orderQuantity, quantity);
    } catch (error) {
      this.#resetOrder();
      throw new Error(error.message);
    }
  }

  handleDuplicateAndTypeError() {
    try {
      checkDuplicateMenu(this.#orderItems);
      checkOrderType(this.#orderItems);
    } catch (error) {
      this.#resetOrder();
      throw error;
    }
  }

  menuOrdered() {
    return this.#orderItems.map((item) => `${item.name}-${item.quantity}`);
  }
}

export default Order;
