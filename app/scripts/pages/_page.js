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

		this.cardRotation = 0;
		this.element =
		this.cardStage =
		this.cardRotator =
		this.card =
		undefined;
	}

	Page.prototype = {
		card: undefined,
		paperProject: undefined,
		paperView: undefined,

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
			paper || (paper = window.paper);
			this.rotateIn(this.card, 'south');
			this.isActive = true;
		},

		deactivate: function deactivate() {
			if (config.logger.pageLifeCycle) config.logger.pageLifeCycleFn.call(this, 'deactivate');
			//this.card.classList.remove(CARD_TRANSITION_IN);
			//this.card.classList.add(CARD_TRANSITION_OUT);
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
			if (section)
				section.activate();

			return false;
		},

		_rotate: function() {

		},

		rotateIn: function(el, dir) {
			var pos = (dir === 'south') ? -1 : 1;

			var elRotation = pos * 90 + this.cardRotation;

			if (Math.abs(elRotation % 180) === 90 && Math.abs(this.cardRotation % 360) !== 0) {
				elRotation = this.cardRotation - 90;
			}

			el.style.webkitTransform = 'rotateX(' + elRotation + 'deg) translate3d(0, 0, 125px)';

			var prevChild = this.cardRotator.firstElementChild;

			if (!prevChild) {
				this.cardRotator.appendChild(el);
				this.cardRotation -= pos * 90;
				this.cardRotator.style.webkitTransform = 'rotateX(' + this.cardRotation + 'deg)';
				return;
			}

			this.cardRotator.appendChild(el);

			this.cardRotation += pos * 90;
			if (this.cardRotation > 360) this.cardRotation %= 360;

			this.cardRotator.style.webkitTransform = 'rotateX(' + this.cardRotation + 'deg)';
			this.cardStage.addEventListener('webkitTransitionEnd', function end(e) {
				//console.log('webkitTransitionEnd', prevChild);
				console.assert(prevChild !== el, 'grabbed the wrong child');
				if (prevChild === el) return;
				if (prevChild && prevChild.parentNode && prevChild.parentNode.children.length > 1
						&& prevChild !== el)
					prevChild.parentNode.removeChild(prevChild);
			}, false);
		},

		rotateOut: function() {
			//debugger;
		}

	}

	return Page;
});

