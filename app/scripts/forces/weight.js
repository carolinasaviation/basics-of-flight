define([], function() {
	var html = [
		'<div class="card">',
			'<div class="card-primary">',
				'<h1>', i18n.weight.title, '</h1>',
				'<p>', i18n.weight.description, '</p>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="column column-golden-large" data-action="play">Play Film</button>',
				'<div class="column column-golden-small" data-action="play"><img src="images/weight-weight-button.png"></div>',
				'<div><img src="images/weight-elevation.png"></div>',
			'</div>',
		'</div>'
	].join('');

	function Weight() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
	}

	Weight.prototype = {
		constructor: Weight,

		page: function(page) {
			if (page) this._page = page;
			return this._page;
		},

		init: function() {
			console.log([this._page.name, this.name].join('#') + ': init');
		},

		activate: function() {
			console.log([this._page.name, this.name].join('#') + ': activate');
			var card = this.element = config.createDomNode(html);
			card.style.position = 'absolute';
			card.style.bottom = '1.5em';
			card.style.right = '1.5em';
			card.style.width = '60%';
			this._page.element.appendChild(card, this._page.element.firstChild);
		},

		deactivate: function() {
			console.log([this._page.name, this.name].join('#') + ': deactivate');
			this._page.element.removeChild(this.element);
		}
	};

	return new Weight();
});
