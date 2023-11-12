import { menuData } from './data.js';
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

  menuInfo() {
    const menuInfo = menuData.find((menu) => menu.name === this.#name);
    return menuInfo;
  }
}

export default Menu;
