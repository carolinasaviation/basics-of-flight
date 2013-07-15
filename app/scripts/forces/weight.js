define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
	'./weightInteraction'
], function(Section, draw, helper, paper, WeightInteraction) {

	var html = [
		'<div class="card">',
			'<h1>', i18n.weight.title, '</h1>',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', i18n.weight.equation, '</div>',
					'<div class="col" style="width: 80%">', i18n.weight.equationDescription, '</div>',
				'</div>',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', '<img src="/images/', i18n.weight.historicalFigure, '" />', '</div>',
					'<div class="col" style="width: 80%">', i18n.weight.historicalDescription, '</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-weight-interaction" data-action="startInteraction"><img src="images/weight-elevation.png"></button>',
			'</div>',
		'</div>'
	].join('');

	function Weight() {
		Section.call(this);
		var card = this.card = helper.createDomNode(html);
		WeightInteraction.setup(this.canvas);
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.activate = function() {
		Section.prototype.activate.call(this);
		var page = this;

		this.card.classList.remove('slideDownAndFadeOut');
		this.card.classList.add('slideUpAndFadeIn');

		Hammer(this.card).on('tap', function handleTap(e) {
			var action = e.target.getAttribute('data-action') || e.target.parentNode.getAttribute('data-action');
			if (!action) return false;

			page[action] && page[action]();
		});
	};

	Weight.prototype.deactivate = function() {
		Section.prototype.deactivate.call(this);
		this.paperScope.clear();
		Hammer(this.card).off('tap');
	};

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);
		this.card.classList.remove('slideUpAndFadeIn');
		this.card.classList.add('slideDownAndFadeOut');

		this.paperScope = helper.createPaperScript(this.canvas, WeightInteraction.paperScript)
		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	return new Weight();
});
