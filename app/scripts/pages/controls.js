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

		var tween = grid(this, this.canvas)

		return tween;
	};

	return new Controls();
});

