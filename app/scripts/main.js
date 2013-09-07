require.config({
	paths: {
		lodash: '../bower_components/lodash/lodash',
		hammer: '../bower_components/hammerjs/dist/hammer',
		Bind: '../bower_components/bind/bind',
		setImmediate: '../bower_components/setImmediate/setImmediate',
		granger: '../bower_components/granger/dist/granger'
	},
	shim: {
		granger: {
			deps: [],
			exports: 'Granger'
		}
	}
});

require([
	'app',
	'lodash',
	'hammer',
	'Bind',
	'setImmediate',
	'polyfills'
], function (app, _, Bind, setImmediate, hammer) {
	'use strict';
	window.config = config;

	// use app here
	console.groupCollapsed('Dependencies');
	console.log('Running LoDash %s', _.VERSION);
	console.log('Running Hammerjs %s', (hammer || Hammer).VERSION);
	console.log('Running Bind %s', '0.0.1');
	console.groupEnd();

	window.state = window.state || {}
	window.state.rand = function rand(min, max, isFloat) {
		var rand = Math.random();
		return Math.floor(max * rand) + min;
	};

	app.init();

	// select the first page....sort of
	//document.querySelector('.nav-item').click()
});
