define([], function() {

	function Thrust() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
	}

	Thrust.prototype = {
		constructor: Thrust,

		page: function(page) {
			if (page) this._page = page;
			return this._page;
		},

		init: function() {
			console.log([this._page.name, this.name].join('#') + ': init');
		},

		activate: function() {
			console.log([this._page.name, this.name].join('#') + ': activate');
		},

		deactivate: function() {
			console.log([this._page.name, this.name].join('#') + ': deactivate');
		}
	};

	return new Thrust();
});
