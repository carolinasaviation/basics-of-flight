require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        lodash: '../bower_components/lodash/lodash',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'lodash', 'polyfills'], function (app, $, _) {
	'use strict';
	window.config = config;

	// use app here
	console.log('Running jQuery %s', $.prototype.jquery);
	console.log('Running LoDash %s', _.VERSION);

	// select the first page....sort of
	//document.querySelector('.nav-item').click()
});
