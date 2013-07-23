define([
	'../lib/helpers',
	'../views/sectionCard',
	'../config',
], function(helper, card, config) {

	function Section() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';

		var tmp = document.createElement('div');
		tmp.innerHTML = card(i18n[this.name.toLowerCase()]);
		this.card = tmp.firstChild;
		this.handleTap = this.handleTap.bind(this);
		this.init();
	}

	Section.prototype = {
		paperScope: undefined,
		paperProject: undefined,
		paperView: undefined,
		_page: undefined,
		init: function init(){},

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

			Hammer(this._page.element).off('tap', this.handleTap);
		},

		startInteraction: function startInteraction() {
			this._page.element.insertBefore(this.canvas, this._page.element.firstChild);

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		stopInteraction: function stopIntetraction() {
			this._page.element.removeChild(this.canvas);

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		handleTap: function(e) {
			var matches = helper.toArray(this.card.querySelectorAll('[data-action]'))
				.filter(function(el) {
					return el.contains(e.target);
				});

			if (!matches[0]) return false;
			action = matches[0].getAttribute('data-action');

			if (this[action])
				this[action]();
		}
	};

	return Section;
});

