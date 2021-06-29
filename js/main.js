import {createArrayCards} from './utils.js';
import './cards.js';
import {disableForm, enableForm,checkValidation,validationGuestAndRooms} from './form.js';
disableForm();
createArrayCards();
checkValidation();
validationGuestAndRooms();
enableForm();
