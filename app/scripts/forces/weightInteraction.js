define([
	'../lib/helpers',
	'../i18n/en',
	'../views/display',
	'../lib/convert',
], function(helper, i18n, display, convert) {
	'use strict';

	window.state || (window.state = {});

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.weight,
		min: 0,
		max: 100,
		step: 1,
		state: s,
		bindings: {
			prefix: 'weight-interaction',
			options: [
				{
					title: i18n.t.altitude,
					value: undefined,
					calculate: function(p) {
						return scale(p, 5000, 10000);
					},
					format: function() { return ' ft' }
				},
				{
					title: i18n.t.speed,
					value: undefined,
					calculate: function(p) { return 3200; },
					format: function() { return ' m/hr' }
				},
				{
					title: i18n.t.weight,
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
						s.data.weight = value;
					}
				}
			]
		}
	});

	var s = window.state.WEIGHT_INTERACTIVE = {
		SPEED: 100,
		xDiff: 0,
		yDiff: 0,
		CESSNA_SIN_MULTIPLIER: 4,
		CESSNA_SIN_ADDITIVE: 0.04,
		isFirstTime: true,
		el: bindings.el,
		data: bindings.data,
		granger: bindings.granger
	};

	function paperScript() {
		var w = view.element.width;

		var s = window.state.WEIGHT_INTERACTIVE;
		if (s.isFirstTime) {
			s.isFirstTime = false;
			view.element.parentNode.insertBefore(s.el, view.element);
			s.granger.sync();
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

	return { paperScript: paperScript }

});
