/* eslint-disable */
var bowser = require('bowser')

if (bowser.msie || bowser.android) {
  require('core-js/es6')
  require('flexibility')
}
/* eslint-enable */