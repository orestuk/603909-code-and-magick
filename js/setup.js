'use strict';

var FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var ENTER_KEYCODE = 13;
var ESC_KEYCODE = 27;

var userDialog = document.querySelector('.setup');
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var setupUserName = document.querySelector('.setup-user-name');
var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
var fireball = document.querySelector('.setup-fireball-wrap');
var eyesColor = document.querySelector('input[name=eyes-color]');
var fireballColor = document.querySelector('input[name=fireball-color]');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
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

var generateWizards = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    wizards[wizards.length] = {
      name: getRandomItem(FIRST_NAMES) + ' ' + getRandomItem(LAST_NAMES),
      coatColor: getRandomItem(COAT_COLORS),
      eyesColor: getRandomItem(EYES_COLORS)
    };
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var renderWizardList = function (wizards) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i]));
  }
  similarListElement.appendChild(fragment);
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

// userDialog.classList.remove('hidden');
renderWizardList(generateWizards());
document.querySelector('.setup-similar').classList.remove('hidden');
