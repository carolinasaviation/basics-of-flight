/*global define */
define([
	'config',
	'i18n',
	'./pages/forces',
	'./pages/controls',
	'./pages/preflight',
	'./views/navigation',
	'./lib/touch',
	'lodash'
], function (config, i18n, forces, controls, preflight, viewNavigation, touch, _) {
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
				var n = document.querySelector('.nav a[href="#/' + l[0] + '"]');
				if (!n) return;

				touch(n).trigger('tap', { target: n });
				n = n.parentNode.querySelector('a[href="' + l[1] + '"]');

				if (!n) return;
				setTimeout(function() {
					touch(n).trigger('tap', { target: n });
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
				});

			var nav = viewNavigation({ pages: pages });
			var tmp = document.createElement('div');
			tmp.innerHTML = nav;
			document.body.insertBefore(tmp.firstChild, document.body.firstChild);
		},

		bind: function() {
			// el lives on for all handlers to avoid GC
			var el, self = this;

			// prevent all clicks
			document.body.addEventListener('click', function(e) { e.preventDefault(); }, false);

			function onTouchstart(e) {
				el = document.querySelector('.card-content--active');
				if (el && el.contains(e.target)) return;

				document.addEventListener('touchmove', onTouchmove, false);
			}

			function onTouchmove(e) { e.preventDefault(); }
			function onTouchend() { document.removeEventListener('touchmove', onTouchmove); }

			// prevent scrolling except for white listed elements
			// this is really janky.
			document.addEventListener('touchstart', onTouchstart, false);
			document.addEventListener('touchend', onTouchend, false);

			document.documentElement.addEventListener('keyup', function(e) {
				if (e.keyCode === 27 && (el = document.querySelector('.modal--active')))
					window.closeModal(el);
			}, false);

			touch(document.querySelector('.nav')).on('tap', this._onNavigationAction.bind(this));

			// the hackiest keybindings for navigation of all time
			var KEYS = { 48: 0, 49: 1, 50: 2, 51: 3, 52: 4, 192: '`' };
			document.body.addEventListener('keyup', function(e) {
				var n = KEYS[e.keyCode];
				if (typeof n === 'undefined') return;
				if (n === '`') {
					n = document.querySelector('.nav .' + NAV_ACTIVE_CLASS).parentNode.nextElementSibling;
					if (n) n = n.querySelector('.nav-item');
					return self._onNavigationAction({ target: n || document.querySelector('.nav .nav-item') });
				}

			  if (n === 0)
					return self._onNavigationAction({ target: document.querySelector('.nav .' + NAV_ACTIVE_CLASS) });
				n = document.querySelector('.' + NAV_ACTIVE_CLASS + '+.subnav .subnav-item-container:nth-child(' + n + ') a');
				if (n)
					touch(n).trigger('tap', { target: n });
			}, false);
		},

		_onNavigationAction: function(e) {
			var active = document.querySelector('.nav .' + NAV_ACTIVE_CLASS);
			var node = e.target;
			var page;

			// since all subnavs are visible before events are necessarily bound,
			// we bail out if the handler should be handled by the subnavListener
			while (!node.matches('.nav-item'))
				if (node.matches('.subnav')) return;
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

				history.pushState(null, null, node.href);

				if (active === node || active.contains(node)) return;

				page.unload();
				active.classList.remove(NAV_ACTIVE_CLASS);
			}

			page = _.findWhere(this.pages, { name: node.textContent });
			page.load();
		}
	};


	return new AppManager();
});
