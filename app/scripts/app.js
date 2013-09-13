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

			// quick hack for deep linking
			if (location.hash) {
				var l = location.hash.split('/');
				l.shift();
				var n = document.querySelector('.nav a[href="#/' + l[0] + '"]')
				if (!n) return;

				Hammer(n).trigger('tap', { target: n });
				n = n.parentNode.querySelector('a[href="' + l[1] + '"]');

				if (!n) return
				setTimeout(function() {
					Hammer(n).trigger('tap', { target: n });
				}, 500);
			}
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
			// el lives on for all handlers to avoid GC
			var el;

			// prevent all clicks
			document.body.addEventListener('click', function(e) { e.preventDefault(); }, false);

			// prevent scrolling except for white listed elements
			// this is really janky.
			document.addEventListener('touchstart', onTouchstart, false);
			document.addEventListener('touchend', onTouchend, false);

			function onTouchstart(e) {
				el = document.querySelector('.card-content--active');
				if (el && el.contains(e.target)) return;
					
				document.addEventListener('touchmove', onTouchmove, false);
			}

			function onTouchmove(e) { e.preventDefault(); }
			function onTouchend(e) { document.removeEventListener('touchmove', onTouchmove); }

			document.documentElement.addEventListener('keyup', function(e) {
				if (e.keyCode === 27 && (el = document.querySelector('.modal--active')))
					window.closeModal(el);
			}, false);

			Hammer(document.querySelector('.nav')).on('tap', this._onNavigationAction.bind(this));
		},

		_onNavigationAction: function(e) {
			var active = document.querySelector('.nav .' + NAV_ACTIVE_CLASS);
			var node = e.target;
			var page;

			// since all subnavs are visible before events are necessarily bound,
			// we bail out if the handler should be handled by the subnavListener
			while (!node.matches('.nav-item'))
				if (node.matches('.subnav')) return
				else
					node = node.parentNode;

			// do this early for quicker feedback for perceived performance
			node.classList.add(NAV_ACTIVE_CLASS);

			if (active) {
				page = _.findWhere(this.pages, { name: active.textContent });

				if (page.activatedSection &&
						page.name.toLowerCase() === node.innerText.toLowerCase()) {
					page.deselectActiveSection();
					page.load();
					return;
				}

				if (active.contains(node)) return;

				page.unload();
				active.classList.remove(NAV_ACTIVE_CLASS);
			}

			page = _.findWhere(this.pages, { name: node.textContent });
			page.load();
		}
	}


	return new AppManager();
});
