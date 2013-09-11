define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display',
	'Tween'
], function(helper, i18n, display, TWEEN) {
	'use strict';

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.lift,
		min: 0,
		max: 100,
		step: 1,
		bindings: {
			prefix: 'lift-interaction',
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
					title: i18n.t.lift,
					calculate: function(p) {
						return scale(p, 600, 1500);
					},
					format: function() { return ' coeffecient'; }
				},
				{
					title: 'range',
					renderable: false,
					sync: function(prefix, value) {
						if (!bindings) return;
						bindings.data.altitude =
						bindings.data.speed =
						bindings.data.lift = value;
					}
				}
			]
		}
	});

	function interactive() {
		console.log('Lift::interactive');
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});

