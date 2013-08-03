define([
	'../lib/helpers',
	'../views/sectionCard',
	'../config',
	'../i18n/en',
], function(helper, card, config, i18n) {

	window.i18n = i18n;

	function Section() {
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';

		var tmp = document.createElement('div');
		tmp.innerHTML = card(i18n[this.name.toLowerCase()]);
		this.card = tmp.firstChild;
		this.handleTap = this.handleTap.bind(this);
		this.isActive = false;
		this.init();
	}

	Section.prototype = {
		paperScope: undefined,
		paperProject: undefined,
		paperView: undefined,
		_page: undefined,
		init: function init(){},

		page: function page(page) {
			if (page) {
				this._page = page;
				//page.cardRotator.appendChild(this.card);
			}
			return this._page;
		},

		activate: function activate() {
			if (this.isActive) return false;

			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (!(this._page && this._page.element)) return;

			Hammer(this._page.element).on('tap', this.handleTap);

			this._page.rotateIn(this.card, 'north');
			this.isActive = true;
		},

		deactivate: function deactivate() {
			if (!this.isActive) return false;

			if (config.logger.sectionLifeCycle)
			 	config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)

			if (!(this._page && this._page.element)) return;

			//this._page.rotateOut(this.card, 'south');

			Hammer(this._page.element).off('tap', this.handleTap);
			this.isActive = false;
		},

		startInteraction: function startInteraction() {
			this._page.element.insertBefore(this.canvas, this._page.element.firstChild);

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, arguments.callee.name)
		},

		stopInteraction: function stopInteraction() {
			if (this._page.element.contains(this.canvas))
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

