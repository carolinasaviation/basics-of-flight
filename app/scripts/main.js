require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
        lodash: '../bower_components/lodash/lodash',
        //two: '../bower_components/two/build/two',
        paper: '../bower_components/paper/dist/paper-full',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'lodash', 'paper', 'polyfills'], function (app, $, _, paper) {
	'use strict';
	window.config = config;

	// use app here
	console.log('Running jQuery %s', $.prototype.jquery);
	console.log('Running LoDash %s', _.VERSION);
	console.log('Running Paper.js %s', paper.version);

	// select the first page....sort of
	//document.querySelector('.nav-item').click()
});
