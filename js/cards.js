const TYPE_PLACE_OBJECT = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const СreateCustomPopup = (point) => {
  const balloonTemplate = document.querySelector('#card').content.querySelector('.popup');
  const popupElement = balloonTemplate.cloneNode(true);
  const arrayImagesPlace = point.offer.photos;
  const arrayFeatures = point.offer.features;
  popupElement.querySelector('.popup__features').innerHTML = '';
  popupElement.querySelector('.popup__photos').innerHTML = '';

  if (!arrayFeatures || arrayFeatures.length === 0) {
    popupElement.querySelector('.popup__features').classList.add('visually-hidden');
  } else {
    for (let ind = 0; ind < arrayFeatures.length; ind++) {
      const newLi = document.createElement('li');
      newLi.classList.add('popup__feature', `popup__feature--${arrayFeatures[ind]}`);
      popupElement.querySelector('.popup__features').appendChild(newLi);
    }
  }
  if (!arrayImagesPlace || arrayImagesPlace.length === 0) {
    popupElement.querySelector('.popup__photos').classList.add('visually-hidden');
  } else {
    for (let ind = 0; ind < arrayImagesPlace.length; ind++) {
      const newImg = document.createElement('img');
      newImg.src = arrayImagesPlace[ind];
      newImg.alt = 'Фотография жилья';
      newImg.width = 45;
      newImg.height = 40;
      newImg.classList.add('popup__photo');
      popupElement.querySelector('.popup__photos').appendChild(newImg);
    }
  }

  if (point.offer.type) {
    popupElement.querySelector('.popup__type').textContent = TYPE_PLACE_OBJECT[point.offer.type];
  } else {
    popupElement.querySelector('.popup__type').classList.add('visually-hidden');
  }
  if (point.offer.description) {
    popupElement.querySelector('.popup__description').textContent = point.offer.description;
  } else {
    popupElement.querySelector('.popup__description').classList.add('visually-hidden');
  }
  if (point.offer.title) {
    popupElement.querySelector('.popup__title').textContent = point.offer.title;
  } else {
    popupElement.querySelector('.popup__title').classList.add('visually-hidden');
  }
  if (point.author.avatar) {
    popupElement.querySelector('.popup__avatar').src = point.author.avatar;
  } else {
    popupElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }
  if (point.offer.price) {
    popupElement.querySelector('.popup__text--price').textContent = point.offer.price;
    popupElement.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', '<span>₽/ночь</span>');
  } else {
    popupElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  }
  if (point.offer.checkin && point.offer.checkout) {
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${point.offer.checkin}, выезд до ${point.offer.checkout}`;
  } else {
    popupElement.querySelector('.popup__text--time').add('visually-hidden');
  }
  popupElement.querySelector('.popup__text--capacity').textContent = `${point.offer.rooms} комнат для ${point.offer.guests} гостей.`;
  popupElement.querySelector('.popup__text--address').textContent = point.offer.address;
  return popupElement;
};
export {
  СreateCustomPopup
};

