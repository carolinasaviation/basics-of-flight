define([], function() {

	function Drag() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
	}

	Drag.prototype = {
		constructor: Drag,

		page: function(page) {
			if (page) this._page = page;
			return this._page;
		},

		init: function() {
			console.log([this._page.name, this.name].join('#') + ': init');
		},

		activate: function() {
			console.log([this._page.name, this.name].join('#') + ': activate');
			this._page.card.style.display = 'none';
		},

		deactivate: function() {
			console.log([this._page.name, this.name].join('#') + ': deactivate');
			this._page.card.style.display = 'block';
		}
	};

	return new Drag();
});
