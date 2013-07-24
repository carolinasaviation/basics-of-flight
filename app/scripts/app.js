/*global define */
define([
	'./config',
	'./i18n/en',
	'./pages/forces',
	'./pages/controls',
	'./pages/preflight',
	'./views/navigation',
	'lodash',
], function (config, i18n, forces, controls, preflight, viewNavigation, _) {
	'use strict';

	window.config = config;
	window.i18n = i18n;

	var NAV_ACTIVE_CLASS = 'nav-item-active';

	function AppManager() {
		this.pages = [
			forces,
			controls,
			preflight
		];

		this.render();
	}

	AppManager.prototype = {
		init: function() {
			this.bind();
			this._onNavigationAction({ target: document.querySelector('.nav-item') });
		},

		render: function() {
			function getName(t) { return t.name; }
			var pages = this.pages.map(function(page) {
					return {
						name: getName(page),
						sections: page.sections.map(getName)
					};
				})

			var nav = viewNavigation({ pages: pages });
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			document.body.insertBefore(tmp.firstChild, document.body.firstChild);
		},

		bind: function() {
			// prevent all clicks
			document.body.addEventListener('click', function(e) { e.preventDefault(); }, false);
			document.body.addEventListener('touchmove', function(e) { e.preventDefault(); }, false);

			Hammer(document.querySelector('.nav')).on('tap', this._onNavigationAction.bind(this));
		},

		_onNavigationAction: function(e) {
			var active = document.querySelector('.nav .' + NAV_ACTIVE_CLASS);
			var node = e.target;

			// since all subnavs are visible before events are necessarily bound,
			// we bail out if the handler should be handled by the subnavListener
			while (!node.matches('.nav-item'))
				if (node.matches('.subnav')) return
				else
					node = node.parentNode;

			if (active) {
				page = _.findWhere(this.pages, { name: active.textContent });
				page.unload();
				active.classList.remove(NAV_ACTIVE_CLASS);
			}


			node.classList.add(NAV_ACTIVE_CLASS);
			var page = _.findWhere(this.pages, { name: node.textContent });
			page.load();
		}
	}


	return new AppManager();
});
