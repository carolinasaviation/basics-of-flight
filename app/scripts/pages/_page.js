define([
	'../views/subnavigation',
], function(viewSubnav) {
	var NAV_ACTIVE_CLASS = 'subnav-item-active';

	function Page() {
		this.isInit = false;
		this.isActive = false;
		this.sections = [];
		this.subnav = viewSubnav;
		this.subnavListener = this.subnavListener.bind(this);
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.activatedSection = false;
	}

	Page.prototype = {
		card: document.createElement('div'),
		movie: -1,

		init: function init() {
			if (this.isInit) return;

			this.element = document.createElement('div');
			this.element.classList.add('page');
			this.element.setAttribute('id', 'page' + this.name.toLowerCase());

			var nav = this.subnav({ sections: this.sections });
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			this.subnav = tmp.firstChild;
			this.element.insertBefore(this.subnav, this.element.firstChild);

			this.isInit = true;
			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
		},

		beforeLoad: function beforeLoad() {
			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, arguments.callee.name);

			document.body.insertBefore(this.element, document.body.firstChild.nextSibling);

			this.deselectActiveSection();
			Hammer(this.element.querySelector('.subnav')).on('tap', this.subnavListener);
		},

		load: function load() {
			if (this.isInit === false) this.init();
			this.beforeLoad();
			this.card.classList.remove('slideUpAndFadeOut');
			this.card.classList.add('slideDownAndFadeIn');

			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.onLoad();
		},

		onLoad: function onLoad() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.isActive = true;
		},

		beforeUnload: function beforeUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
		},

		unload: function unload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.isActive = false;

			this.stop();
			this.onunload();
		},

		onunload: function onUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			Hammer(this.element.querySelector('.subnav')).off('tap', this.subnavListener);
			this.element.parentNode.removeChild(this.element);
			this.activatedSection = false;
		},

		// event listeners

		play: function(elements, options) {
			this.movie = {};
			//this.movie = morpheus(elements, options);
		},

		stop: function() {
			this.movie.stop && this.movie.stop();
		},

		activate: function() {
			//console.log('Section#activate %s', this.name);
			paper || (paper = window.paper);
		},

		deactivate: function() {
			//console.log('Section#deactivate %s', this.name);
			this.card.classList.remove('slideDownAndFadeIn');
			this.card.classList.add('slideUpAndFadeOut');
		},

		deselectActiveSection: function(e) {
			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (!active) return;

			section = _.findWhere(this.sections, { name: active.textContent });
			if (section) {
				section.deactivate();
				this.activate();
			}
			active.classList.remove(NAV_ACTIVE_CLASS);
		},

		subnavListener: function(e) {
			e.preventDefault();
			this.deselectActiveSection();

			if (!this.activatedSection)
				this.deactivate();

			this.activatedSection = true;

			var node = e.target;
			var section;

			while (!node.matches('.subnav-item'))
				node = node.parentNode;

			node.classList.add(NAV_ACTIVE_CLASS);
			section = _.findWhere(this.sections, { name: node.textContent });
			if (section)
				section.activate();
		}
	}

	return Page;
});

