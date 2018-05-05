'use strict';

(function () {
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var START_SETUP_POSITION = {
    x: '50%',
    y: '80px'
  };
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var fireballColor = document.querySelector('input[name=fireball-color]');
  var shopElement = document.querySelector('.setup-artifacts-shop');
  var draggedItem = null;
  var artifactsElement = document.querySelector('.setup-artifacts');
  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };
  var openPopup = function () {
    userDialog.style.left = START_SETUP_POSITION.x;
    userDialog.style.top = START_SETUP_POSITION.y;
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };
  var closePopup = function () {
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };
  var getRandomItem = function (array) {
    return array[Math.floor(Math.random() * array.length)];
  };
  setupOpen.addEventListener('click', openPopup);
  setupOpen.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup();
    }
  });
  setupClose.addEventListener('click', closePopup);
  setupClose.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup();
    }
  });
  setupUserName.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      evt.stopPropagation();
    }
  });
  fireball.addEventListener('click', function () {
    var color = getRandomItem(FIREBALL_COLORS);
    fireball.style.backgroundColor = getRandomItem(FIREBALL_COLORS);
    fireballColor.value = color;
  });
  shopElement.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
    evt.dataTransfer.dropEffect = 'copy';
    artifactsElement.style.outline = '2px dashed red';
  });
  shopElement.addEventListener('dragend', function () {
    artifactsElement.style.outline = '';
  });
  artifactsElement.addEventListener('dragover', function (evt) {
    evt.preventDefault();
    return false;
  });
  artifactsElement.addEventListener('dragenter', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.querySelector('img') === null) {
      evt.target.style.backgroundColor = 'yellow';
    }
    evt.preventDefault();
  });
  artifactsElement.addEventListener('dragleave', function (evt) {
    evt.target.style.backgroundColor = '';
    evt.preventDefault();
  });
  artifactsElement.addEventListener('drop', function (evt) {
    evt.target.style.backgroundColor = '';
    artifactsElement.style.outline = '';
    if (evt.target.tagName.toLowerCase() === 'div' && evt.target.querySelector('img') === null) {
      evt.target.appendChild(draggedItem.cloneNode());
    }
    evt.preventDefault();
  });
  var errorHandler = function (erMessage) {
    var err = document.createElement('div');
    err.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    err.style.position = 'absolute';
    err.style.left = '0px';
    err.style.right = '0px';
    err.style.fontSize = '30px';
    err.textContent = erMessage;
    document.body.insertAdjacentElement('afterbegin', err);
  };
  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      closePopup();
    }, errorHandler);
    evt.preventDefault();
  });
  document.querySelector('.setup-similar').classList.remove('hidden');
  window.setup = {
    userDialog: userDialog,
    getRandomItem: getRandomItem
  };
})();
