import { validateMenuName } from './utils.js';

class Menu {
  #name;

  constructor(name) {
    this.#validateName(name);
    this.#name = name;
  }

  #validateName(name) {
    validateMenuName(name);
  }
}

export default Menu;
