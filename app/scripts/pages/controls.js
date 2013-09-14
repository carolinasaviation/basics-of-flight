define([
	'../lib/page',
	'../controls/elevators',
	'../controls/flaps',
	'../controls/ailerons',
	'../controls/rudder',
	'../lib/animations',
	'../lib/helpers'
], function(Page, elevators, flaps, ailerons, rudder, draw, helper) {
	'use strict';

	var image = '<div class="cessna" style="position:absolute;z-index:1;-webkit-transform: translate(0,0)"><img src="images/cessna-isometric.svg"></div>';

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
		this.element.appendChild(this.card);
		this.element.appendChild(helper.createDomNode(image));

		var canvas = this.canvas = document.createElement('canvas');
		canvas.style.position = 'absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;
	};

	Controls.prototype.onLoad = function() {
		Page.prototype.onLoad.call(this);

		var element = this.element.querySelector('img');
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
	};

	Controls.prototype.deactivate = function() {
		if (!this.isActive) return;
		Page.prototype.deactivate.call(this);
	};

	return new Controls();
});

