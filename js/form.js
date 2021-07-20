import {
  getData,
  sendData
} from './fetch.js';
import {
  renderPoints,
  resetMap
} from './map.js';
import {
  setFilterFormChangeHandler
} from './filters.js';
import {
  createErrorAlert,
  createSuccessAlert
} from './alert-modal.js';

const TIME_OUT = 1000;
const PRICE_PALACE = '10000';
const PRICE_FLAT = '1000';
const PRICE_BUNGALOW = '0';
const PRICE_HOTEL = '3000';
const PRICE_HOUSE = '5000';
const addForm = document.querySelector('.ad-form');
const addForms = document.querySelectorAll('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filters');
const mapOptions = document.querySelectorAll('.map__filter');
const mapOptionsFeatures = document.querySelectorAll('.map__features');
const mapFeatures = document.querySelectorAll('.map__checkbox');
const formElement = document.querySelectorAll('.ad-form__element');
const formHeader = document.querySelectorAll('.ad-form-header');
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const valueRooms = document.querySelector('#room_number');
const valueGuests = document.querySelector('#capacity');
const typePlace = document.querySelector('#type');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');
const resetMapButton = document.querySelector('.ad-form__reset');

const removeErrorBorder = (evt) => {
  evt.style.removeProperty('border');
};
const setErrorBorder = (evt) => {
  evt.style.border = '3px solid red';
  setTimeout(() => {
    removeErrorBorder(evt);
  }, TIME_OUT);
};

const validateGuestsAndRooms = () => {
  const numberValueRooms = Number(valueRooms.value);
  const numberValueGuets = Number(valueGuests.value);
  if (numberValueRooms === 100 && numberValueGuets !== 0) {
    setErrorBorder(valueRooms);
    valueRooms.setCustomValidity('Выбранное Вами помещение не повзоляет разместить гостей');
  } else if (numberValueGuets === 0 && numberValueRooms !== 100) {
    setErrorBorder(valueGuests);
    valueGuests.setCustomValidity('Выбранный Вами вариант не повзоляет разместить гостей в стандартных номерах, выберите другой вариант');
  } else if (numberValueRooms < numberValueGuets) {
    setErrorBorder(valueRooms);
    valueRooms.setCustomValidity('Превышено количество гостей для выбранного количества комнат');
  } else {
    valueRooms.setCustomValidity('');
    valueGuests.setCustomValidity('');
  }
};
const checkValidation = () => {
  typePlace.addEventListener('change', () => {
    switch (typePlace.value) {
      case 'palace':
        priceInput.placeholder = PRICE_PALACE;
        priceInput.min = PRICE_PALACE;
        break;
      case 'flat':
        priceInput.placeholder = PRICE_FLAT;
        priceInput.min = PRICE_FLAT;
        break;
      case 'bungalow':
        priceInput.placeholder = PRICE_BUNGALOW;
        priceInput.min = PRICE_BUNGALOW;
        break;
      case 'hotel':
        priceInput.placeholder = PRICE_HOTEL;
        priceInput.min = PRICE_HOTEL;
        break;
      case 'house':
        priceInput.placeholder = PRICE_HOUSE;
        priceInput.min = PRICE_HOUSE;
        break;
      default:
        typePlace.setCustomValidity('Совпадения по имеющимся позициям не найдены');
    }
  });
  checkIn.addEventListener('change', () => {
    switch (checkIn.value) {
      case '12:00':
        checkOut.options[0].selected = true;
        break;
      case '13:00':
        checkOut.options[1].selected = true;
        break;
      case '14:00':
        checkOut.options[2].selected = true;
        break;
      default:
        typePlace.setCustomValidity('Время въезда не определено');
    }
  });
  checkOut.addEventListener('change', () => {
    switch (checkOut.value) {
      case '12:00':
        checkIn.options[0].selected = true;
        break;
      case '13:00':
        checkIn.options[1].selected = true;
        break;
      case '14:00':
        checkIn.options[2].selected = true;
        break;
      default:
        typePlace.setCustomValidity('Время выезда не определено');
    }
  });
  valueRooms.addEventListener('change', validateGuestsAndRooms);
  valueGuests.addEventListener('change', validateGuestsAndRooms);

  titleInput.addEventListener('change', () => {
    if (titleInput.validity.tooShort) {
      setErrorBorder(titleInput);
      titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
    } else if (titleInput.validity.tooLong) {
      setErrorBorder(priceInput);
      titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxlength} символов`);
    } else if (titleInput.validity.valueMissing) {
      setErrorBorder(priceInput);
      titleInput.setCustomValidity('Поле не должно быть пустым');
    } else {
      titleInput.setCustomValidity('');
    }
  });
  priceInput.addEventListener('change', () => {
    if (priceInput.validity.rangeUnderflow) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity(`Для данного места цена не может быть меньше ${priceInput.min}`);
    } else if (priceInput.validity.rangeOverflow) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity(`Цена не может быть выше ${priceInput.max}`);
    } else if (priceInput.validity.valueMissing) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity('Поле не должно быть пустым');
    } else {
      priceInput.setCustomValidity('');
    }
  });
};
const setUserFormSubmit = () => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => createSuccessAlert(),
      () => createErrorAlert(),
      new FormData(evt.target),
    );
  });
};
const formReset = () => {
  addForm.reset();
  mapFilter.reset();
  validateGuestsAndRooms();
  priceInput.placeholder = PRICE_FLAT;
  priceInput.min = PRICE_FLAT;
  resetMap();
};
const disableForm = () => {
  addForms.forEach((item) => {
    item.classList.add('ad-form--disabled');
  });
  mapFilters.forEach((item) => {
    item.classList.add('map__filters--disabled');
  });
  mapOptions.forEach((item) => {
    item.classList.add('disabled');
  });
  mapOptionsFeatures.forEach((item) => {
    item.classList.add('disabled');
  });
  formElement.forEach((item) => {
    item.classList.add('disabled');
  });
  formHeader.forEach((item) => {
    item.classList.add('disabled');
  });
  mapFeatures.forEach((item) => {
    item.classList.add('disabled');
  });
};
const enableFormsAds = () => {
  addForms.forEach((item) => {
    item.classList.remove('ad-form--disabled');
  });
  formHeader.forEach((item) => {
    item.classList.remove('disabled');
  });
  formElement.forEach((item) => {
    item.classList.remove('disabled');
  });
  resetMapButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    formReset();
  });
  checkValidation();
  validateGuestsAndRooms();
  setUserFormSubmit();
};
const enableFiltersAds = () => {
  formReset();
  mapFilters.forEach((item) => {
    item.classList.remove('map__filters--disabled');
  });
  mapOptions.forEach((item) => {
    item.classList.remove('disabled');
  });
  mapOptionsFeatures.forEach((item) => {
    item.classList.remove('disabled');
  });
  mapFeatures.forEach((item) => {
    item.classList.remove('disabled');
  });
};
const enableForm = () => {
  enableFormsAds();
  getData((arrayCards) => {
    renderPoints(arrayCards);
    setFilterFormChangeHandler(arrayCards);
    enableFiltersAds();
  });
};
export {
  disableForm,
  enableForm,
  formReset
};
