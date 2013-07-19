define([
	'../lib/helpers',
], function(helper) {

	function Section(html) {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';

		this.card = helper.createDomNode(html);
		this.handleTap = this.handleTap.bind(this);
		this.init();
	}

	Section.prototype = {
		paperScope: undefined,
		paperProject: undefined,
		paperView: undefined,
		_page: undefined,
		handleTap: function(){},
		init: function(){},

		page: function page(page) {
			if (page) this._page = page;
			return this._page;
		},

		activate: function activate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (!(this._page && this._page.element)) return;

			Hammer(this._page.element).on('tap', this.handleTap);

			this._page.element.appendChild(this.card, this._page.element.firstChild);
			this._page.element.insertBefore(this.canvas, this._page.element.firstChild);

			this.card.classList.remove('slideDownAndFadeOut');
			this.card.classList.add('slideUpAndFadeIn');
		},

		deactivate: function deactivate() {
			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (!(this._page && this._page.element)) return;

			this.card.classList.remove('slideUpAndFadeIn');
			this.card.classList.add('slideDownAndFadeOut');
			var self = this;
			setTimeout(function() {
				if (self._page.element.contains(self.card))
					self._page.element.removeChild(self.card);
			}, 300);
			this._page.element.removeChild(this.canvas);
			Hammer(this._page.element).off('tap', this.handleTap);
		},

		startInteraction: function startInteraction() {
			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		stopInteraction: function stopIntetraction() {
			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		}
	};

	return Section;
});

