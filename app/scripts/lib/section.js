define([], function() {

	function Section() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.canvas = document.createElement('canvas');
	}

	Section.prototype = {
		card: document.createElement('div'),
		paperScope: undefined,

		page: function page(page) {
			if (page) this._page = page;
			return this._page;
		},

		activate: function activate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (this._page && this._page.element) {
				this._page.element.appendChild(this.card, this._page.element.firstChild);
				this._page.element.insertBefore(this.canvas, this._page.element.firstChild);
			}
		},

		deactivate: function deactivate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (this._page && this._page.element) {
				this._page.element.removeChild(this.card);
				this._page.element.removeChild(this.canvas);
			}
		},

		startInteraction: function startInteraction() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		}
	};

	return Section;
});

