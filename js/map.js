import {disableForm, enableForm,checkValidation,validationGuestAndRooms,setUserFormSubmit} from './form.js';
import {createCustomPopup} from './cards.js';
import {getData} from './fetch.js';
import {showAlert} from './alert-modal.js';

const START_COORDINATES_LAT = 35.6895;
const START_COORDINATES_LNG = 139.69171;
const NUMBER_AFTER_DOT_ADRESS = 5;
const RESET_BUTTONS_MAP = document.querySelector('.ad-form__reset');
const adressLanLng = document.querySelector('#address');
const addForm = document.querySelector('.ad-form');
const priceField = addForm.querySelector('#price');

disableForm();
checkValidation();
validationGuestAndRooms();
setUserFormSubmit();
const mapTokio = L.map('map-canvas')
  .on('load', enableForm)
  .setView({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  }, 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapTokio);
const markerGroup = L.layerGroup().addTo(mapTokio);
const customPinIcons = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerPin = L.marker(
  {
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  },
  {
    draggable: true,
    icon: customPinIcons,
  },
);
const COUNT_CARDS = 10;
markerPin.addTo(mapTokio);
getData((arrayCards)  => {(arrayCards.slice(0, COUNT_CARDS)).forEach((point) => {
  const {lat, lng} = point.location;
  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(point),
    );
});
},() => showAlert('Ошибка загрузки данных.Попробуйте позже.'));
adressLanLng.value = `${START_COORDINATES_LAT} ${START_COORDINATES_LNG}`;
markerPin.on('move', (evt) => {
  adressLanLng.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_AFTER_DOT_ADRESS)} ${evt.target.getLatLng().lng.toFixed(NUMBER_AFTER_DOT_ADRESS)}`;
});
const RESET_MAP = () =>  {
  markerPin.setLatLng({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  });
  mapTokio.setView({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  }, 10);
};
const formReset = ()  =>  {
  addForm.reset();
  priceField.placeholder = '1000';
  priceField.min = '1000';
  RESET_MAP();
};
RESET_BUTTONS_MAP.addEventListener('click', (evt) => {
  evt.preventDefault();
  formReset();
});
export{formReset};
