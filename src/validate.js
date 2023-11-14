import {
  DATES,
  ERROR_MESSAGE,
  MAX_ORDER_QUANTITY,
  MENU_TYPES,
} from './constants.js';
import { menuData } from './data.js';

export const validVisitDate = (date) => {
  const numericDate = Number(date);

  if (isNaN(numericDate)) {
    throw new Error(ERROR_MESSAGE.NOT_NUMERIC);
  }

  if (!Number.isInteger(numericDate)) {
    throw new Error(ERROR_MESSAGE.NOT_INTEGER);
  }

  if (numericDate < DATES.MIN_DATE || numericDate > DATES.MAX_DATE) {
    throw new Error(ERROR_MESSAGE.INVALID_DATE);
  }
};

export const validateMenuName = (name) => {
  if (!menuData.find((menu) => menu.name === name)) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }
};

export const validateMenuQuantity = (quantity) => {
  const numericQuantity = Number(quantity);

  if (isNaN(numericQuantity)) {
    throw new Error(ERROR_MESSAGE.INVALID_ORDER);
  }

  if (quantity === undefined) {
    throw new Error(ERROR_MESSAGE.MISSING_QUANTITY);
  }

  if (!Number.isInteger(numericQuantity)) {
    throw new Error(ERROR_MESSAGE.NON_INTEGER_QUANTITY);
  }

  if (numericQuantity > MAX_ORDER_QUANTITY) {
    throw new Error(ERROR_MESSAGE.EXCEED_MAX_QUANTITY);
  }
};

export const checkDuplicateMenu = (orderItems) => {
  const nameSet = new Set();

  orderItems.forEach((item) => {
    if (nameSet.has(item.name)) {
      throw new Error(ERROR_MESSAGE.DUPLICATE_MENU);
    } else {
      nameSet.add(item.name);
    }
  });
};

export const checkOrderType = (orderItems) => {
  const hasDrink = orderItems.some((item) => item.type === MENU_TYPES.DRINK);
  const hasNonDrink = orderItems.some((item) => item.type !== MENU_TYPES.DRINK);

  if (hasDrink && !hasNonDrink) {
    throw new Error(ERROR_MESSAGE.BEVERAGE_ONLY);
  }
};
