require.config({
	paths: {
			app: 'http://localhost:8000',
			jquery: '../../app/bower_components/jquery/jquery',
			lodash: '../../app/bower_components/lodash/lodash',
			paper: '../../app/bower_components/paper/dist/paper-full',
			hammer: '../../app/bower_components/hammerjs/dist/hammer',
			Bind: '../../app/bower_components/bind/bind',
	},
	shim: {
			bootstrap: {
					deps: ['jquery'],
					exports: 'jquery'
			}
	}
});


define([
	'./test',
	'./views/template'
], function() {
  mocha.run();
});

