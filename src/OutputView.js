import { Console } from '@woowacourse/mission-utils';
import { RESTAURANT_EVENT_PLANNER_MESSAGE } from './constants.js';

const OutputView = {
  printIntroduction() {
    Console.print(RESTAURANT_EVENT_PLANNER_MESSAGE);
  },
};

export default OutputView;
