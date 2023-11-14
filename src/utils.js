import {
  BADGES,
  DATES,
  DISCOUNT_CONSTANTS,
  ERROR_MESSAGE,
  GIFT_EVENT,
  MAX_ORDER_QUANTITY,
} from './constants.js';
import { menuData } from './data.js';

export const isValidVisitDate = (date) => {
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

  return true;
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

export const checkOrderQuantityLimit = (
  currentQuantity,
  additionalQuantity
) => {
  if (currentQuantity + additionalQuantity > MAX_ORDER_QUANTITY) {
    throw new Error(ERROR_MESSAGE.EXCEED_TOTAL_QUANTITY_LIMIT);
  }
};

export const getBadge = (totalDiscountAmount) => {
  if (totalDiscountAmount >= BADGES.THRESHOLD_SANTA) {
    return BADGES.SANTA;
  } else if (totalDiscountAmount >= BADGES.THRESHOLD_STAR) {
    return BADGES.TREE;
  } else if (totalDiscountAmount >= BADGES.THRESHOLD_STAR) {
    return BADGES.STAR;
  } else {
    return BADGES.NONE;
  }
};

export const getGiftEvent = (totalOrderAmountBeforeDiscount) => {
  if (
    totalOrderAmountBeforeDiscount >=
    DISCOUNT_CONSTANTS.GIFT_EVENT_DISCOUNT_THRESHOLD
  ) {
    return GIFT_EVENT.ONE_CHAMPAGNE;
  } else {
    return GIFT_EVENT.NONE;
  }
};
