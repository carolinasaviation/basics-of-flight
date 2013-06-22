require.config({
    paths: {
        jquery: '../bower_components/jquery/jquery',
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        }
    }
});

require(['app', 'jquery', 'polyfills'], function (app, $) {
	'use strict';
	// use app here
	console.log(app);
	console.log('Running jQuery %s', $().jquery);
	
	// select the first page....sort of
	document.querySelector('.nav-item').click()
});
