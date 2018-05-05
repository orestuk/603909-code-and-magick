'use strict';
window.wizard = (function () {
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var COAT_COLORS = [
    'rgb(146, 100, 161)',
    'rgb(215, 210, 55)',
    'rgb(241, 43, 107)',
    'rgb(101, 137, 164)',
    'rgb(0, 0, 0)',
    'rgb(215, 210, 55)',
    'rgb(56, 159, 117)',
    'rgb(241, 43, 107)'
  ];
  var wizardEyes = document.querySelector('.setup-wizard .wizard-eyes');
  var eyesColorElement = document.querySelector('input[name=eyes-color]');
  var wizardCoat = document.querySelector('.wizard-coat');
  var wizard = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };
  wizardEyes.addEventListener('click', function () {
    var newColor = window.setup.getRandomItem(EYES_COLORS);
    wizardEyes.style.fill = newColor;
    eyesColorElement.value = newColor;
    wizard.onEyesChange(newColor);
  });
  wizardCoat.addEventListener('click', function () {
    var newColor = window.setup.getRandomItem(COAT_COLORS);
    wizardCoat.style.fill = newColor;
    wizard.onCoatChange(newColor);
  });
  return wizard;
})();
