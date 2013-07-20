define([
	'./_page',
	'../controls/engine',
	'../controls/flaps',
	'../controls/ailerons',
	'../controls/rudder',
	'../lib/animations',
	'../lib/helpers',
	'paper'
], function(Page, engine, flaps, ailerons, rudder, draw, helper, paper) {

	window.state || (window.state = {});
	window.state.CONTROLS = {
		NUMBER_OF_PARTICLES: 30,
		CESSNA_SIN_MULTIPLIER: 40,
		CESSNA_SIN_ADDITIVE: 0.04,
	};

	var image = '<img src="images/cessna-isometric.svg" style="position:relative;z-index:1;-webkit-transform: translate(0,0)">';

	function Controls() {
		Page.call(this);

		this.sections = [
			engine, flaps, ailerons, rudder
		];
	}

	Controls.prototype = Object.create(Page.prototype);

	Controls.prototype.constructor = Controls;

	Controls.prototype.init = function() {
		Page.prototype.init.call(this);
		this.element.appendChild(this.card);
		this.element.appendChild(helper.createDomNode(image));

		var canvas = this.canvas = document.createElement('canvas');
		canvas.setAttribute('data-paper-resize', 'true');
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
		/*
		this.element.appendChild(this.canvas);

		helper.createPaperScript(this, this.canvas, paperScript)

		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	  */
	};

	Controls.prototype.deactivate = function() {
		if (!this.isActive) return;
		Page.prototype.deactivate.call(this);
		//helper.cleanupPaperScript(this);
		//this.element.removeChild(this.canvas);
	};

	return new Controls();
});

