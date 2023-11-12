import { ERROR_MESSAGE } from './constants.js';
import { menuData } from './data.js';

export const isValidVisitDate = (date) => {
  const numericDate = Number(date);

  if (isNaN(numericDate)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMERIC);
  }

  if (!Number.isInteger(numericDate)) {
    throw new Error(ERROR_MESSAGE.NOT_INTEGER);
  }

  if (numericDate < 1 || numericDate > 31) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }

  return true;
};

export const validateMenuName = (name) => {
  if (!menuData.find((menu) => menu.name === name)) {
    throw new Error('[ERROR] 해당 메뉴를 찾을 수 없습니다.');
  }
};
