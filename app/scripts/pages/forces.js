define([
	'../lib/page',
	'../forces/weight',
	'../forces/lift',
	'../forces/drag',
	'../forces/thrust',
	'../lib/animations',
	'../lib/helpers',
	'../lib/Tween'
], function(Page, weight, lift, drag, thrust, draw, helper, TWEEN) {
	'use strict';

	var TWEEN = window.TWEEN;
	var BLEED = 200;
	var OFFSET = 20;
	var TIME = 6000;
	var STROKE_WIDTH = 2;
	var STROKE_COLOR = '#666';
	var raf;

	var ARROWS_SELECTOR = '.forces-arrows';
	var arrows = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow-n"><div class="arrow"></div></div><div class="arrow-s"><div class="arrow"></div></div><div class="arrow-w"><div class="arrow"></div></div><div class="arrow-e"><div class="arrow"></div></div></div>';
	var image = '<div class="cessna" style="position:absolute;z-index:1;-webkit-transform: translate(0,0)"></div>';

	function Forces() {
		Page.call(this, [
			weight,
			lift,
			drag,
			thrust
		]);
	}

	Forces.prototype = Object.create(Page.prototype);

	Forces.prototype.constructor = Forces;
	Forces.prototype.init = function() {
		Page.prototype.init.call(this);
		var cessna = helper.createDomNode(image)
		cessna.appendChild(document.getElementById('cessna-isometric').cloneNode(true));
		this.element.appendChild(cessna);
	};

	Forces.prototype.onLoad = function() {
		Page.prototype.onLoad.call(this);

		var element = this.element.querySelector('.cessna');
		draw.createAnimation(element, '3s linear infinite', [
			[0, '-webkit-transform: translate(0,0);'],
			[27, '-webkit-transform: translate(0, -30px);'],
			[50, '-webkit-transform: translate(0,0);'],
			[73, '-webkit-transform: translate(0, 30px);']
		]);

		// temp!
		this.activate();
	};

	Forces.prototype.activate = function() {
		if (this.isActive) return;
		Page.prototype.activate.call(this);

		var canvas = document.createElement('canvas');
		canvas.width = this.element.clientWidth;
		canvas.height = this.element.clientHeight - this.card.clientHeight;
		var ctx = canvas.getContext('2d');
						
		this.element.insertBefore(canvas, this.element.firstChild);
		this.element.querySelector('.cessna').appendChild(helper.createDomNode(arrows));

		var end = ((canvas.width > canvas.height) ? canvas.width : canvas.height) + BLEED * 2;
		var i;

		var t = new TWEEN.Tween({ x: -BLEED, y: BLEED })
			.to({ x: BLEED, y: -BLEED }, TIME)
			.easing(TWEEN.Easing.Linear.None)
			.repeat(Infinity)
			.onUpdate(function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.save();

				ctx.lineWidth = STROKE_WIDTH;
				ctx.strokeStyle = STROKE_COLOR;

				// x lines, moving in y axis
				ctx.beginPath();
				for (i = -BLEED; i <= end; i += OFFSET) {
					ctx.moveTo(0, i + this.y);
					ctx.lineTo(canvas.width, i + this.y);

					ctx.moveTo(i + this.x, 0);
					ctx.lineTo(i + this.x, canvas.height);
				}
				ctx.closePath();
				ctx.stroke();

				ctx.restore();
			})
			.start();

		animate();

		function animate() {
			raf = requestAnimationFrame(animate);
			TWEEN.update();
		}

	};

	Forces.prototype.deactivate = function() {
		if (!this.isActive) return;
		Page.prototype.deactivate.call(this);

		var arrows = this.element.querySelector(ARROWS_SELECTOR);

		this.element.querySelector('.cessna').removeChild(arrows);
		if (raf) cancelAnimationFrame(raf);
		this.element.removeChild(this.element.querySelector('canvas'));
	};

	return new Forces();
});


