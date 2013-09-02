define([
	'../lib/page',
	'../forces/weight',
	'../forces/lift',
	'../forces/drag',
	'../forces/thrust',
	'../lib/animations',
	'../lib/helpers',
	'paper'
], function(Page, weight, lift, drag, thrust, draw, helper, paper) {
	'use strict';

	window.state || (window.state = {});
	window.state.FORCES = {
		NUMBER_OF_PARTICLES: 30,
		CESSNA_SIN_MULTIPLIER: 40,
		CESSNA_SIN_ADDITIVE: 0.04,
	};

	var ARROWS_SELECTOR = '.forces-arrows';
	var arrows = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow-n"><div class="arrow"></div></div><div class="arrow-s"><div class="arrow"></div></div><div class="arrow-w"><div class="arrow"></div></div><div class="arrow-e"><div class="arrow"></div></div></div>';
	var image = '<div class="cessna" style="position:absolute;z-index:1;-webkit-transform: translate(0,0)"><img src="images/cessna-isometric.svg"></div>';

	function Forces() {
		Page.call(this, [
			weight,
			lift,
			drag,
			thrust
		]);
	}

	Forces.prototype = Object.create(Page.prototype);

	Forces.prototype.constructor = Forces;
	Forces.prototype.init = function() {
		Page.prototype.init.call(this);
		this.element.appendChild(helper.createDomNode(image));

		var canvas = this.canvas = document.createElement('canvas');
		canvas.setAttribute('data-paper-resize', 'true');
		canvas.style.position = 'absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;
	};

	Forces.prototype.onLoad = function() {
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

	Forces.prototype.activate = function() {
		if (this.isActive) return;
		Page.prototype.activate.call(this);

		this.element.querySelector('.cessna').appendChild(helper.createDomNode(arrows));

		this.element.appendChild(this.canvas);

		helper.createPaperScript(this, this.canvas, paperScript)

		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	Forces.prototype.deactivate = function() {
		if (!this.isActive) return;
		Page.prototype.deactivate.call(this);

		var arrows = this.element.querySelector(ARROWS_SELECTOR);

		this.element.querySelector('.cessna').removeChild(arrows);

		helper.cleanupPaperScript(this);
		this.element.removeChild(this.canvas);
	};


	function paperScript() {
		var num = state.FORCES.NUMBER_OF_PARTICLES;
		var w = view.viewSize.width;
		var h = view.viewSize.height;
		var white = new Color(255, 255, 255);

		circles = new Array(num);
		while (num--)
			circles[num] = new Path.Circle({
					center: [state.rand(-10, config.width), state.rand(-10, config.height)],
					radius: state.rand(3, 6),
					fillColor: white,
					// opacity greatly reduces frame rate on tablets
					// strokeColor: new Color(255,255,255,0.3), strokeWidth: 5
				});

		function onFrame(event) {
			if (config.fps) config.fps(event.delta);

			circles.forEach(function(c, i) {
				if (c.position.x > w) c.position.x = -10;
				if (c.position.y < 0) c.position.y = h + 10;
				c.position.x += state.rand(2, 4);
				c.position.y -= state.rand(1, 3);
			});
		}

		function onResize() {
			w = view.viewSize.width;
			h = view.viewSize.height;
		}
	}

	return new Forces();
});


