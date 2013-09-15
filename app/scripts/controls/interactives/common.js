define([
	'../../lib/grid'
], function(grid) {
	function createSpriteSheet(name, frames) {
		return Array.apply(0, Array(frames)).map(function(_, i) {
			var img = new Image();
			var src = (i < 10) ? ('0' + i) : ('' + i);
			img.classList.add(name + '-animation');
			img.classList.add('interactive--sprite');
			img.classList.add('cessna');
			img.src = 'images/' + name + '/' + src + '.png';
			return img;
		});
	}

	return {
		interactiveFactory: function(name, frames, bindings) {
			var spriteSheet = createSpriteSheet(name, frames);
			var cur = +bindings.granger.element.value, tween, n;

			return function interactive(canvas) {
				if (tween) {
					tween = grid(this, canvas);
					return tween;
				}
				tween = grid(this, canvas);

				var self = this;
				var el = this._page.element;

				this._page.element.insertBefore(spriteSheet[cur], canvas);

				bindings.granger.element.addEventListener('change', function() {
					if (!self.isActive) {
						el.removeChild(spriteSheet[n]);
						return;
					}
					n = +this.value;
					if (el.contains(spriteSheet[cur]))
						el.replaceChild(spriteSheet[n], spriteSheet[cur]);
					else el.insertBefore(spriteSheet[n], el.firstChild);
					cur = n;
				}, false);

				return tween;
			}
		}
	}

});
