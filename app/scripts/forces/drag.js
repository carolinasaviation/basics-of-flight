define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./dragInteraction'
], function(Section, draw, helper, DragInteraction) {
	'use strict';

	var ARROWS_SELECTOR = '.drag-arrows';
	var image = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow arrow-e"></div><div class="arrow arrow-e"></div><div class="arrow arrow-e"></div></div>';

	function Drag() {
		Section.call(this);
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	Drag.prototype.init = function() {
		Section.prototype.init.call(this);
	};

	Drag.prototype.activate = function() {
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

	Drag.prototype.deactivate = function() {
		if (!this.isActive) return;
		Section.prototype.deactivate.call(this);

		var cessna = this._page.element.querySelector('.cessna');
		var arrows = cessna.querySelector(ARROWS_SELECTOR);
		cessna.removeChild(arrows);

		this.stopInteraction();
	};

	Drag.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);
		DragInteraction.setup(this.canvas);

		this._page.rotateIn(DragInteraction.quiz, 'south');

		helper.createPaperScript(this, this.canvas, DragInteraction.paperScript)
		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	Drag.prototype.stopInteraction = function() {
		Section.prototype.stopInteraction.call(this);
		helper.cleanupPaperScript(this)
		if (this.isActive)
			this._page.rotateIn(this.card, 'north');
	};

	return new Drag();
});
