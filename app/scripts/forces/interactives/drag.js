define([
	'../../lib/helpers',
	'../../i18n/en',
	'../../views/display'
], function(helper, i18n, display) {
	'use strict';

	window.state || (window.state = {});

	var scale = helper.scale;

	var bindings = display.create({
		title: i18n.t.drag,
		min: 0,
		max: 100,
		step: 1,
		state: s,
		bindings: {
			prefix: 'drag-interaction',
			options: [
				{
					title: i18n.t.altitude,
					calculate: function(p) {
						return scale(p, 5000, 10000);
					},
					format: function() { return ' ft' }
				},
				{
					title: i18n.t.speed,
					calculate: function(p) { return 3200; },
					format: function() { return ' m/hr' }
				},
				{
					title: i18n.t.drag,
					calculate: function(p) {
						return scale(p, 600, 1500);
					},
					format: function() { return ' coeffecient'; }
				},
				{
					title: 'range',
					renderable: false,
					sync: function(prefix, value) {
						if (!s) return;
						s.data.altitude =
						s.data.speed =
						s.data.drag = value;
					}
				}
			]
		}
	});

	var s = window.state.DRAG_INTERACTIVE = {
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

	function paperscript() {

		var s = window.state.DRAG_INTERACTIVE;
		if (s.isFirstTime) {
			s.isFirstTime = false;
			view.element.parentNode.insertBefore(s.el, view.element);
			s.granger.sync();
		}

		// Code ported to Paper.js from http://the389.com/9/1/
		// with permission.

		var values = {
			friction: 0.8,
			timeStep: 0.01,
			amount: 15,
			mass: 2,
			count: 0
		};
		values.invMass = 1 / values.mass;

		var path, springs;
		var size = view.size * [1.2, 1];

		var Spring = function(a, b, strength, restLength) {
			this.a = a;
			this.b = b;
			this.restLength = restLength || 80;
			this.strength = strength ? strength : 0.55;
			this.mamb = values.invMass * values.invMass;
		};

		Spring.prototype.update = function() {
			var delta = this.b - this.a;
			var dist = delta.length;
			var normDistStrength = (dist - this.restLength) /
					(dist * this.mamb) * this.strength;
			delta.y *= normDistStrength * values.invMass * 0.2;
			if (!this.a.fixed)
				this.a.y += delta.y;
			if (!this.b.fixed)
				this.b.y -= delta.y;
		};


		function createPath(strength) {
			var path = new Path({
				fillColor: 'red'
			});
			springs = [];
			for (var i = 0; i <= values.amount; i++) {
				var segment = path.add(new Point(i / values.amount, 0.5) * size);
				var point = segment.point;
				if (i == 0 || i == values.amount)
					point.y += size.height;
				point.px = point.x;
				point.py = point.y;
				// The first two and last two points are fixed:
				point.fixed = i < 2 || i > values.amount - 2;
				if (i > 0) {
					var spring = new Spring(segment.previous.point, point, strength);
					springs.push(spring);
				}
			}
			path.position.x -= size.width / 4;
			return path;
		}

		function onResize() {
			if (path)
				path.remove();
			size = view.bounds.size * [2, 1];
			path = createPath(0.1);
		}

		function onMouseMove(event) {
			var location = path.getNearestLocation(event.point);
			var segment = location.segment;
			var point = segment.point;

			if (!point.fixed && location.distance < size.height / 4) {
				var y = event.point.y;
				point.y += (y - point.y) / 6;
				if (segment.previous && !segment.previous.fixed) {
					var previous = segment.previous.point;
					previous.y += (y - previous.y) / 24;
				}
				if (segment.next && !segment.next.fixed) {
					var next = segment.next.point;
					next.y += (y - next.y) / 24;
				}
			}
		}

		function onFrame(event) {
			updateWave(path);
		}

		function updateWave(path) {
			var force = 1 - values.friction * values.timeStep * values.timeStep;
			for (var i = 0, l = path.segments.length; i < l; i++) {
				var point = path.segments[i].point;
				var dy = (point.y - point.py) * force;
				point.py = point.y;
				point.y = Math.max(point.y + dy, 0);
			}

			for (var j = 0, l = springs.length; j < l; j++) {
				springs[j].update();
			}
			path.smooth();
		}

		function onKeyDown(event) {
			if (event.key == 'space') {
				path.fullySelected = !path.fullySelected;
				path.fillColor = path.fullySelected ? null : 'black';
			}
		}
	}

	return { paperScript: paperscript }

});