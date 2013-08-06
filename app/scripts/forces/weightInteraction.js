define([
	'../lib/helpers',
	'../i18n/en',
	'../views/display',
	'../views/quiz',
], function(helper, i18n, display, quiz) {

	window.state || (window.state = {});
	var range = document.createElement('input');

	display = display.register({
		prefix: 'weight-interaction',
		options: [
			{
				title: 'Altitude',
				value: 7500,
				format: function() {
					return this.value + ' ft'
				}
			},
			{
				title: 'Speed',
				value: 3200,
				format: function() {
					return this.value + ' m/hr'
				}
			},
			{
				title: 'Gravity',
				value: 700,
				format: function() {
					return this.value + ' Newtons'
				}
			},
			{
				title: 'Weight',
				value: 990,
				format: function() {
					return this.value + ' lbs';
				}
			}
		]
	});

	window.state.WEIGHT_INTERACTIVE = {
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
		var s = window.state.WEIGHT_INTERACTIVE.data;
		var d = 1
		if (oldValue < this.value) d = -1;
		d = d * 10;

		s.altitude = parseInt(s.altitude, 10) + d;
		s.speed = parseInt(s.altitude, 10) + d;
		s.gravity = parseInt(s.gravity, 10) + d;
	}, false);

	return {
		quiz: helper.createDomNode(quiz(i18n.quiz)),
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

		var cessna = project.importSVG(document.getElementById('cessna-elevation'));

		cessna.position.x = 400;
		cessna.position.y = 400;

		var angle = -Math.PI;
		var frame = 0;

		function onFrame(event) {
			if (!lines) return;
			if (config.fps) config.fps(event.delta);

			var w = view._element.width;
			lines.forEach(function(l) {
				l.position.x += l.speed * 50 / state.WEIGHT_INTERACTIVE.SPEED;
				if (l.position.x > w) l.position.x = -10;
			});

			cessna.position.y = Math.floor(state.WEIGHT_INTERACTIVE.CESSNA_SIN_MULTIPLIER * Math.sin(frame) + 330) || 0;
			if (frame > 100) frame = 0;
			frame += state.WEIGHT_INTERACTIVE.CESSNA_SIN_ADDITIVE;

		};

		function resize() {
			w = view.element.width;
		}
	}
});
