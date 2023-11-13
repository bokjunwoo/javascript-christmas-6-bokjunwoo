import { Console } from '@woowacourse/mission-utils';
import { RESTAURANT_EVENT_PLANNER_MESSAGE } from './constants.js';

const OutputView = {
  printIntroduction() {
    Console.print(RESTAURANT_EVENT_PLANNER_MESSAGE);
  },

  printErrorMessage(message) {
    Console.print(`${message}\n`);
  },

  printOrderMenu(menuOrdered) {
    Console.print('\n<주문 메뉴>');
    menuOrdered.forEach((menu) => {
      Console.print(menu);
    });
  },
};

export default OutputView;
