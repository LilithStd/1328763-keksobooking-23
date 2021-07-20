import {
  showAlert
} from './alert-modal.js';
const getData = (onSuccess, onFail) => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        onFail(showAlert('Ошибка загрузки данных.Попробуйте позже.'));
      }
    })
    .then((arrayCards) => {
      onSuccess(arrayCards);
    })
    .catch(() => {
      onFail(showAlert('Ошибка загрузки данных.Попробуйте позже.'));
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    'https://23.javascript.pages.academy/keksobooking', {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(() => {
      onFail();
    });
};

export {
  getData,
  sendData
};

