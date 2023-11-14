import {
  BADGES,
  DISCOUNT_CONSTANTS,
  ERROR_MESSAGE,
  GIFT_EVENT,
  MAX_ORDER_QUANTITY,
} from './constants.js';

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

export const organizeMenuByType = (menuData) => {
  return menuData.reduce((organizedMenu, item) => {
    if (!organizedMenu[item.type]) {
      organizedMenu[item.type] = [];
    }
    organizedMenu[item.type].push(item);
    return organizedMenu;
  }, {});
};

export const formatPrice = (price) => {
  return price.toLocaleString();
};
