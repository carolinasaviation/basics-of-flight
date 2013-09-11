define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display',
	'../../lib/convert',
	'../../lib/Tween'
], function(helper, i18n, display, convert, TWEEN) {
	'use strict';

	var BLEED = 200;
	var TIME = 6000;
	var OFFSET = 20;
	var STROKE_WIDTH = 2;
	var STROKE_COLOR = '#666';
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
					format: function() { return ' ft' }
				},
				{
					title: i18n.t.speed,
					calculate: function(p) { return 3200; },
					format: function() { return ' m/hr' }
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
		var self = this, i;
		var ctx = canvas.getContext('2d');
		var img = document.getElementById('cessna-isometric').cloneNode(true);
		img.id = 'weight-cessna-isometric';
		img.style.position = 'absolute';
		img.style.left = '8%';
		canvas.parentNode.appendChild(img);

		var end = ((canvas.width > canvas.height) ? canvas.width : canvas.height) + BLEED * 2;
		var z = 0;
		var t = new TWEEN.Tween({ x: -BLEED, y: BLEED, t: 0 })
			.to({ x: BLEED, y: -BLEED, t: 10 }, TIME)
			.easing(TWEEN.Easing.Linear.None)
			.repeat(Infinity)
			.onUpdate(function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.save();

				ctx.lineWidth = STROKE_WIDTH;
				ctx.strokeStyle = STROKE_COLOR;

				// x lines, moving in y axis
				ctx.beginPath();
				for (i = -BLEED; i <= end; i += OFFSET) {
					ctx.moveTo(0, i + this.y);
					ctx.lineTo(canvas.width, i + this.y);

					ctx.moveTo(i + this.x, 0);
					ctx.lineTo(i + this.x, canvas.height);
				}
				ctx.closePath();
				ctx.stroke();

				ctx.restore();

				var x = 0;
				var y = (Math.sin(this.t) * 14);
				img.style.webkitTransform = 'translate(' + x + 'px,' + y + 'px)';
			})
			.start();

		(function animate() {
			self.raf = requestAnimationFrame(animate);
			TWEEN.update();
		})();

		return t;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});
