import {
  initMap
} from './map.js';
import {
  disableForm,
  enableFiltersAds,
  enableFormAds
} from './form.js';
import {
  getData
} from './fetch.js';
import {
  renderPoints
} from './map.js';
import {
  setFilterFormChangeHandler
} from './filters.js';

disableForm();
initMap(() => {
  enableFormAds();
  getData((arrayCards) => {
    renderPoints(arrayCards);
    setFilterFormChangeHandler(arrayCards);
    enableFiltersAds();
  });
});
