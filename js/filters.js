import {
  clearMap,
  renderPoints
} from './map.js';
import {
  debounce
} from './utils/debounce.js';

const PRICE_VALUE_LOW = 10000;
const PRICE_VALUE_HIGH = 50000;

const mapFilters = document.querySelector('.map__filters');
const checkType = (data) => {
  const typePlace = mapFilters.querySelector('#housing-type').value;
  if (typePlace === 'any') {
    return data.offer.type;
  }
  return data.offer.type === typePlace;
};
const checkPrice = (data) => {
  const pricePlace = mapFilters.querySelector('#housing-price').value;
  switch (pricePlace) {
    case 'any':
      return data.offer.price;
    case 'middle':
      return data.offer.price >= PRICE_VALUE_LOW && data.offer.price <= PRICE_VALUE_HIGH;
    case 'low':
      return data.offer.price < PRICE_VALUE_LOW;
    case 'high':
      return data.offer.price > PRICE_VALUE_HIGH;
    default:
      pricePlace.setCustomValidity('Ошибка данных');
  }
};
const checkRooms = (data) => {
  const roomsPlace = mapFilters.querySelector('#housing-rooms').value;
  if (roomsPlace === 'any') {
    return data.offer.rooms;
  }
  return data.offer.rooms === Number(roomsPlace);
};
const checkGuests = (data) => {
  const guestsPlace = mapFilters.querySelector('#housing-guests').value;
  if (guestsPlace === 'any') {
    return data.offer.guests;
  }
  return data.offer.guests === Number(guestsPlace);
};
const checkFeatures = (data) => {
  const arrayFeaturesChecked = [...mapFilters.querySelectorAll('.map__checkbox:checked')];
  const arrayFeatures = data.offer.features;
  if (!arrayFeatures) {
    return '';
  }
  return arrayFeaturesChecked.every((feature) => arrayFeatures.includes(feature.value));
};
const filterOffers = (offers) => {
  mapFilters.addEventListener('change', debounce(() => {
    clearMap();
    renderPoints(offers.filter((offer) => checkType(offer) && checkPrice(offer) && checkRooms(offer) && checkGuests(offer) && checkFeatures(offer)));
  }));
};

export {
  filterOffers
};
