
import {
  createCustomPopup
} from './cards.js';
import {
  getData
} from './fetch.js';
import {
  setFilterFormChangeHandler
} from './filters.js';

const START_COORDINATES_LAT = 35.6895;
const START_COORDINATES_LNG = 139.69171;
const NUMBER_AFTER_DOT_ADRESS = 5;
const MAIN_PIN_ICON_SIZE_X = 52;
const MAIN_PIN_ICON_SIZE_Y = 26;
const PLACE_PIN_ICON_X = 40;
const PLACE_PIN_ICON_Y = 20;
const DEFAULT_MAP_ZOOM = 10;
const COUNT_CARDS = 10;
const adressLanLng = document.querySelector('#address');
const markerGroup = L.layerGroup();
let mapTokio;

const customPinIcons = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [MAIN_PIN_ICON_SIZE_X, MAIN_PIN_ICON_SIZE_X],
  iconAnchor: [MAIN_PIN_ICON_SIZE_Y, MAIN_PIN_ICON_SIZE_X],
});

const markerPin = L.marker({
  lat: START_COORDINATES_LAT,
  lng: START_COORDINATES_LNG,
}, {
  draggable: true,
  icon: customPinIcons,
});

const renderPoints = (points) => {
  points.slice(0, COUNT_CARDS).forEach((point) => {
    const {
      lat,
      lng,
    } = point.location;
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [PLACE_PIN_ICON_X, PLACE_PIN_ICON_X],
      iconAnchor: [PLACE_PIN_ICON_Y, PLACE_PIN_ICON_X],
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
        createCustomPopup(point),
      );

  });
};

const clearMap = () => {
  markerGroup.clearLayers();
};

adressLanLng.value = `${START_COORDINATES_LAT}, ${START_COORDINATES_LNG}`;

markerPin.on('move', (evt) => {
  adressLanLng.value = `${evt.target.getLatLng().lat.toFixed(NUMBER_AFTER_DOT_ADRESS)}, ${evt.target.getLatLng().lng.toFixed(NUMBER_AFTER_DOT_ADRESS)}`;
});

const resetMap = () => {
  clearMap();
  markerPin.setLatLng({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  });
  mapTokio.setView({
    lat: START_COORDINATES_LAT,
    lng: START_COORDINATES_LNG,
  }, DEFAULT_MAP_ZOOM);
  getData((arrayCards) => {
    renderPoints(arrayCards);
    setFilterFormChangeHandler(arrayCards);
  });
};

const initMap = (onMapLoad) => {
  mapTokio = L.map('map-canvas')
    .on('load', onMapLoad)
    .setView({
      lat: START_COORDINATES_LAT,
      lng: START_COORDINATES_LNG,
    }, DEFAULT_MAP_ZOOM);
  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(mapTokio);
  markerGroup.addTo(mapTokio);
  markerPin.addTo(mapTokio);
};

export {
  initMap,
  clearMap,
  renderPoints,
  resetMap
};
