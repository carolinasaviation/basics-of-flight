define([
	'../../lib/helpers',
	'i18n',
	'../../views/display',
	'../../lib/grid',
	'./common'
], function(helper, i18n, display, grid, common) {
	'use strict';

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.thrust,
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
						if (!bindings) return;
						bindings.data.altitude =
						bindings.data.speed =
						bindings.data.thrust = value;
					}
				}
			]
		}
	});

	var boundGranger = false;
	var grangerChange;

	function interactive(canvas) {
		var ctx = canvas.getContext('2d');
		var img = common.setupCessna(this, canvas);
		var forces = common.setupForces(canvas, bindings.granger);
		var field = forces.field;
		var origin = forces.origin;
		var particle = forces.particle;
		var value = forces.value;

		if (grangerChange) bindings.granger.element.removeEventListener('change', grangerChange);

		grangerChange = function(e) {
			var diff = (+this.value - value) * 4;
			field.position.x = origin.x + diff * 1.5;
			field.position.y = origin.y + diff;
		}

		bindings.granger.element.addEventListener('change', grangerChange, false);

		function onUpdate() {
			particle.moveToField(field);
			particle.move();

			field.draw(ctx);

			var y = 0;
			//var y = (Math.sin(this.t) * 14);
			var transform = 'translate(' + (particle.position.x - img.clientWidth / 2) + 'px,' + (particle.position.y + y - img.clientHeight / 2) + 'px)';
			img.style.webkitTransform = transform;
		}

		var tween = grid(this, canvas, { onUpdate: onUpdate });

		return tween;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});

