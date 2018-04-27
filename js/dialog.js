'use strict';
(function () {
  var setupUserPic = document.querySelector('.setup-user-pic');
  setupUserPic.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startPos = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var shift = {
        x: startPos.x - moveEvt.clientX,
        y: startPos.y - moveEvt.clientY
      };
      startPos = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };
      window.userDialog.style.top = (window.userDialog.offsetTop - shift.y) + 'px';
      window.userDialog.style.left = (window.userDialog.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
