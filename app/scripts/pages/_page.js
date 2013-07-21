define([
	'../views/pageCard',
	'../lib/helpers',
], function(viewCard, helper) {
	'use strict';

	var NAV_ACTIVE_CLASS = 'subnav-item-active';

	function Page() {
		this.isInit = false;
		this.isLoaded = false;
		this.isActive = false;
		this.sections = [];
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.subnavListener = this.subnavListener.bind(this);
		this.activatedSection = false;
	}

	Page.prototype = {
		subnav: document.createElement('ul'),
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

			function giveThis(s) { s.page(this); }
			this.sections.forEach(giveThis.bind(this));

			var name = this.name;
			this.subnav = helper.toArray(document.querySelectorAll('.nav-item')).filter(function(el, index, array) {
				return el.textContent === name;
			})[0].parentNode.querySelector('.subnav');

			this.isInit = true;

			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, 'init');
		},

		beforeLoad: function beforeLoad() {
			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, 'beforeLoad');

			document.body.insertBefore(this.element, document.body.firstChild.nextSibling);

			this.deselectActiveSection();
			Hammer(this.subnav).on('tap', this.subnavListener);
		},

		load: function load() {
			if (this.isInit === false) this.init();
			this.beforeLoad();
			this.card.classList.remove('slideDownAndFadeOut');
			this.card.classList.add('slideUpAndFadeIn');

			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'load');

			this.onLoad();
		},

		onLoad: function onLoad() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'onload');
			this.isLoaded = true;
			this.activate();
		},

		beforeUnload: function beforeUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'beforeUnload');
		},

		unload: function unload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'unload');
			this.isLoaded = false;

			this.onunload();
		},

		onunload: function onUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'onUnload');
			Hammer(this.subnav).off('tap', this.subnavListener);
			this.element.parentNode.removeChild(this.element);
			this.activatedSection = false;
		},

		// event listeners

		activate: function activate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'activate');
			paper || (paper = window.paper);
			this.isActive = true;
		},

		deactivate: function deactivate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'deactivate');
			this.card.classList.remove('slideUpAndFadeIn');
			this.card.classList.add('slideDownAndFadeOut');
			this.isActive = false;
		},

		deselectActiveSection: function(e) {
			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (!active) return;

			var section = _.findWhere(this.sections, { name: active.textContent });
			if (section)
				section.deactivate();

			active.classList.remove(NAV_ACTIVE_CLASS);
		},

		subnavListener: function(e) {
			if (e.target.matches('.subnav')) return;
			e.preventDefault();
			e.stopPropagation();
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

			return false;
		}
	}

	return Page;
});

