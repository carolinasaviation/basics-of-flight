define([
	'../lib/page',
	'../controls/elevators',
	'../controls/flaps',
	'../controls/ailerons',
	'../controls/rudder',
	'../lib/animations',
	'../lib/helpers',
	'../lib/grid'
], function(Page, elevators, flaps, ailerons, rudder, draw, helper, grid) {
	'use strict';

	var image = '<div class="cessna" style="-webkit-transform: translate(0,0)"></div>';
	var cessna = helper.createDomNode(image);
	cessna.appendChild(document.getElementById('cessna-isometric').cloneNode(true));

	function Controls() {
		Page.call(this);

		this.sections = [
			elevators, flaps, ailerons, rudder
		];
	}

	Controls.prototype = Object.create(Page.prototype);

	Controls.prototype.constructor = Controls;

	Controls.prototype.init = function() {
		Page.prototype.init.call(this);
	};

	Controls.prototype.onLoad = function() {
		Page.prototype.onLoad.call(this);

		var element = this.element.querySelector('.cessna');
		draw.createAnimation(element, '3s linear infinite', [
			[0, '-webkit-transform: translate(0,0);'],
			[27, '-webkit-transform: translate(0, -30px);'],
			[50, '-webkit-transform: translate(0,0);'],
			[73, '-webkit-transform: translate(0, 30px);']
		]);
		// temp!
		this.activate();
	};

	Controls.prototype.activate = function() {
		if (this.isActive) return;
		Page.prototype.activate.call(this);
		grid.TWEEN.removeAll();

		this.element.appendChild(cessna);
		var canvas = document.createElement('canvas');
		canvas.width = this.element.clientWidth;
		canvas.height = this.element.clientHeight - this.card.clientHeight;
		var ctx = canvas.getContext('2d');

		this.element.insertBefore(canvas, this.element.firstChild);

		var tween = grid(this, canvas)

		return tween;
	};

	Controls.prototype.deactivate = function() {
		if (!this.isActive) return;
		Page.prototype.deactivate.call(this);

		if (this.raf) cancelAnimationFrame(this.raf);
		this.element.removeChild(this.element.querySelector('canvas'));
	};

	return new Controls();
});

