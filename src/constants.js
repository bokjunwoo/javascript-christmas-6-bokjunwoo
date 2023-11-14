const NONE = '없음';

export const ERROR_MESSAGE = {
  NOT_NUMERIC: '[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요.',
  NOT_INTEGER: '[ERROR] 날짜는 정수여야 합니다. 다시 입력해 주세요.',
  INVALID_DATE:
    '[ERROR] 방문 가능한 날짜는 1일 ~ 31일 입니다. 다시 입력해 주세요.',
  INVALID_ORDER: '[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요.',
  MISSING_QUANTITY:
    '[ERROR] 주문하신 메뉴의 수량이 입력되지 않았습니다. 다시 입력해주세요.',
  NON_INTEGER_QUANTITY:
    '[ERROR] 메뉴의 수량은 정수여야 합니다. 다시 입력해주세요.',
  EXCEED_MAX_QUANTITY:
    '[ERROR] 최대 주문 수량이 넘었습니다. 다시 입력해주세요.',
  EXCEED_TOTAL_QUANTITY_LIMIT:
    '[ERROR] 총 주문 수량이 20개를 초과했습니다. 다시 입력해주세요.',
  DUPLICATE_MENU: '[ERROR] 중복된 메뉴가 입력되었습니다. 다시 입력해 주세요.',
  BEVERAGE_ONLY:
    '[ERROR] 음료만 주문 시, 주문할 수 없습니다. 다시 입력해 주세요.',
};

const RESTAURANT_EVENT_PLANNER_MESSAGE = `안녕하세요! 우테코 식당 12월 이벤트 플래너입니다.

12월 1일부터 31일 까지 다양한 이벤트가 준비되어 있으니 한번 확인해 주세요. 
할인은 중복으로 적용되며 구매 금액에 따라 증정 이벤트도 진행중에 있습니다.

📣 이벤트 안내
1. 크리스마스 디데이 할인🎄
   - 이벤트 기간: 2023.12.1 ~ 2023.12.25
   - 1일부터 25일까지 매일 할인 금액이 100원씩 증가합니다. 
     (1일에는 1,000원 할인부터 시작하여, 25일에는 최대 3,400원 할인이 적용됩니다!)
2. 평일 할인(일요일~목요일)
   - 디저트 메뉴 1개당 2,023원 할인!
3. 주말 할인(금요일, 토요일)
   - 메인 메뉴 1개당 2,023원 할인!
4. 특별 할인
   - 이벤트 달력에 별이 있으면 총 주문 금액에서 1,000원 할인!
5. 증정 이벤트
   - 할인 전 총 주문 금액이 12만 원 이상일 때, 샴페인 1개 증정!
6. 이벤트 배지 혜택
   - 할인 금액에 따라 12월 이벤트 배지 부여

❌ 주의사항
- 이벤트 기간: '크리스마스 디데이 할인'을 제외한 다른 이벤트는 2023.12.1 ~ 2023.12.31 동안 적용됩니다.
- 음료 주문 불가능: 음료만 주문은 불가능합니다.
- 주문 제한: 메뉴는 한 번에 최대 20개까지만 주문 가능합니다.

많은 이용 부탁드립니다.
`;

export const USER_PROMPT_MESSAGE = {
  DATE: '12월 중 식당 예상 방문 날짜는 언제인가요? (숫자만 입력해 주세요!)\n',
  ORDER_SHEET:
    '주문하실 메뉴와 개수를 알려 주세요. (e.g. 해산물파스타-2,레드와인-1,초코케이크-1)\n',
};

export const MAX_ORDER_QUANTITY = 20;

export const OUTPUT_MESSAGES = {
  INTRODUCTION: RESTAURANT_EVENT_PLANNER_MESSAGE,
  ORDER_MENU: '\n<주문 메뉴>',
  TOTAL_ORDER_AMOUNT_BEFORE_DISCOUNT: '\n<할인 전 총주문 금액>',
  GIFT_EVENT: '\n<증정 메뉴>',
  BENEFIT_DETAILS: '\n<혜택 내역>',
  NO_RESULT: NONE,
  RESULT_TOTAL_DISCOUNT_AMOUNT: '\n<총혜택 금액>',
  NO_DISCOUNT: NONE,
  PAYMENT_AMOUNT_AFTER_DISCOUNT: '\n<할인 후 예상 결제 금액>',
  DECEMBER_EVENT_BADGE: '\n<12월 이벤트 배지>',
};

export const DISCOUNT_CONSTANTS = {
  DISCOUNT_THRESHOLD: 10000,
  GIFT_EVENT_DISCOUNT_THRESHOLD: 120000,
  GIFT_EVENT_DISCOUNT_AMOUNT: 25000,
  WEEKEND_OR_WEEKDAY_DISCOUNT_AMOUNT: 2023,
  SPECIAL_DISCOUNT_AMOUNT: 1000,
  CHRISTMAS_DISCOUNT_BASE_DISCOUNT: 1000,
  CHRISTMAS_DISCOUNT_DAILY_INCREASE: 100,
  CHRISTMAS_DISCOUNT_NAME: '크리스마스 디데이 할인',
  WEEKEND_DISCOUNT_NAME: '주말 할인',
  WEEKDAY_DISCOUNT_NAME: '평일 할인',
  SPECIAL_DISCOUNT_NAME: '특별 할인',
  GIFT_EVENT_DISCOUNT_NAME: '증정 이벤트',
};

export const MENU_TYPES = {
  MAIN: 'main',
  DESSERT: 'dessert',
  DRINK: 'drink',
  GIFT_EVENT: 'giftEvent',
};

export const GIFT_EVENT = {
  ONE_CHAMPAGNE: '샴페인 1개',
  NONE: NONE,
};

export const BADGES = {
  SANTA: '산타',
  TREE: '트리',
  STAR: '별',
  NONE: NONE,
  THRESHOLD_SANTA: 20000,
  THRESHOLD_TREE: 10000,
  THRESHOLD_STAR: 5000,
};

export const DATES = {
  CHRISTMAS_DISCOUNT_START_DATE: 1,
  CHRISTMAS_DISCOUNT_END_DATE: 25,
  CHRISTMAS_DAY: 25,
  MIN_DATE: 1,
  MAX_DATE: 31,
};

export const MENU_NAMES = {
  CHAMPAGNE: '샴페인',
};
