define([
	'i18n'
], function(i18n) {
	'use strict';

	function createElement(el, attr) {
		el = document.createElement(el);
		if (typeof attr === 'undefined') return el;
		Object.keys(attr).forEach(function(key) {
			switch (key) {
			case 'textContent':
				el[key] = attr[key];
				break;
			default:
				el.setAttribute(key, attr[key]);
			}
		});
		return el;
	}

	var spriteSheet = Array.apply(0, Array(72)).map(function(_, i) {
		var img = new Image();
		var src = (i < 10) ? ('0' + i) : ('' + i);
		img.classList.add('ss-animation');
		img.src = 'images/preflight-general/' + src + '.png';
		return img;
	});

	var cur = 0, n = 1, raf;

	var TIMEOUT = 300000; // 5 minutes
	//var TIMEOUT = 3000; // 5 minutes
	var INACTIVE_CLASS = 'ss--is-inactive';
	var ACTIVE_CLASS = 'ss--is-active';
	var timeout;

	var screensaver = {
		show: function() {
			var el = document.querySelector('.nav-item');
			Hammer(el).trigger('tap', { target: el });
		  screensaver.insert();
			ss.classList.remove(INACTIVE_CLASS);
			ss.classList.add(ACTIVE_CLASS);
			screensaver.play();
		},
		
		hide: function() {
			screensaver.stop();
			ss.classList.remove(ACTIVE_CLASS);
			ss.classList.add(INACTIVE_CLASS);
		},

		insert: function() {
			document.body.insertBefore(ss, document.body.firstChild);
		},

		toggle: function() {
			ss.classList.toggle(ACTIVE_CLASS);
			ss.classList.toggle(INACTIVE_CLASS);
		},

		stop: function() {
			cancelAnimationFrame(raf);
		},

		play: function() {
			var iteration = 0;
			function next() {
				iteration++;
				if (iteration % 2 === 0)
					return raf = requestAnimationFrame(next);
				if (cur === spriteSheet.length - 1) n = 0;
				else n = cur + 1;
				ss.replaceChild(spriteSheet[n], spriteSheet[cur]);
				cur = n;
				raf = requestAnimationFrame(next);
			}
			raf = requestAnimationFrame(next);
		}
	}


	function scheduleScreensaver() {
		if (timeout) clearTimeout(timeout);

		timeout = setTimeout(screensaver.show, TIMEOUT);
	}

	var ss = document.createElement('div');
	ss.classList.add('ss');

	ss.appendChild(createElement('image', {
		'class': 'ss-image',
		src: 'images/screensaver/us-airways.svg'
	}));

	ss.appendChild(createElement('image', {
		'class': 'ss-image',
		src: 'images/screensaver/asc.svg'
	}));

	ss.appendChild(spriteSheet[cur]);

	ss.appendChild(createElement('p', {
		'class': 'ss-title',
		textContent: i18n.t.touchToEnter
	}));

	ss.addEventListener('webkitTransitionEnd', function(e) {
		if (e.target === ss) ss.parentNode.removeChild(ss);
	}, false);

	Hammer(document.body).on('release', scheduleScreensaver);
	Hammer(ss).on('release', screensaver.hide);

	scheduleScreensaver();

});
