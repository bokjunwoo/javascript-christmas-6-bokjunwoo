import { Console } from '@woowacourse/mission-utils';
import { USER_PROMPT_MESSAGE } from './constants.js';

const InputView = {
  async inputDate() {
    const userInput = await Console.readLineAsync(USER_PROMPT_MESSAGE.DATE);
    return userInput;
  },
};

export default InputView;
