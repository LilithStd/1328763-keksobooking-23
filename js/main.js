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
const minNumb  = 0;
const maxNumb = 8;
const minNumbScore = 1;
const maxNumbScore = 5;
const minLocationCoordinateLat = 35.65000;
const maxLocationCoordinateLat = 35.70000;
const minLocationCoordinateLng = 139.70000;
const maxLocationCoordinateLng = 139.80000;
const minLengthRandomArr = 1;
const maxLengthRandomArr = 6;
const minNumberPhoto = 1;
const maxNumberPhoto = 3;
const NUMBER_AFTER_DOT_LOC = 5;


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
  return elements[getRandomNumber(0, elements.length - 1)]
};

const generateFeatures = function () {
  return getRandomArrayElement(FEATURES);
};

const generatePhoto = function () {
  return getRandomArrayElement(PHOTOS)
};


const locationX = getRandomCoordinates(minLocationCoordinateLat,maxLocationCoordinateLat,NUMBER_AFTER_DOT_LOC);
const locationY = getRandomCoordinates(minLocationCoordinateLng,maxLocationCoordinateLng,NUMBER_AFTER_DOT_LOC);

const getRandomUserID = function () {
  return USERS_ID.splice(Math.floor(Math.random() * USERS_ID.length), 1);
};
const createPlaceCard = function  ()  {
  let userId = getRandomUserID();
  const getPhotos = new Array(getRandomNumber(minNumberPhoto,maxNumberPhoto)).fill(null).map(generatePhoto);
  const getFeatures = new Array(getRandomNumber(minLengthRandomArr,maxLengthRandomArr)).fill(null).map(generateFeatures);
  return  {
    Author : {
      avatar : `img/avatars/user0${userId}.png`,
    },
    offer : {
      title: getRandomArrayElement(TITLES),
      address: 1,
      price: getRandomArrayElement(PRICE),
      type: getRandomArrayElement(TYPE_PLACE),
      rooms: getRandomNumber(minNumbScore,maxNumbScore),
      guests: getRandomNumber(minNumbScore,maxNumbScore),
      checkin: getRandomArrayElement(CHECK_IN_OUT),
      checkout: getRandomArrayElement(CHECK_IN_OUT),
      features: getFeatures,
      description: getRandomArrayElement(DESCRIPTION),
      photos: getPhotos,
    },
    location : {
      lat: locationX,
      lng: locationY,
    },
  };
};
const QUANTITY_CARDS = 10;
const createLocationCards = new Array(QUANTITY_CARDS).fill().map(createPlaceCard);
// console.log(createPlaceCard())
console.log(createLocationCards);
