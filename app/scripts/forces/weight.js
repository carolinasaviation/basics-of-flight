define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
	'./weightInteraction'
], function(Section, draw, helper, paper, WeightInteraction) {
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

		var btn = this.card.querySelector('.btn-interaction');
		var svg = document.getElementById('cessna-elevation').cloneNode(true)
		svg.id = 'btn-cessna-elevation';
		btn.appendChild(svg);

		btn = WeightInteraction.quiz.querySelector('.btn-interaction');
		svg = svg.cloneNode(true);
		svg.id = 'btn-cessna-elevation-close';
		btn.appendChild(svg);
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

	Weight.prototype.handleTap = function(e) {
		var matches = helper.toArray(this.card.querySelectorAll('[data-action]'))
			.filter(function(el) {
				return el.contains(e.target);
			}), action;

		if (!matches[0]) return false;
		action = matches[0].getAttribute('data-action');

		if (this[action])
			this[action]();
	}

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);
		WeightInteraction.setup(this.canvas);

		this.page().element.appendChild(WeightInteraction.quiz);
		this.card.classList.remove('slideUpAndFadeIn');
		this.card.classList.add('slideDownAndFadeOut');

		WeightInteraction.quiz.classList.remove('slideDownAndFadeOut');
		WeightInteraction.quiz.classList.add('slideUpAndFadeIn');

		helper.createPaperScript(this, this.canvas, WeightInteraction.paperScript)
		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	Weight.prototype.stopInteraction = function() {
		Section.prototype.stopInteraction.call(this);
		helper.cleanupPaperScript(this)
		WeightInteraction.quiz.classList.remove('slideUpAndFadeIn');
		WeightInteraction.quiz.classList.add('slideDownAndFadeOut');

		this.card.classList.remove('slideDownAndFadeOut');
		this.card.classList.add('slideUpAndFadeIn');
	};

	return new Weight();
});
