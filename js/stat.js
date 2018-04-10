'use strict';

// Cloud settings
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_SHADOW_SIZE = 10;
var CLOUD_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var CLOUD_BACKGROUND_COLOR = '#fff';
// Text settings
var TEXT_STYLE = 'PT Mono 16px serif';
var TEXT_COLOR = '#000';
var TEXT_LINE_HEIGHT = 20;
// Histogram settings
var HISTOGRAM_HEIGHT = 150;
var CLOUD_CONTENT_X = 20;
var CLOUD_CONTENT_Y = 18;

var COL_WIDTH = 40;
var COL_GAP = 50;
var COL_COLOR = 'rgba(0, 0, 255, ';
var MY_COL_COLOR = 'rgba(255, 0, 0, 1)';
var MY_NAME = 'Вы';

var drawCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var getMaxTimes = function (times) {
  var maxHeight = times[0];
  for (var i = 1; i < times.length; i++) {
    if (times[i] > maxHeight) {
      maxHeight = times[i];
    }
  }
  return maxHeight;
};

window.renderStatistics = function (ctx, names, times) {
  var histX = CLOUD_X + CLOUD_CONTENT_X + 20;
  var histY = CLOUD_Y + CLOUD_CONTENT_Y + TEXT_LINE_HEIGHT * 2;
  var maxHeight;
  // Draw Cloud
  drawCloud(ctx, CLOUD_X + CLOUD_SHADOW_SIZE, CLOUD_Y + CLOUD_SHADOW_SIZE, CLOUD_SHADOW_COLOR);
  drawCloud(ctx, CLOUD_X, CLOUD_Y, CLOUD_BACKGROUND_COLOR);
  // Draw top text info
  ctx.font = TEXT_STYLE;
  ctx.fillStyle = TEXT_COLOR;
  ctx.textBaseline = 'top';
  ctx.fillText('Ура вы победили!', CLOUD_X + CLOUD_CONTENT_X, CLOUD_Y + CLOUD_CONTENT_Y);
  ctx.fillText('Список результатов:', CLOUD_X + CLOUD_CONTENT_X, CLOUD_Y + CLOUD_CONTENT_Y + TEXT_LINE_HEIGHT);
  // Draw Histogram
  maxHeight = getMaxTimes(times);
  for (var i = 0; i < names.length; i++) {
    var colHeight = (HISTOGRAM_HEIGHT / maxHeight) * times[i];
    var colX = histX + i * (COL_WIDTH + COL_GAP);
    var colColour = MY_COL_COLOR;
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(Math.round(times[i]).toString(), colX, histY + (HISTOGRAM_HEIGHT - colHeight));
    // Draw columns
    if (names[i] !== MY_NAME) {
      colColour = COL_COLOR + Math.random();
    }
    ctx.fillStyle = colColour;
    ctx.fillRect(colX, histY + TEXT_LINE_HEIGHT + (HISTOGRAM_HEIGHT - colHeight), COL_WIDTH, colHeight);
    // Draw players names
    ctx.fillStyle = TEXT_COLOR;
    ctx.fillText(names[i], colX, histY + TEXT_LINE_HEIGHT + 5 + HISTOGRAM_HEIGHT);
  }
};
