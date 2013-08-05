require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        lodash: '../bower_components/lodash/lodash',
        paper: '../bower_components/paper/dist/paper-full',
        hammer: '../bower_components/hammerjs/dist/hammer',
        Bind: '../bower_components/bind/bind',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require([
	'app',
	'jquery',
	'lodash',
	'paper',
	'hammer',
	'Bind',
	'polyfills'
], function (app, $, _, paper, Bind, hammer) {
	'use strict';
	window.config = config;

	// use app here
	console.groupCollapsed('Dependencies');
	console.log('Running jQuery %s', $.prototype.jquery);
	console.log('Running LoDash %s', _.VERSION);
	console.log('Running Paper.js %s', paper.version);
	console.log('Running Hammerjs %s', (hammer || Hammer).VERSION);
	console.log('Running Bind %s', '0.0.1');
	console.groupEnd();

	window.state = window.state || {}
	window.state.rand = function rand(min, max, isFloat) {
		var rand = Math.random();
		return Math.floor(max * rand) + min;
	};

	window.paper = paper;
	paper.install(window);
	app.init();

	// select the first page....sort of
	//document.querySelector('.nav-item').click()
});
