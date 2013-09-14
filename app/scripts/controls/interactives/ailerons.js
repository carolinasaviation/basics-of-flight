define([
	'../../lib/helpers',
	'i18n',
	'../../views/display',
	'../../lib/grid'
], function(helper, i18n, display, grid) {
	'use strict';

	var BLEED = 200;
	var FRAMES = 31;
	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.ailerons,
		min: 0,
		max: FRAMES - 1,
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

	var spriteSheet = Array.apply(0, Array(FRAMES)).map(function(_, i) {
		var img = new Image();
		i -= 15;
		var prefix = i < 0 ? '+' : '';
		var j = Math.abs(i);
		var src = (j < 10) ? ('0' + j) : ('' + j);
		img.classList.add('aileron-animation');
		img.classList.add('interactive--sprite');
		img.classList.add('cessna');
		img.src = 'images/ailerons/aileron-' + prefix + src + '.png';
		return img;
	});

	function interactive(canvas) {
		var self = this;
		var el = this._page.element;
		var cur = spriteSheet.length - 1;
		var dir = 1;
		var n = 0;
		var iteration = 0;

		var tween = grid(this, canvas, {
			from: { x: -BLEED, y: BLEED, t: 0 },
			to: { x: BLEED, y: -BLEED, t: 10 },
			time: 6000,
			onUpdate: function() {}
		});

		this._page.element.insertBefore(spriteSheet[cur], canvas);

		/*
		function next() {
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
	  */

		bindings.granger.element.addEventListener('change', function() {
			if (!self.isActive) {
				el.removeChild(spriteSheet[n]);
				return;
			}
			n = this.value;
			el.replaceChild(spriteSheet[n], spriteSheet[cur]);
			cur = n;
			console.log('Ailerons go to frame', +this.value);
		}, false);

		//next();

		return tween;
	}

	return {
		bindings: bindings,
		interactive: interactive
	}

});



