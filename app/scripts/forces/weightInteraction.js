define([
	'../lib/helpers',
], function(helper) {

	window.state || (window.state = {});
	window.state.WEIGHT_INTERACTIVE = {
		SPEED: 100,
		xDiff: 0,
		yDiff: 0,
		CESSNA_SIN_MULTIPLIER: 4,
		CESSNA_SIN_ADDITIVE: 0.04
	}

	var quiz = [
		'<div class="card">',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">',
						'<h3>', i18n.quiz.correctAnswers, '</h3>',
						'<span data-bind="correctAnswers"></span>',
					'</div>',
					'<div class="col question" style="width:80%">',
						'<p>What must the pilot do to bring the aircraft back to a balanced flight speed?</p>',
						'<ol>',
							'<li>Increase thrust</li>',
							'<li>Slow down</li>',
							'<li>Point the aircraft downwards</li>',
						'</ol>',
					'</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-weight-interaction" data-action="stopInteraction"></button>',
			'</div>',
		'</div>'
	].join('');


	return {
		quiz: helper.createDomNode(quiz),
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

	function intro(callback) {
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

	function paperScript() {
		var w = view.element.width;

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

		var point = new Point(0, 548);
		var size = new Size(320, 40);
		var weightBar = new Shape.Rectangle(point, size);
		weightBar.fillColor = '#f0402a';

		var wbBg = new Shape.Rectangle(point, new Size(520, 40));
		wbBg.fillColor = '#fff';

		var weightBarGroup = new Group();
		weightBarGroup.addChild(wbBg);
		weightBarGroup.addChild(weightBar);

		var angle = -Math.PI;
		var frame = 0;

		var textGroup = new Group();
		var text = [];
		[
			i18n.altitude,
			i18n.speed,
			i18n.gravity
		].map(function(s) { return s.toUpperCase(); })
		.forEach(function(title, i) {
			var t = new PointText(new Point(0, 32 * i));
			text.push(new Point(100, 32 * i));
			t.content = title;
			t.fillColor = '#fff';
			t.fontSize = 14;
			textGroup.addChild(t);
		});

		var currentAltitude = new PointText(text[0]);
		var currentSpeed = new PointText(text[1]);
		var currentGravity = new PointText(text[2]);

		[currentAltitude, currentSpeed, currentGravity].forEach(function(t, i) {
			t.fillColor = '#fff';
			t.fontWeight = 'bold';
			t.fontSize = 16;
			textGroup.addChild(t);
		});

		var currentWeight = new PointText(new Point(100, text[2] + 32));
		currentWeight.fillColor = '#feec09';
		currentWeight.fontSize = 18;
		currentWeight.fontWeight = 'bold';
		textGroup.addChild(currentWeight);

		textGroup.position.x = w - 200;
		textGroup.position.y = 500;

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

			currentAltitude.content = '7,500 ft';
			currentSpeed.content = '200m/hr';
			currentGravity.content = '3920 Newtons';
			currentWeight.content = '990Lbs';
		};

		function resize() {
			w = view.element.width;
		}
	}
});
