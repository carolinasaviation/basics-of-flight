/*global define */
define([
	'./config',
	'./pages/forces',
	'./pages/controls',
	'./pages/preflight',
	'./views/navigation',
], function (config, forces, controls, preflight, viewNavigation) {
	'use strict';
	window.config = config;

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
			var nav = viewNavigation({ pages: this.pages.map(function(page) { return page.name; }) })
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			document.body.insertBefore(tmp.firstChild, document.body.firstChild);
		},

		bind: function() {
			// prevent all clicks
			document.body.addEventListener('click', function(e) { e.preventDefault(); }, false);

			Hammer(document.querySelector('.nav')).on('tap', this._onNavigationAction.bind(this));
		},

		_onNavigationAction: function(e) {
			var active = document.querySelector('.nav .' + NAV_ACTIVE_CLASS);
			if (active) {
				page = _.findWhere(this.pages, { name: active.textContent });
				page.unload();
				active.classList.remove(NAV_ACTIVE_CLASS);
			}

			var node = e.target;

			while (!node.matches('.nav-item'))
				node = node.parentNode;

			node.classList.add(NAV_ACTIVE_CLASS);
			var page = _.findWhere(this.pages, { name: node.textContent });
			page.load();
		}
	}


	return new AppManager();
});
