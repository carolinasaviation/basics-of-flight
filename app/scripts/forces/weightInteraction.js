define([
	'../lib/helpers',
	'../i18n/en',
	'../views/display',
	'../lib/quiz',
	'../lib/convert',
], function(helper, i18n, display, Quiz, convert) {

	window.state || (window.state = {});
	var range = document.createElement('input');

	function limit(val, min, max) {
		return Math.max(Math.min(val, max), min);
	}

	function scale(percentage, min, max) {
		if (percentage > 1) percentage /= 100;
		return limit((+percentage) * (max - min) + min, min, max);
	}

	display = display.register({
		prefix: 'weight-interaction',
		options: [
			{
				title: 'Altitude',
				value: undefined,
				calculate: function(p) {
					return scale(p, 5000, 10000);
				},
				format: function() { return ' ft' }
			},
			{
				title: 'Speed',
				value: undefined,
				calculate: function(p) { return 3200; },
				format: function() { return ' m/hr' }
			},
			/*
			{
				title: 'Gravity',
				value: undefined,
				calculate: function(p) { return 700; },
				format: function() { return ' Newtons' }
			},
		 */
			{
				title: 'Weight',
				value: undefined,
				calculate: function(p) {
					return scale(p, 600, 1500);
				},
				format: function() { return ' lbs'; }
			},
			{
				title: 'range',
				value: undefined,
				renderable: false,
				sync: function(prefix, value) {
					if (!s) return;
					s.data.altitude =
					s.data.speed =
					s.data.gravity =
					s.data.weight = value;
				}
			}
		]
	});

	var s = window.state.WEIGHT_INTERACTIVE = {
		SPEED: 100,
		xDiff: 0,
		yDiff: 0,
		CESSNA_SIN_MULTIPLIER: 4,
		CESSNA_SIN_ADDITIVE: 0.04,
		range: range,
		isFirstTime: true,
		displayEl: display.el,
		data: display.data
	};

	range.setAttribute('type', 'range');
	range.setAttribute('min', 0);
	range.setAttribute('max', 100);
	range.setAttribute('step', 1);

	var oldValue = range.value;
	range.addEventListener('change', function(e) {
		s.data.range = this.value;
	}, false);

	var quiz = new Quiz();
	i18n.weight.quiz.forEach(quiz.addQuestion.bind(quiz));

	return {
		quiz: quiz.render(),
		setup: function(canvas) {
			canvas.id = 'weightInteraction';
			canvas.setAttribute('data-paper-resize', 'true');
			canvas.classList.add('hardware-hack');
			canvas.style.backgroundColor = '#000';
			canvas.style.top =
				canvas.style.left =
				canvas.style.right =
				0;
			canvas.style.zIndex = 2;
		},

		paperScript: paperScript
	}

	function paperScript() {
		var w = view.element.width;

		var s = window.state.WEIGHT_INTERACTIVE;
		if (s.isFirstTime) {
			s.isFirstTime = false;
			view.element.parentNode.insertBefore(s.range, view.element);
			view.element.parentNode.insertBefore(s.displayEl, view.element);
		}

		var lines = [], line;
		var top = new Point(0, 0);
		var bottom = new Point(0, view.element.height);
		var offset = 0;
		var color;

		while (offset < w) {
			offset += 20;
			top.x = offset;
			bottom.x = offset;
			line = new Path.Line(top, bottom);
			line.speed = 4;
			color = state.rand(50, 135) / 255;
			line.strokeColor = new Color(color, color, color);
			line.strokeWidth = 2;
			lines.push(line);
		}

		var activeLayer = this.project.activeLayer;
		//var cessnaLayer = new Layer();
		//var cessna = project.importSVG(document.getElementById('cessna-elevation'));

		//cessna.position.x = 400;
		//cessna.position.y = 400;

		var angle = -Math.PI;
		var frame = 0;
		this.project.activeLayer = activeLayer;

		window.myPaperScript = this;

		function onFrame(event) {
			if (!lines) return;
			if (config.fps) config.fps(event.delta);

			var w = view._element.width;
			lines.forEach(function(l) {
				l.position.x += l.speed * 50 / state.WEIGHT_INTERACTIVE.SPEED;
				if (l.position.x > w) l.position.x = -10;
			});

			//cessna.position.y = Math.floor(state.WEIGHT_INTERACTIVE.CESSNA_SIN_MULTIPLIER * Math.sin(frame) + 330) || 0;
			//if (frame > 100) frame = 0;
			//frame += state.WEIGHT_INTERACTIVE.CESSNA_SIN_ADDITIVE;
		};

		function resize() {
			w = view.element.width;
		}
	}
});
