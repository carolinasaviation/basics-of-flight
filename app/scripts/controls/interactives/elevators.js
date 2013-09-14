define([
	'../../lib/helpers',
	'i18n',
	'../../views/display',
	'../../lib/grid'
], function(helper, i18n, display, grid) {
	'use strict';

	var scale = helper.scale;
	var FRAMES = 31;

	var bindings = display.create({
		title: i18n.t.elevators,
		min: 0,
		max: FRAMES - 1,
		step: 1,
		bindings: {
			prefix: 'elevators-interaction',
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

	var spriteSheet = Array.apply(0, Array(FRAMES)).map(function(_, i) {
		var img = new Image();
		var src = (i < 10) ? ('0' + i) : ('' + i);
		img.classList.add('elevators-animation');
		img.classList.add('interactive--sprite');
		img.classList.add('cessna');
		img.src = 'images/elevators/' + src + '.png';
		return img;
	});

	function interactive(canvas) {
		var self = this;
		var el = this._page.element;
		var tween = grid(this, canvas);

		var cur = +bindings.granger.element.value, n;
		this._page.element.insertBefore(spriteSheet[cur], canvas);

		bindings.granger.element.addEventListener('change', function() {
			if (!self.isActive) {
				el.removeChild(spriteSheet[n]);
				return;
			}
			n = +this.value;
			if (el.contains(spriteSheet[cur]))
				el.replaceChild(spriteSheet[n], spriteSheet[cur]);
			else el.insertBefore(spriteSheet[n], el.firstChild);
			cur = n;
		}, false);

		return tween;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});


