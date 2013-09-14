define([
	'../../lib/helpers',
	'i18n',
	'../../views/display',
	'../../lib/convert',
	'../../lib/things',
	'../../lib/grid'
], function(helper, i18n, display, convert, __, grid) {
	'use strict';

	var BLEED = 200;
	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.weight,
		min: 0,
		max: 100,
		step: 1,
		bindings: {
			prefix: 'weight-interaction',
			options: [
				{
					title: i18n.t.altitude,
					calculate: function(p) {
						return scale(p, 5000, 10000);
					},
					format: function() { return ' ft'; }
				},
				{
					title: i18n.t.speed,
					calculate: function(p) { return 3200; },
					format: function() { return ' m/hr'; }
				},
				{
					title: i18n.t.weight,
					calculate: function(p) {
						return scale(p, 600, 1500);
					},
					format: function() { return ' lbs'; }
				},
				{
					title: 'range',
					renderable: false,
					sync: function(prefix, value) {
						if (!bindings) return;
						bindings.data.altitude =
						bindings.data.speed =
						bindings.data.weight = value;
					}
				}
			]
		}
	});

	function interactive(canvas) {
		var self = this;
		var ctx = canvas.getContext('2d');
		var img = document.getElementById('cessna-isometric').cloneNode(true);

		img.id = 'weight-cessna-isometric';
		img.classList.add('interactive--image');
		img.style.position = 'absolute';
		img.style.left = '15%';
		img.style.width = '60%';
		canvas.parentNode.appendChild(img);

		var origin = new __.Vector(canvas.width / 2, canvas.height / 2)
		var field = new __.Field(new __.Vector(canvas.width / 2 - 50, canvas.height / 2 - 50), 100);
		var particle = new __.Particle(origin.clone());
		var value = +bindings.granger.element.value;

		bindings.granger.element.addEventListener('change', function(e) {
			var diff = (+this.value - value) * 4;
			field.position.x = origin.x + diff;
			field.position.y = origin.y + diff;
		}, false);

		function onUpdate() {
			particle.moveToField(field);
			particle.move();

			field.draw(ctx);

			var y = 0;
			//var y = (Math.sin(this.t) * 14);
			var transform = 'translate(' + (particle.position.x - img.clientWidth / 2) + 'px,' + (particle.position.y + y - img.clientHeight / 2) + 'px)';
			img.style.webkitTransform = transform;
		}

		var tween = grid(this, canvas);

		return tween;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});
