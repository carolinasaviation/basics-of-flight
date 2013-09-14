define([
	'../../lib/helpers',
	'i18n',
	'../../views/display',
	'../../lib/grid'
], function(helper, i18n, display, grid) {
	'use strict';

	var BLEED = 200;
	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.drag,
		min: 0,
		max: 100,
		step: 1,
		bindings: {
			prefix: 'drag-interaction',
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
					title: i18n.t.drag,
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
						bindings.data.drag = value;
					}
				}
			]
		}
	});

	function interactive(canvas) {
		var tween = grid(this, canvas, {
			from: { x: -BLEED, y: BLEED, t: 0 },
			to: { x: BLEED, y: -BLEED, t: 10 },
			time: 6000,
			onUpdate: function() {}
		});

		return tween;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});
