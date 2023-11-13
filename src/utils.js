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

export const validateMenuQuantity = (quantity) => {
  const numericQuantity = Number(quantity);

  if (quantity === undefined) {
    throw new Error('[ERROR] 주문하신 메뉴의 수량이 입력되지 않았습니다.');
  }

  if (isNaN(numericQuantity)) {
    throw new Error('[ERROR] 메뉴의 수량은 숫자여야 합니다.');
  }

  if (!Number.isInteger(numericQuantity)) {
    throw new Error('[ERROR] 메뉴의 수량은 정수여야 합니다.');
  }

  if (numericQuantity > 20) {
    throw new Error('[ERROR] 최대 주문 수량이 넘었습니다.');
  }
};

export const checkOrderQuantityLimit = (
  currentQuantity,
  additionalQuantity
) => {
  if (currentQuantity + additionalQuantity > 20) {
    throw new Error('[ERROR] 총 주문 수량이 20개를 초과했습니다.');
  }
};

export const getBadge = (totalDiscountAmount) => {
  if (totalDiscountAmount >= 20000) {
    return '산타';
  } else if (totalDiscountAmount >= 10000) {
    return '트리';
  } else if (totalDiscountAmount >= 5000) {
    return '별';
  } else {
    return '없음';
  }
};

export const getGitfEvent = (totalOrderAmountBeforeDiscount) => {
  if (totalOrderAmountBeforeDiscount >= 120000) {
    return '샴페인 1개';
  } else {
    return '없음';
  }
};
