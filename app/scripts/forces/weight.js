define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
	'./weightInteraction'
], function(Section, draw, helper, paper, WeightInteraction) {

	var html = [
		'<div class="card">',
			'<div class="card-primary">',
				'<h1>', i18n.weight.title, '</h1>',
				'<p>', i18n.weight.description, '</p>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="column column-golden-large" data-action="play">Play Film</button>',
				'<div class="column column-golden-small" data-action="play"><img src="images/weight-weight-button.png"></div>',
				'<button class="btn btn-weight-interaction" data-action="startInteraction"><img src="images/weight-elevation.png"></button>',
			'</div>',
		'</div>'
	].join('');

	function Weight() {
		Section.call(this);
		var card = this.card = helper.createDomNode(html);
		card.style.position = 'absolute';
		card.style.bottom = card.style.right = '1.5em';
		card.style.width = '60%';
		card.style.zIndex = 5;
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
