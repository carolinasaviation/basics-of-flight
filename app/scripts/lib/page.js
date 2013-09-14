define([
	'../views/pageCard',
	'../lib/helpers',
], function(viewCard, helper) {
	'use strict';

	var NAV_ACTIVE_CLASS = 'subnav-item-active';

	function Page(sections) {
		this.isInit = false;
		this.isLoaded = false;
		this.isActive = false;
		this.sections = sections || [];
		this.name = this.constructor.toString().match(/^function (\w+)/)[1];
		this.subnavListener = this.subnavListener.bind(this);
		this.activatedSection = false;

		this.cardRotation = 0;
		this.element =
		this.cardStage =
		this.cardRotator =
		this.card =
		undefined;
	}

	Page.prototype = {
		card: undefined,

		init: function init() {
			if (this.isInit) return;

			this.element = document.createElement('div');
			this.element.classList.add('page');
			this.element.setAttribute('id', 'page-' + this.name.toLowerCase());

			this.card = helper.createDomNode(viewCard(i18n[this.name.toLowerCase()]));
			this.card.classList.add('card-main')

			this.cardRotator = document.createElement('div');
			this.cardRotator.classList.add('card-rotator');

			this.cardStage = document.createElement('div');
			this.cardStage.classList.add('card-stage');
			this.cardStage.appendChild(this.cardRotator);

			function giveThis(s) { s.page(this); }
			this.sections.forEach(giveThis.bind(this));

			var name = this.name;
			var subnav = helper.toArray(document.querySelectorAll('.nav-item')).filter(function(el, index, array) {
				return el.textContent === name;
			})[0].parentNode.querySelector('.subnav');

			Hammer(subnav).on('tap', this.subnavListener);

			this.isInit = true;

			var self = this;
			this.sections.forEach(function(section) {
				section.page(self);
			});

			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, 'init');
		},

		beforeLoad: function beforeLoad() {
			if (config.logger.pageLifeCycle)
				config.logger.pageLifeCycleFn.call(this, 'beforeLoad');

			document.body.insertBefore(this.element, document.body.firstChild.nextSibling);

			this.deselectActiveSection();
		},

		load: function load() {
			if (this.isInit === false) this.init();
			this.beforeLoad();

			this.element.appendChild(this.cardStage);

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
			this.sections.forEach(function(s) {
				s.deactivate();
			});
			this.isLoaded = false;

			this.onunload();
		},

		onunload: function onUnload() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'onUnload');
			this.element.parentNode.removeChild(this.element);
			this.activatedSection = false;
		},

		// event listeners

		activate: function activate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'activate');
			this.rotateIn(this.card, 'south');
			this.isActive = true;
		},

		deactivate: function deactivate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'deactivate');
			this.isActive = false;
		},

		deselectActiveSection: function(e) {
			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (!active) return;

			var section = _.findWhere(this.sections, { name: active.textContent });
			this.activatedSection = false;
			if (section)
				section.deactivate();

			active.classList.remove(NAV_ACTIVE_CLASS);
		},

		subnavListener: function(e) {
			if (!this.isLoaded) return;
			if (e.target.matches('.subnav')) return;
			e.preventDefault();
			e.stopPropagation();

			var node = e.target;
			var section;

			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (active && active.contains(node)) return;

			this.deselectActiveSection();
			this.deactivate();

			this.activatedSection = true;

			while (!node.matches('.subnav-item'))
				node = node.parentNode;

			node.classList.add(NAV_ACTIVE_CLASS);
			section = _.findWhere(this.sections, { name: node.textContent });
			if (section) {
				history.pushState(null, null, node.href);
				section.activate();
			}

			return false;
		},

		_rotate: function() {

		},

		rotateIn: function(el, dir) {
			var pos = (dir === 'south') ? -1 : 1;

			// this.cardRotation = 0 / 90 / 180 / 270 / 360 / 450 / ..

			var prevChild = this.cardRotator.firstElementChild;

			if (!prevChild) {
				el.style.webkitTransform = 'rotateX(0deg) translate3d(0, 0, 100px)';
				this.cardRotator.appendChild(el);
				this.cardRotator.style.webkitTransform = 'rotateX(-90deg)';
				var r = this.cardRotator;
				setTimeout(function() { r.style.webkitTransform = 'rotateX(0deg)'; }, 0);
				return;
			}

			this.cardRotation = this.cardRotation + pos * 90;
			el.style.webkitTransform = 'rotateX(' + (-this.cardRotation) + 'deg) translate3d(0, 0, 100px)';

			this.cardRotator.appendChild(el);

			this.cardRotator.style.webkitTransform = 'rotateX(' + this.cardRotation + 'deg)';
			this.cardStage.addEventListener('webkitTransitionEnd', function end(e) {
				if (prevChild && prevChild.parentNode)
					prevChild.parentNode.removeChild(prevChild);
				this.removeEventListener('webkitTransitionEnd', end);
			}, false);
		},

		rotateOut: function() {
			//debugger;
		}

	}

	Page.create = function create(name, sections) {
		var ctor, obj = {};
		ctor = obj[name] = new Page(sections);

		ctor.prototype = Object.create(Page.prototype);
		ctor.prototype.constructor = ctor;
		ctor.name = name;
		return ctor;
	}

	return Page;
});

