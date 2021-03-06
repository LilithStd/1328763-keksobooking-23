import {
  sendData
} from './fetch.js';
import {
  resetMap
} from './map.js';
import {
  createErrorAlertClickHandler,
  createSuccessAlertClickHandler
} from './alert-modal.js';

const FILE_TYPES = [
  'gif', 'jpg', 'jpeg', 'png',
];

const DEFAULT_AVATAR_SRC = 'img/muffin-grey.svg';
const DEFAULT_HOUSING_PLACE_SRC = 'img/muffin-white.svg';
const TIME_OUT = 1000;
const PRICE_PALACE = '10000';
const PRICE_FLAT = '1000';
const PRICE_BUNGALOW = '0';
const PRICE_HOTEL = '3000';
const PRICE_HOUSE = '5000';
const TYPE_PLACE_ONE = 'palace';
const TYPE_PLACE_TWO = 'flat';
const TYPE_PLACE_THREE = 'bungalow';
const TYPE_PLACE_FOUR = 'hotel';
const TYPE_PLACE_FIVE = 'house';
const CHECK_IN_OUT_FIRST_TIME = '12:00';
const CHECK_IN_OUT_SECOUND_TIME = '13:00';
const CHECK_IN_OUT_THIRD_TIME = '14:00';
const OPTIONS_VALUE_NULL = 0;
const OPTIONS_VALUE_ONE = 1;
const OPTIONS_VALUE_TWO = 2;
const VALUE_ROOMS_NOT_FOR_GUESTS = 100;
const VALUE_GUESTS_NOT_FOR_PLACE = 0;

const fileChooserAvatar = document.querySelector('.ad-form__field input[type=file]');
const previewAvatar = document.querySelector('.ad-form-header__preview img');
const fileChooserHousing = document.querySelector('.ad-form__upload input[type=file]');
const previewHousing = document.querySelector('.ad-form__photo img');
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

const validateRoomsAndGuests = () => {
  const numberValueRooms = Number(valueRooms.value);
  const numberValueGuets = Number(valueGuests.value);
  if (numberValueRooms === VALUE_ROOMS_NOT_FOR_GUESTS && numberValueGuets !== VALUE_GUESTS_NOT_FOR_PLACE) {
    setErrorBorder(valueRooms);
    valueRooms.setCustomValidity('?????????????????? ???????? ?????????????????? ???? ?????????????????? ???????????????????? ????????????');
  } else if (numberValueGuets === VALUE_GUESTS_NOT_FOR_PLACE && numberValueRooms !== VALUE_ROOMS_NOT_FOR_GUESTS) {
    setErrorBorder(valueGuests);
    valueGuests.setCustomValidity('?????????????????? ???????? ?????????????? ???? ?????????????????? ???????????????????? ???????????? ?? ?????????????????????? ??????????????, ???????????????? ???????????? ??????????????');
  } else if (numberValueRooms < numberValueGuets) {
    setErrorBorder(valueRooms);
    valueRooms.setCustomValidity('?????????????????? ???????????????????? ???????????? ?????? ???????????????????? ???????????????????? ????????????');
  } else {
    valueRooms.setCustomValidity('');
    valueGuests.setCustomValidity('');
  }
};

const valueRoomsAndGuestsChangeHandler = () => {
  validateRoomsAndGuests();
};

