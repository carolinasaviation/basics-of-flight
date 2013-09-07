define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
], function(Section, draw, helper) {
	'use strict';

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

	function Ailerons() {
		Section.call(this);
	}

	Ailerons.prototype = Object.create(Section.prototype);

	Ailerons.prototype.constructor = Ailerons;

	Ailerons.prototype.activate = function() {
		if (this.isActive) return;
		Section.prototype.activate.call(this);

		this._page.element.querySelector('.cessna').style.display = 'none';

		var self = this;
		var el = this._page.element;
		var cur = spriteSheet.length - 1;
		var dir = 1
		var n = 0;
		this._page.element.appendChild(spriteSheet[cur]);
		var iteration = 0;
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
			requestAnimationFrame(next);
		}

		next();
	};

	Ailerons.prototype.deactivate = function() {
		if (!this.isActive) return;
		Section.prototype.deactivate.call(this);

		this._page.element.querySelector('.cessna').style.display = 'block';
		this.stopInteraction();
	};

	return new Ailerons();
});

