define([
	'../views/subnavigation',
	'../views/pageCard',
	'../lib/helpers',
], function(viewSubnav, viewCard, helper) {
	var NAV_ACTIVE_CLASS = 'subnav-item-active';

	function Page() {
		this.isInit = false;
		this.isLoaded = false;
		this.isActive = false;
		this.sections = [];
		this.subnav = viewSubnav;
		this.subnavListener = this.subnavListener.bind(this);
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.activatedSection = false;
	}

	Page.prototype = {
		card: document.createElement('div'),
		paperProject: undefined,
		paperView: undefined,

		init: function init() {
			if (this.isInit) return;


			this.element = document.createElement('div');
			this.element.classList.add('page');
			this.element.setAttribute('id', 'page-' + this.name.toLowerCase());

			this.card = helper.createDomNode(viewCard(i18n[this.name.toLowerCase()]));
			this.card.classList.add('card-main')
			this.element.appendChild(this.card);

			var nav = this.subnav({ sections: this.sections });
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			this.subnav = tmp.firstChild;
			this.element.insertBefore(this.subnav, this.element.firstChild);

			function giveThis(s) { s.page(this); }
			this.sections.forEach(giveThis.bind(this));

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
			this.card.classList.remove('slideDownAndFadeOut');
			this.card.classList.add('slideUpAndFadeIn');

			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.onLoad();
		},

		onLoad: function onLoad() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.isLoaded = true;
			this.activate();
		},

		beforeUnload: function beforeUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
		},

		unload: function unload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.isLoaded = false;

			this.onunload();
		},

		onunload: function onUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			Hammer(this.element.querySelector('.subnav')).off('tap', this.subnavListener);
			this.element.parentNode.removeChild(this.element);
			this.activatedSection = false;
		},

		// event listeners

		activate: function activate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			paper || (paper = window.paper);
			this.isActive = true;
		},

		deactivate: function deactivate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, arguments.callee.name);
			this.card.classList.remove('slideUpAndFadeIn');
			this.card.classList.add('slideDownAndFadeOut');
			this.isActive = false;
		},

		deselectActiveSection: function(e) {
			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (!active) return;

			section = _.findWhere(this.sections, { name: active.textContent });
			if (section) {
				section.deactivate();
			}
			active.classList.remove(NAV_ACTIVE_CLASS);
		},

		subnavListener: function(e) {
			if (e.target.matches('.subnav')) return;
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