const checkValidationChangeHandler = () => {
  typePlace.addEventListener('change', () => {
    switch (typePlace.value) {
      case TYPE_PLACE_ONE:
        priceInput.placeholder = PRICE_PALACE;
        priceInput.min = PRICE_PALACE;
        break;
      case TYPE_PLACE_TWO:
        priceInput.placeholder = PRICE_FLAT;
        priceInput.min = PRICE_FLAT;
        break;
      case TYPE_PLACE_THREE:
        priceInput.placeholder = PRICE_BUNGALOW;
        priceInput.min = PRICE_BUNGALOW;
        break;
      case TYPE_PLACE_FOUR:
        priceInput.placeholder = PRICE_HOTEL;
        priceInput.min = PRICE_HOTEL;
        break;
      case TYPE_PLACE_FIVE:
        priceInput.placeholder = PRICE_HOUSE;
        priceInput.min = PRICE_HOUSE;
        break;
      default:
        typePlace.setCustomValidity('???????????????????? ???? ?????????????????? ???????????????? ???? ??????????????');
    }
  });

  checkIn.addEventListener('change', () => {
    switch (checkIn.value) {
      case CHECK_IN_OUT_FIRST_TIME:
        checkOut.options[OPTIONS_VALUE_NULL].selected = true;
        break;
      case CHECK_IN_OUT_SECOUND_TIME:
        checkOut.options[OPTIONS_VALUE_ONE].selected = true;
        break;
      case CHECK_IN_OUT_THIRD_TIME:
        checkOut.options[OPTIONS_VALUE_TWO].selected = true;
        break;
      default:
        typePlace.setCustomValidity('?????????? ???????????? ???? ????????????????????');
    }
  });

  checkOut.addEventListener('change', () => {
    switch (checkOut.value) {
      case CHECK_IN_OUT_FIRST_TIME:
        checkIn.options[OPTIONS_VALUE_NULL].selected = true;
        break;
      case CHECK_IN_OUT_SECOUND_TIME:
        checkIn.options[OPTIONS_VALUE_ONE].selected = true;
        break;
      case CHECK_IN_OUT_THIRD_TIME:
        checkIn.options[OPTIONS_VALUE_TWO].selected = true;
        break;
      default:
        typePlace.setCustomValidity('?????????? ???????????? ???? ????????????????????');
    }
  });

  valueRooms.addEventListener('change', valueRoomsAndGuestsChangeHandler);
  valueGuests.addEventListener('change', valueRoomsAndGuestsChangeHandler);

  titleInput.addEventListener('change', () => {
    if (titleInput.validity.tooShort) {
      setErrorBorder(titleInput);
      titleInput.setCustomValidity(`?????????????????? ???????????? ???????????????? ?????????????? ???? ${titleInput.minLength} ????????????????`);
    }
    if (titleInput.validity.tooLong) {
      setErrorBorder(titleInput);
      titleInput.setCustomValidity(`?????????????????? ???? ???????????? ?????????????????? ${titleInput.maxlength} ????????????????`);
    }
    if (titleInput.validity.valueMissing) {
      setErrorBorder(titleInput);
      titleInput.setCustomValidity('???????? ???? ???????????? ???????? ????????????');
    }
    titleInput.setCustomValidity('');
  });

  priceInput.addEventListener('change', () => {
    if (priceInput.validity.rangeUnderflow) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity(`?????? ?????????????? ?????????? ???????? ???? ?????????? ???????? ???????????? ${priceInput.min}`);
    }
    if (priceInput.validity.rangeOverflow) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity(`???????? ???? ?????????? ???????? ???????? ${priceInput.max}`);
    }
    if (priceInput.validity.valueMissing) {
      setErrorBorder(priceInput);
      priceInput.setCustomValidity('???????? ???? ???????????? ???????? ????????????');
    }
    priceInput.setCustomValidity('');

  });

  fileChooserAvatar.addEventListener('change', () => {
    const file = fileChooserAvatar.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));
    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        previewAvatar.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  fileChooserHousing.addEventListener('change', () => {
    const file = fileChooserHousing.files[0];
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

    if (matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        previewHousing.src = reader.result;
      });
      reader.readAsDataURL(file);

    }
  });
};

const setUserFormSubmitHandler = () => {
  addForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => createSuccessAlertClickHandler(),
      () => createErrorAlertClickHandler(),
      new FormData(evt.target),
    );
  });
};

const formReset = () => {
  addForm.reset();
  mapFilter.reset();
  validateRoomsAndGuests();
  priceInput.placeholder = PRICE_FLAT;
  priceInput.min = PRICE_FLAT;
  previewAvatar.src = DEFAULT_AVATAR_SRC;
  previewHousing.src = DEFAULT_HOUSING_PLACE_SRC;
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

const enableFormAdsClickHandler = () => {
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
  checkValidationChangeHandler();
  validateRoomsAndGuests();
  setUserFormSubmitHandler();
};

const enableFiltersAds = () => {
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

export {
  enableFormAdsClickHandler,
  disableForm,
  enableFiltersAds,
  formReset
};
