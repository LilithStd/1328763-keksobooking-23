import {
  FormReset
} from './form.js';
const ALERT_SHOW_TIME = 5000;

const successAlertTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const errorAlertTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');
const documentFragmentAlert = document.createDocumentFragment();
const elementBody = document.body;


const successAlert = successAlertTemplate.cloneNode(true);
documentFragmentAlert.appendChild(successAlert);
elementBody.appendChild(documentFragmentAlert);
successAlert.classList.add('visually-hidden');
const errorAlert = errorAlertTemplate.cloneNode(true);
documentFragmentAlert.appendChild(errorAlert);
elementBody.appendChild(documentFragmentAlert);
errorAlert.classList.add('visually-hidden');
const errorButton = errorAlert.querySelector('.error__button');

const hiddenSuccessAlert = (() => {
  successAlert.classList.add('visually-hidden');
});
const hiddenErrorAlert = (() => {
  errorAlert.classList.add('visually-hidden');
});
const isEscEvent = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    hiddenSuccessAlert();
    hiddenErrorAlert();
    document.removeEventListener('keydown', isEscEvent);
  }
};
const createSuccessAlert = () => {
  FormReset();
  successAlert.classList.remove('visually-hidden');
  successAlert.addEventListener('click', hiddenSuccessAlert);
  document.addEventListener('keydown', isEscEvent);
};


const createErrorAlert = () => {
  errorAlert.classList.remove('visually-hidden');
  errorAlert.addEventListener('click', hiddenErrorAlert);
  errorButton.addEventListener('click', hiddenErrorAlert);
  document.addEventListener('keydown', isEscEvent);
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};
export {
  createSuccessAlert,
  showAlert,
  createErrorAlert
};
