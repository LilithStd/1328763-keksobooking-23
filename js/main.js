import {
  initMap
} from './map.js';
import {
  disableForm,
  enableFiltersAds,
  enableFormAdsClickHandler
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
  enableFormAdsClickHandler();
  getData((arrayCards) => {
    renderPoints(arrayCards);
    setFilterFormChangeHandler(arrayCards);
    enableFiltersAds();
  });
});
