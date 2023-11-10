import { ERROR_MESSAGE } from './constants.js';

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
