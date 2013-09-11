define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display',
	'../../lib/Tween'
], function(helper, i18n, display, TWEEN) {
	'use strict';
	TWEEN || (TWEEN = window.TWEEN);

	var scale = helper.scale;

	var spriteSheet = Array.apply(0, Array(17)).map(function(_, i) {
		var img = new Image();
		var src = (i < 10) ? ('0' + i) : ('' + i);
		img.classList.add('internal-animation');
		img.classList.add('interactive--sprite');
		img.src = 'images/preflight-internal/' + src + '.png';
		return img;
	});

	function interactive() {
		var self = this;
		var el = this._page.element;
		var cur = spriteSheet.length - 1;
		var dir = 1;
		var n = 0;
		var iteration = 0;

		this._page.element.appendChild(spriteSheet[cur]);

		function next() {
			// TODO: handle this in Section.js
			if (!self.isActive) {
				el.removeChild(spriteSheet[n]);
				return;
			}
			iteration++;
			if (iteration % 2 === 0) {
				if (cur === spriteSheet.length - 1) dir = -1;
				if (cur === 0) dir = 1;
				n = cur + (1 * dir);
				el.replaceChild(spriteSheet[n], spriteSheet[cur]);
				cur = n;
			}
			self.raf = requestAnimationFrame(next);
		}

		next();
	}

	return {
		bindings: {},
		interactive: interactive
	}

});



