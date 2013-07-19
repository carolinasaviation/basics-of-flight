define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
	'./weightInteraction'
], function(Section, draw, helper, paper, WeightInteraction) {
	var toArray = function(n) {
		return Array.prototype.slice.call(n, 0);
	};

	var html = [
		'<div class="card">',
			'<h1>', i18n.weight.title, '</h1>',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', i18n.weight.equation, '</div>',
					'<div class="col" style="width: 80%">', i18n.weight.equationDescription, '</div>',
				'</div>',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', '<img src="images/', i18n.weight.historicalFigure, '" />', '</div>',
					'<div class="col" style="width: 80%">', i18n.weight.historicalDescription, '</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-interaction" data-action="startInteraction"></button>',
			'</div>',
		'</div>'
	].join('');
	
	function Weight(html) {
		Section.call(this, html);
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.init = function() {
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
		Section.prototype.activate.call(this);

		var arrows = document.createElement('div');
		arrows.classList.add('arrows');
		arrows.classList.add('weight-index');
		var arrow = document.createElement('div');
		arrow.classList.add('arrow');
		arrows.appendChild(arrow);
		arrows.appendChild(arrow.cloneNode());
		arrows.appendChild(arrow.cloneNode());

		this._page.element.appendChild(arrows);

		draw.createAnimation(arrows, '3s linear infinite', [
			[0, '-webkit-transform: translate(0,0);'],
			[27, '-webkit-transform: translate(0, 30px);'],
			[50, '-webkit-transform: translate(0,0);'],
			[73, '-webkit-transform: translate(0, -30px);']
		]);
	};

	Weight.prototype.deactivate = function() {
		Section.prototype.deactivate.call(this);
		var arrows = this._page.element.querySelector('.weight-index.arrows');
		this._page.element.removeChild(arrows);
		this.stopInteraction();
	};

	Weight.prototype.handleTap = function(e) {
		var matches = toArray(this.card.querySelectorAll('[data-action]'))
			.filter(function(el) {
				return el.contains(e.target);
			});

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
		helper.cleanupPaperScript(this)
		WeightInteraction.quiz.classList.remove('slideUpAndFadeIn');
		WeightInteraction.quiz.classList.add('slideDownAndFadeOut');

		this.card.classList.remove('slideDownAndFadeOut');
		this.card.classList.add('slideUpAndFadeIn');
	};

	return new Weight(html);
});
