const jsdom = require('jsdom').jsdom;

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navigator = window.navigator;

global.window.localStorage = require('sessionstorage')