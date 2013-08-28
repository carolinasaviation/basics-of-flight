define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./weightInteraction'
], function(Section, draw, helper, WeightInteraction) {
	'use strict';

	var ARROWS_SELECTOR = '.weight-arrows';
	var image = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow arrow-s"></div><div class="arrow arrow-s"></div><div class="arrow arrow-s"></div></div>';

	function Weight() {
		Section.call(this);
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.init = function() {
		Section.prototype.init.call(this);
	};

	Weight.prototype.activate = function() {
		if (this.isActive) return;
		Section.prototype.activate.call(this);

		var cessna = this._page.element.querySelector('.cessna');
		var arrows = helper.createDomNode(image);
		cessna.appendChild(arrows);

		draw.createAnimation(arrows, '1s linear infinite', [
			[0, '-webkit-transform: translate(0,0) skewX(13deg);'],
			[27, '-webkit-transform: translate(0, -10px) skewX(13deg);'],
			[50, '-webkit-transform: translate(0,0) skewX(13deg);'],
			[73, '-webkit-transform: translate(3px, 10px) skewX(15deg);']
		]);
	};

	Weight.prototype.deactivate = function() {
		if (!this.isActive) return;
		Section.prototype.deactivate.call(this);

		var cessna = this._page.element.querySelector('.cessna');
		var arrows = cessna.querySelector(ARROWS_SELECTOR);
		cessna.removeChild(arrows);

		this.stopInteraction();
	};

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);
		WeightInteraction.setup(this.canvas);

		this._page.rotateIn(WeightInteraction.quiz, 'south');

		helper.createPaperScript(this, this.canvas, WeightInteraction.paperScript)
		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	Weight.prototype.stopInteraction = function() {
		Section.prototype.stopInteraction.call(this);
		helper.cleanupPaperScript(this)
		if (this.isActive)
			this._page.rotateIn(this.card, 'north');
	};

	return new Weight();
});
