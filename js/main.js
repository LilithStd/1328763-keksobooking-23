const USERS_ID  = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
];
const TITLES = [
  'Уютная угловая квартира в Центре Технологий',
  'Практичный дом на берегу моря',
  'Шикарные аппартаменты с видом на центральный парк',
  'Стильный пентхаус в стиле лофт',
  'Компактная квартира будущего с  элементами умного дома',
];
const TYPE_PLACE  = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECK_IN_OUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES  = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS =  [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const PRICE = [
  1000,
  2000,
  3000,
  5000,
];
const DESCRIPTION = [
  'Уютное место, много магазинов рядом',
  'Высокие потолки, удобная парковка, много развлечений',
  'Красивый вид на город, все чисто и аккуратно',
  'Хороший мини-бар, легко добраться до всех достопримечательностей',
  'Удачное расположение, есть балкон, красиый район',
  'Рядом много клубов и торговых центров, удобная парковка',
];
const MIN_NUMB_SCORE = 1;
const MAX_NUMB_SCORE = 5;
const MIN_LOC_COORDINATE_LAT = 35.65000;
const MAX_LOC_COORDINATE_LAT = 35.70000;
const MIN_LOC_COORDINATE_LNG = 139.70000;
const MAX_LOC_COORDINATE_LNG= 139.80000;
const MAX_LENGTH_ARRAY_FEATURES = 6;
const NUMBER_AFTER_DOT_LOC = 5;
const QUANTITY_CARDS = 10;
const COPY_USERS_ID = USERS_ID.slice();

const getRandomNumber = function(minNumber,maxNumber) {
  if (minNumber < 0 || maxNumber < 0 || maxNumber <= minNumber) {
    return;
  }
  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
};
const getRandomCoordinates  = function  (minCoordinate, maxCoordinate, numberAfterDots)  {
  if (minCoordinate < 0 || maxCoordinate < 0 || maxCoordinate <= minCoordinate) {
    return;
  }
  const originalNumber = (Math.random() * (maxCoordinate - minCoordinate + 1)) + minCoordinate;
  return originalNumber.toFixed(numberAfterDots);
};
const getRandomArrayElement = function  (elements)  {
  return elements[getRandomNumber(0, elements.length - 1)];
};
const generatePhoto = function () {
  return getRandomArrayElement(PHOTOS);
};
const getRandomUserID = function (array) {
  if (array.length === 0) {
    return '';
  }
  return `img/avatars/user0${array.splice(Math.floor(Math.random() * array.length), 1)}.png`;
};

const createPlaceCard = function  ()  {
  const userId = getRandomUserID(COPY_USERS_ID);
  const locationX = getRandomCoordinates(MIN_LOC_COORDINATE_LAT,MAX_LOC_COORDINATE_LAT,NUMBER_AFTER_DOT_LOC);
  const locationY = getRandomCoordinates(MIN_LOC_COORDINATE_LNG,MAX_LOC_COORDINATE_LNG,NUMBER_AFTER_DOT_LOC);
  const randomPhotos = new Array(getRandomNumber(0,PHOTOS.length)).fill(null).map(generatePhoto);
  const randomArrayFeatures = FEATURES.slice(0,getRandomNumber(0,MAX_LENGTH_ARRAY_FEATURES));
  return  {
    author : {
      avatar : userId,
    },
    offer : {
      title: getRandomArrayElement(TITLES),
      address: `${locationX}, ${locationY}`,
      price: getRandomArrayElement(PRICE),
      type: getRandomArrayElement(TYPE_PLACE),
      rooms: getRandomNumber(MIN_NUMB_SCORE,MAX_NUMB_SCORE),
      guests: getRandomNumber(MIN_NUMB_SCORE,MAX_NUMB_SCORE),
      checkin: getRandomArrayElement(CHECK_IN_OUT),
      checkout: getRandomArrayElement(CHECK_IN_OUT),
      features: randomArrayFeatures,
      description: getRandomArrayElement(DESCRIPTION),
      photos: randomPhotos,
    },
    location : {
      lat: locationX,
      lng: locationY,
    },
  };
};
const createArrayCards = function (quantityCards)  {
  return new Array(quantityCards).fill(null).map(createPlaceCard);
};
createArrayCards(QUANTITY_CARDS);
