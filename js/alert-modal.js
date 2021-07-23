import {
  formReset
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

const hideSuccessAlertClickHandler = (() => {
  successAlert.classList.add('visually-hidden');
});

const hideErrorAlertClickHandler = (() => {
  errorAlert.classList.add('visually-hidden');
});

const isEscEventHandler = (evt) => {
  if (evt.key === 'Escape' || evt.key === 'Esc') {
    hideSuccessAlertClickHandler();
    hideErrorAlertClickHandler();
    document.removeEventListener('keydown', isEscEventHandler);
  }
};
const createSuccessAlert = () => {
  formReset();
  successAlert.classList.remove('visually-hidden');
  successAlert.addEventListener('click', hideSuccessAlertClickHandler);
  document.addEventListener('keydown', isEscEventHandler);
};


const createErrorAlert = () => {
  errorAlert.classList.remove('visually-hidden');
  errorAlert.addEventListener('click', hideErrorAlertClickHandler);
  errorButton.addEventListener('click', hideErrorAlertClickHandler);
  document.addEventListener('keydown', isEscEventHandler);
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
