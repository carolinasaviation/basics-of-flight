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
		title: i18n.t.drag,
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
						return scale(p, 0.4, 1.9).toFixed(2);
					},
					format: function() { return ' kN'; }
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
			field.position.y = origin.y + diff * 0.333;
		}

		bindings.granger.element.addEventListener('change', grangerChange, false);

		function onUpdate() {
			particle.moveTowardField(field);
			particle.move();

			if (config.showField) field.draw(ctx);
			var y = (Math.sin(this.t) * 20);

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
