import {
  disableForm,
  enableForm
} from './form.js';
import {
  СreateCustomPopup
} from './cards.js';
import {
  getData
} from './fetch.js';
import {
  filterOffers
} from './filters.js';

const START_COORDINATES_LAT = 35.6895;
const START_COORDINATES_LNG = 139.69171;
const NUMBER_AFTER_DOT_ADRESS = 5;
const adressLanLng = document.querySelector('#address');
disableForm();
const mapTokio = L.map('map-canvas')
  .on('load', enableForm)
  .setView({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  }, 10);
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(mapTokio);
const markerGroup = L.layerGroup().addTo(mapTokio);
const customPinIcons = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});
const markerPin = L.marker({
  lat: START_COORDINATES_LAT,
  lng: START_COORDINATES_LNG,
}, {
  draggable: true,
  icon: customPinIcons,
});
markerPin.addTo(mapTokio);
const COUNT_CARDS = 10;
const renderPoints = (points) => {
  points.slice(0, COUNT_CARDS).forEach((point) => {
    const {
      lat,
      lng,
    } = point.location;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker({
      lat,
      lng,
    }, {
      icon,
    });

    marker
      .addTo(markerGroup)
      .bindPopup(
        СreateCustomPopup(point),
      );

  });
};
const clearMap = () => {
  markerGroup.clearLayers();
};
adressLanLng.value = `${START_COORDINATES_LAT} ${START_COORDINATES_LNG}`;
markerPin.on('move', (evt) => {
  adressLanLng.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_AFTER_DOT_ADRESS)} ${evt.target.getLatLng().lng.toFixed(NUMBER_AFTER_DOT_ADRESS)}`;
});
const ResetMap = () => {
  clearMap();
  markerPin.setLatLng({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  });
  mapTokio.setView({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  }, 10);
  getData((arrayCards) => {
    renderPoints(arrayCards);
    filterOffers(arrayCards);
  });
};
export {
  clearMap,
  renderPoints,
  ResetMap
};
