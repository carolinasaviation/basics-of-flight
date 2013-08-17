define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';

	var spriteSheet = Array.apply(0, Array(16)).map(function(_, i) {
		var img = new Image();
		var src = (i < 10) ? ('0' + i) : ('' + i);
		img.src = 'images/elevators/' + src + '.png';
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

		var el = this._page.element;
		var cur = spriteSheet.length - 1;
		var dir = 1
		var n = 0;
		this._page.element.appendChild(spriteSheet[cur]);
		var iteration = 0;
		function next() {
			iteration++;
			if (iteration % 7 === 0) {
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

		/*
		var cessna = this._page.element.querySelector('.cessna');
		var arrows = cessna.querySelector(ARROWS_SELECTOR);
		cessna.removeChild(arrows);
	  */

		this.stopInteraction();
	};

	return new Ailerons();
});

