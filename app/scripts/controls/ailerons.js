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
		img.src = '/images/elevators/' + src + '.png';
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
		this._page.element.appendChild(spriteSheet[cur]);
		function next() {
			var n = cur + 1;
			if (n === spriteSheet.length) n = 0;
			el.replaceChild(spriteSheet[n], spriteSheet[cur]);
			cur = n;
			setTimeout(next, 300);
		}

		next();

	};

	Ailerons.prototype.deactivate = function() {
		if (!this.isActive) return;
		Section.prototype.deactivate.call(this);

		this._page.element.querySelector('.cessna').style.display = 'block';
		this._page.element.removeChild(spriteSheet[cur]);

		this.stopInteraction();
	};

	return new Ailerons();
});

