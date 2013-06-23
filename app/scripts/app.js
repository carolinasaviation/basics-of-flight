/*global define */
define([
	'./pages/forces',
	'./pages/controls',
	'./pages/preflight',
	'./views/navigation',
], function (forces, controls, preflight, viewNavigation) {
	'use strict';

	var NAV_ACTIVE_CLASS = 'nav-item-active';

	function AppManager() {
		this.pages = [
			forces,
			controls,
			preflight
		];

		this.render();
		this.bind();
		this.init();
	}

	AppManager.prototype = {
		init: function() {
			document.querySelector('.nav-item').click();
		},

		render: function() {
			var nav = viewNavigation({ pages: this.pages.map(function(page) { return page.name; }) })
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			document.body.insertBefore(tmp.firstChild, document.body.firstChild);
		},

		bind: function() {
			var pages = this.pages;
			document.querySelector('.nav').addEventListener('click', function(e) {
				var active = document.querySelector('.nav .' + NAV_ACTIVE_CLASS);
				if (active) {
					page = _.findWhere(pages, { name: active.textContent });
					page.unload();
					active.classList.remove(NAV_ACTIVE_CLASS);
				}

				var node = e.target;

				while (!node.matches('.nav-item'))
					node = node.parentNode;

				node.classList.add(NAV_ACTIVE_CLASS);
				var page = _.findWhere(pages, { name: node.textContent });
				page.load();
			}, false);
		}
	}


	return new AppManager();
});
