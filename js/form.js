import {sendData} from './fetch.js';
import {createErrorAlert, createSuccessAlert} from './alert-modal.js';
const addForm = document.querySelectorAll('.ad-form');
const mapFilters = document.querySelectorAll('.map__filters');
const mapOptions = document.querySelectorAll('.map__filter');
const mapOptionsIcons = document.querySelectorAll('.map__features');
const mapFeatures = document.querySelectorAll('.map__checkbox');
const formElement = document.querySelectorAll('.ad-form__element');
const formHeader = document.querySelectorAll('.ad-form-header');
const disableForm = function () {
  addForm.forEach((item) => {
    item.classList.add('ad-form--disabled');
  });
  mapFilters.forEach((item) => {
    item.classList.add('map__filters--disabled');
  });
  mapOptions.forEach((item) => {
    item.classList.add('disabled');
  });
  mapOptionsIcons.forEach((item) => {
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
const enableForm = function () {
  addForm.forEach((item) => {
    item.classList.remove('ad-form--disabled');
  });
  mapFilters.forEach((item) => {
    item.classList.remove('map__filters--disabled');
  });
  mapOptions.forEach((item) => {
    item.classList.remove('disabled');
  });
  mapOptionsIcons.forEach((item) => {
    item.classList.remove('disabled');
  });
  formElement.forEach((item) => {
    item.classList.remove('disabled');
  });
  formHeader.forEach((item) => {
    item.classList.remove('disabled');
  });
  mapFeatures.forEach((item) => {
    item.classList.remove('disabled');
  });
};
const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const valueRooms = document.querySelector('#room_number');
const valueGuests = document.querySelector('#capacity');
const typePlace = document.querySelector('#type');
const checkIn = document.querySelector('#timein');
const checkOut = document.querySelector('#timeout');

const validationGuestAndRooms = function  ()  {
  const numberValueRooms = Number(valueRooms.value);
  const numberValueGuets = Number(valueGuests.value);
  if  (numberValueRooms === 100 && numberValueGuets !== 0)  {
    valueRooms.setCustomValidity('Выбранное Вами помещение не повзоляет разместить гостей');
  }else if(numberValueGuets === 0 && numberValueRooms !== 100)  {
    valueGuests.setCustomValidity('Выбранный Вами вариант не повзоляет разместить гостей в стандартных номерах, выберите другой вариант');
  }else if(numberValueRooms  < numberValueGuets)  {
    valueRooms.setCustomValidity('Превышено количество гостей для выбранного количества комнат');
  }else{valueRooms.setCustomValidity('');
    valueGuests.setCustomValidity('');}
};
const checkValidation = function () {
  typePlace.addEventListener('change', () =>  {
    switch  (typePlace.value)  {
      case 'palace':
        priceInput.placeholder = '10 000';
        priceInput.min = '10000';
        break;
      case 'flat':
        priceInput.placeholder = '1 000';
        priceInput.min = '1000';
        break;
      case 'bungalow':
        priceInput.placeholder = '0';
        priceInput.min = '0';
        break;
      case 'hotel':
        priceInput.placeholder = '3 000';
        priceInput.min = '3000';
        break;
      case 'house':
        priceInput.placeholder = '5 000';
        priceInput.min = '5000';
        break;
      default:
        typePlace.setCustomValidity('Совпадения по имеющимся позициям не найдены');
    }
  });
  checkIn.addEventListener('change', () =>  {
    switch  (checkIn.value)  {
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
  checkOut.addEventListener('change', () =>  {
    switch  (checkOut.value)  {
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
  valueRooms.addEventListener('change', validationGuestAndRooms);
  valueGuests.addEventListener('change', validationGuestAndRooms);

  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort)  {
      titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${titleInput.minLength} символов`);
    }else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity(`Заголовок не должен превышать ${titleInput.maxlength} символов`);
    }else if(titleInput.validity.valueMissing)  {
      titleInput.setCustomValidity('Поле не должно быть пустым');
    }else{titleInput.setCustomValidity('');}
  });
  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.rangeUnderflow)  {
      priceInput.setCustomValidity(`Для данного места цена не может быть меньше ${priceInput.min}`);
    }else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity(`Цена не может быть выше ${priceInput.max}`);
    }else if (priceInput.validity.valueMissing)  {
      priceInput.setCustomValidity('Поле не должно быть пустым');
    }else {priceInput.setCustomValidity('');}
  });
};
const formSubmit = document.querySelector('.ad-form');
const setUserFormSubmit = () =>  {
  formSubmit.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => createSuccessAlert(),
      () => createErrorAlert(),
      new FormData(evt.target),
    );
  });
};
export {disableForm,enableForm,checkValidation,validationGuestAndRooms,setUserFormSubmit};
