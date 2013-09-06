define([
	'../lib/section',
	'./interactives/weight',
	'../lib/Tween'
], function(Section, interactive, TWEEN) {
	'use strict';

	TWEEN || (TWEEN = window.TWEEN);
	var BLEED = 200;
	var OFFSET = 20;
	var TIME = 6000;
	var STROKE_WIDTH = 2;
	var STROKE_COLOR = '#666';
	var raf;

	function Weight() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.weight.quiz);
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this);

		var canvas = document.createElement('canvas');
		canvas.width = this._page.element.clientWidth;
		canvas.height = this._page.element.clientHeight - this.card.clientHeight;
		var ctx = canvas.getContext('2d');

		this._page.element.insertBefore(canvas, this._page.element.firstChild);

		var end = ((canvas.width > canvas.height) ? canvas.width : canvas.height) + BLEED * 2;
		var i;

		var t = new TWEEN.Tween({ x: -BLEED, y: BLEED })
			.to({ x: BLEED, y: -BLEED }, TIME)
			.easing(TWEEN.Easing.Linear.None)
			.repeat(Infinity)
			.onUpdate(function() {
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				//ctx.save();

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

				//ctx.restore();
			})
			.start();

		animate();

		function animate() {
			raf = requestAnimationFrame(animate);
			TWEEN.update();
		}
	};

	Weight.prototype.stopInteraction = function() {
		Section.prototype.stopInteraction.call(this);

		if (raf) cancelAnimationFrame(raf);
		this._page.element.removeChild(this._page.element.querySelector('canvas'));
	}

	return new Weight();
});

