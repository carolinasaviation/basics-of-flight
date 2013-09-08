define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display',
	'../../lib/Tween'
], function(helper, i18n, display, TWEEN) {
	'use strict';
	TWEEN || (TWEEN = window.TWEEN);

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.ailerons,
		min: 0,
		max: 100,
		step: 1,
		bindings: {
			prefix: 'ailerons-interaction',
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

	var spriteSheet = Array.apply(0, Array(31)).map(function(_, i) {
		var img = new Image();
		i -= 15;
		var prefix = i < 0 ? '+' : '';
		var j = Math.abs(i);
		var src = (j < 10) ? ('0' + j) : ('' + j);
		img.classList.add('aileron-animation');
		img.src = 'images/ailerons/aileron-' + prefix + src + '.png';
		return img;
	});

	function interactive() {
		var self = this;
		var el = this._page.element;
		var cur = spriteSheet.length - 1;
		var dir = 1;
		var n = 0;
		var iteration = 0;

		this._page.element.appendChild(spriteSheet[cur]);

		function next() {
			// TODO: handle this in Section.js
			if (!self.isActive) {
				el.removeChild(spriteSheet[n]);
				return;
			}
			iteration++;
			if (iteration % 2 === 0) {
				if (cur === spriteSheet.length - 1) dir = -1;
				if (cur === 0) dir = 1;
				n = cur + (1 * dir);
				el.replaceChild(spriteSheet[n], spriteSheet[cur]);
				cur = n;
			}
			self.raf = requestAnimationFrame(next);
		}

		next();
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});



