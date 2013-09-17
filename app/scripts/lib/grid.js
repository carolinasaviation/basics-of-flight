define([
	'./Tween'
], function(TWEEN) {
	'use strict';

	var BLEED = 200;
	var OFFSET = 20;
	var STROKE_WIDTH = 2;
	var STROKE_COLOR = '#666';
	var TIME = 7200;

	function noop(){}

	function defaults(options) {
		if (!options) options = {};
		if (!options.to) options.to = {};
		if (!options.from) options.from = {};
		if (typeof options.from.x === 'undefined') options.from.x = -BLEED;
		if (typeof options.from.y === 'undefined') options.from.y = BLEED;
		if (typeof options.from.t === 'undefined') options.from.t = 0;
		if (typeof options.to.x === 'undefined') options.to.x = BLEED;
		if (typeof options.to.y === 'undefined') options.to.y = -BLEED;
		if (typeof options.to.t === 'undefined') options.to.t = 20;
		if (typeof options.onUpdate === 'undefined') options.onUpdate = noop;

		return options;
	}

	function grid(section, canvas, options) {
		var i;
		var ctx = canvas.getContext('2d');
		var end = ((canvas.width > canvas.height) ? canvas.width : canvas.height) + BLEED * 2;

		options = defaults(options);

		var tween = new TWEEN.Tween(options.from)
			.to(options.to, options.time || TIME)
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

				options.onUpdate.call(this);
			})
			.start();

		function animate() {
			section.raf = requestAnimationFrame(animate);
			grid.TWEEN.update();
		}

		animate();

		return animate;
	}

	grid.TWEEN = TWEEN;

	return grid;

});

