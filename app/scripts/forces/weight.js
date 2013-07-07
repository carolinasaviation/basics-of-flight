define([
	'../lib/section',
	'../lib/animations',
	'paper',
], function(Section, draw, paper) {

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
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.activate = function() {
		Section.prototype.activate.call(this);
		var page = this;
		var card = this.element = config.createDomNode(html);
		card.style.position = 'absolute';
		card.style.bottom = '1.5em';
		card.style.right = '1.5em';
		card.style.width = '60%';
		card.classList.remove('slideDownAndFadeOut');
		card.classList.add('slideUpAndFadeIn');
		this._page.element.appendChild(card, this._page.element.firstChild);
		Hammer(this._page.element).on('tap', function handleTap(e) {
			var action = e.target.getAttribute('data-action') || e.target.parentNode.getAttribute('data-action');
			if (!action) return false;

			page[action] && page[action]();
		}, false);
	};

	Weight.prototype.deactivate = function() {
		Section.prototype.activate.call(this);
		this._page.element.removeChild(this.element);
	};

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);
		this.element.classList.remove('slideUpAndFadeIn');
		this.element.classList.add('slideDownAndFadeOut');
		this.element.appendChild(this.canvas);
		paper.setup(this.canvas);
		project.importSVG(document.getElementById('cessna-elevation'));
	};

	return new Weight();
});
