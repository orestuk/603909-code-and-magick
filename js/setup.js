'use strict';

(function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var START_SETUP_POSITION = {
    x: '50%',
    y: '80px'
  };
  var userDialog = document.querySelector('.setup');
  var form = userDialog.querySelector('.setup-wizard-form');
  var similarListElement = document.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var setupUserName = document.querySelector('.setup-user-name');
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var fireball = document.querySelector('.setup-fireball-wrap');
  var eyesColor = document.querySelector('input[name=eyes-color]');
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
  var shuffleArray = function (array) {
    var j;
    var x;
    for (var i = array.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = array[i];
      array[i] = array[j];
      array[j] = x;
    }
    return array;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
    return wizardElement;
  };
  var renderWizardList = function (wizards) {
    wizards = shuffleArray(wizards);
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < 4; i++) {
      fragment.appendChild(renderWizard(wizards[i]));
    }
    similarListElement.appendChild(fragment);
  };
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
  wizardEyes.addEventListener('click', function () {
    var color = getRandomItem(EYES_COLORS);
    wizardEyes.style.fill = color;
    eyesColor.value = color;
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

  form.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(form), function () {
      closePopup();
    }, errorHandler);
    evt.preventDefault();
  });
  window.backend.load(renderWizardList, errorHandler);
  document.querySelector('.setup-similar').classList.remove('hidden');
  window.setup = {
    userDialog: userDialog
  };
})();
