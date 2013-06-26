define([
	'../views/subnavigation',
	'../vendor/morpheus'
], function(viewSubnav, morpheus) {
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

		init: function() {
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
			if (config.logger.pageLifeCycle) console.log('init page %s', this.name);
		},

		beforeLoad: function() {
			if (config.logger.pageLifeCycle) console.log('BeforeLoad page %s', this.name);

			document.body.insertBefore(this.element, document.body.firstChild.nextSibling);

			this.deselectActiveSection();
			this.element.querySelector('.subnav').addEventListener('click', this.subnavListener, false);
		},

		load: function() {
			if (this.isInit === false) this.init();
			this.beforeLoad();
			this.card.classList.remove('slideUpAndFadeOut');
			this.card.classList.add('slideDownAndFadeIn');

			if (config.logger.pageLifeCycle) console.log('Load page %s', this.name);
			this.onLoad();
		},

		onLoad: function() {
			if (config.logger.pageLifeCycle) console.log('OnLoad page %s', this.name);
			this.isActive = true;
		},

		beforeUnload: function() {
			if (config.logger.pageLifeCycle) console.log('BeforeUnload page %s', this.name);
		},

		unload: function() {
			if (config.logger.pageLifeCycle) console.log('Unload page %s', this.name);
			this.isActive = false;

			this.stop();
			this.onunload();
		},

		onunload: function() {
			if (config.logger.pageLifeCycle) console.log('OnUnload page %s', this.name);
			this.element.querySelector('.subnav').removeEventListener('click', this.subnavListener);
			this.element.parentNode.removeChild(this.element);
			this.activatedSection = false;
		},

		// event listeners

		play: function(elements, options) {
			this.movie = morpheus(elements, options);
		},

		stop: function() {
			this.movie.stop && this.movie.stop(arguments);
		},

		deselectActiveSection: function(e) {
			var active = document.querySelector('.subnav .' + NAV_ACTIVE_CLASS);
			if (!active) return;

			section = _.findWhere(this.sections, { name: active.textContent });
			if (section)
				section.deactivate();
			active.classList.remove(NAV_ACTIVE_CLASS);
		},

		subnavListener: function(e) {
			e.preventDefault();
			this.deselectActiveSection();

			if (!this.activatedSection) {
				console.log('adding up and out class');
				this.card.classList.remove('slideDownAndFadeIn');
				this.card.classList.add('slideUpAndFadeOut');
			}

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

