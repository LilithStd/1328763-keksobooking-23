import  {createArrayCards} from './utils.js';

const placeHolder = document.querySelector('#map-canvas');
const cardsTemplateContent = document.querySelector('#card')
  .content
  .querySelector('.popup');


const randomCards = createArrayCards();

const TYPE_PLACE_OBJECT = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};
const cardsListFragment = document.createDocumentFragment();
randomCards.forEach((cards) => {
  const cardsElements = cardsTemplateContent.cloneNode(true);
  const featuresAvailable = cardsElements.querySelector('.popup__features');
  const arrayImagesPlace = cards.offer.photos;
  const imageContainer = cardsElements.querySelector('.popup__photos');
  const arrayTypePlace = cards.offer.type;
  const arrayFeatures = cards.offer.features;
  const elementAvatar = cardsElements.querySelector('.popup__avatar');
  const elementTitle = cardsElements.querySelector('.popup__title');
  const elementAddress = cardsElements.querySelector('.popup__text--address');
  const elementPrice = cardsElements.querySelector('.popup__text--price');
  const elementDescription = cardsElements.querySelector('.popup__description');
  const elementType = cardsElements.querySelector('.popup__type');
  const elementCapacity = cardsElements.querySelector('.popup__text--capacity');
  const elementTime = cardsElements.querySelector('.popup__text--time');

  while(featuresAvailable.firstChild){
    featuresAvailable.removeChild(featuresAvailable.firstChild);
  }
  while(imageContainer.firstChild){
    imageContainer.removeChild(imageContainer.firstChild);
  }
  if( arrayFeatures.length === 0) {
    featuresAvailable.classList.add('visually-hidden');
  }
  if (arrayImagesPlace.length === 0)  {
    imageContainer.classList.add('visually-hidden');
  }
  for (let ind = 0; ind < arrayFeatures.length; ind++)  {
    const newLi = document.createElement('li');
    newLi.classList.add('popup__feature', `popup__feature--${arrayFeatures[ind]}`);
    featuresAvailable.appendChild(newLi);
  }
  for (let ind = 0; ind < arrayImagesPlace.length; ind++)  {
    const newImg = document.createElement('img');
    newImg.src = arrayImagesPlace[ind];
    newImg.alt = 'Фотография жилья';
    newImg.width = 45;
    newImg.height = 40;
    newImg.classList.add('popup__photo');
    imageContainer.appendChild(newImg);
  }
  if(cards.author.avatar) {
    elementAvatar.src = cards.author.avatar;
  }else{elementAvatar.classList.add('visually-hidden');}
  if(cards.offer.title) {
    elementTitle.textContent = cards.offer.title;
  }else{elementTitle.classList.add('visually-hidden');}
  if(cards.offer.address) {
    elementAddress.textContent = cards.offer.address;
  }else{elementAddress.classList.add('visually-hidden');}
  if(cards.offer.price) {
    elementPrice.textContent = `${cards.offer.price} ₽/ночь`;
  }else{elementPrice.classList.add('visually-hidden');}
  if(cards.offer.description) {
    elementDescription.textContent = cards.offer.description;
  }else{elementDescription.classList.add('visually-hidden');}
  if(cards.offer.type) {
    elementType.textContent = TYPE_PLACE_OBJECT[arrayTypePlace];
  }else{elementType.classList.add('visually-hidden');}
  if(cards.offer.guests) {
    elementCapacity.textContent = `${cards.offer.rooms} комнат для ${cards.offer.guests} гостей.`;
  }else{elementCapacity.classList.add('visually-hidden');}
  if(cards.offer.checkin && cards.offer.checkout) {
    elementTime.textContent = `Заезд после ${cards.offer.checkin}, выезд до ${cards.offer.checkout}`;
  }else{elementTime.classList.add('visually-hidden');}
  cardsListFragment.appendChild(cardsElements);
});
placeHolder.appendChild(cardsListFragment);

