'use strict';
window.similar = (function () {
  var wizards = [];
  var eyesColor;
  var coatColor;
  var getRank = function (wizard) {
    var r = 0;
    if (wizard.colorCoat === coatColor) {
      r += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      r += 1;
    }
    return r;
  };
  var updateWizards = function () {
    window.render.renderWizardList(wizards.slice().sort(function (a, b) {
      return getRank(b) - getRank(a);
    }));
  };
  var successHandler = function (data) {
    wizards = data;
    updateWizards();
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
  window.wizard.onEyesChange = window.debounce(function (color) {
    eyesColor = color;
    updateWizards();
  });
  window.wizard.onCoatChange = window.debounce(function (color) {
    coatColor = color;
    updateWizards();
  });
  window.backend.load(successHandler, errorHandler);
})();
