require.config({
	paths: {
		lodash: '../bower_components/lodash/lodash',
		hammer: '../bower_components/hammerjs/dist/hammer',
		Bind: '../bower_components/bind/bind',
		setImmediate: '../bower_components/setImmediate/setImmediate',
		granger: '../bower_components/granger/dist/granger',
		i18n: './i18n/en',
		config: './config'
	},
	shim: {
		'granger': {
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
	'./lib/Tween',
	'polyfills'
], function (app, _, hammer, Bind, setImmediate, TWEEN) {
	'use strict';

	// use app here
	console.groupCollapsed('Dependencies');
	console.log('Running LoDash %s', _.VERSION);
	console.log('Running Hammerjs %s', (hammer || window.Hammer).VERSION);
	console.log('Running Bind %s', '0.0.1');
	console.log('Running TWEEN %s', TWEEN.REVISION);
	console.groupEnd();

	app.init();
});

