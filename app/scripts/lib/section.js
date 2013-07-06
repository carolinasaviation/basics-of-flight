define([], function() {

	function Section() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.canvas = document.createElement('canvas');
	}

	Section.prototype = {
		page: function page(page) {
			if (page) this._page = page;
			return this._page;
		},

		activate: function activate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		deactivate: function deactivate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		startInteraction: function startInteraction() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		}
	};

	return Section;
});

