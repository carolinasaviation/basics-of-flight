define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display'
], function(helper, i18n, display) {
	'use strict';

	window.state || (window.state = {});

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.thrust,
		min: 0,
		max: 100,
		step: 1,
		state: s,
		bindings: {
			prefix: 'thrust-interaction',
			options: [
				{
					title: i18n.t.altitude,
					calculate: function(p) {
						return scale(p, 5000, 10000);
					},
					format: function() { return ' ft' }
				},
				{
					title: i18n.t.speed,
					calculate: function(p) { return 3200; },
					format: function() { return ' m/hr' }
				},
				{
					title: i18n.t.thrust,
					calculate: function(p) {
						return scale(p, 600, 1500);
					},
					format: function() { return ' coeffecient'; }
				},
				{
					title: 'range',
					renderable: false,
					sync: function(prefix, value) {
						if (!s) return;
						s.data.altitude =
						s.data.speed =
						s.data.thrust = value;
					}
				}
			]
		}
	});

	var s = window.state.THRUST_INTERACTIVE = {
		SPEED: 100,
		xDiff: 0,
		yDiff: 0,
		CESSNA_SIN_MULTIPLIER: 4,
		CESSNA_SIN_ADDITIVE: 0.04,
		isFirstTime: true,
		el: bindings.el,
		data: bindings.data,
		granger: bindings.granger
	};

	function interactive() {
		console.log('interactive');
	}

	return { interactive: interactive }

});

