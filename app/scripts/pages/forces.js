define([
	'./_page',
	'../forces/weight',
	'../forces/lift',
	'../forces/drag',
	'../forces/thrust',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Page, weight, lift, drag, thrust, draw, helper, paper) {

	window.state || (window.state = {});
	window.state.FORCES = {
		NUMBER_OF_PARTICLES: 30,
		CESSNA_SIN_MULTIPLIER: 40,
		CESSNA_SIN_ADDITIVE: 0.04,
	};

	var image = '<img src="images/cessna-isometric.svg" style="position:relative;z-index:1;-webkit-transform: translate(0,0)">';
	var card = [
		'<div class="card">',
			'<div class="card-primary">',
				'<h1>', i18n.forces.title, '</h1>',
				'<p>', i18n.forces.description, '</p>',
			'</div>',
		'</div>'
	].join('');

	function Forces() {
		Page.call(this);

		this.sections = [
			weight, lift, drag, thrust
		];
	}

	Forces.prototype = Object.create(Page.prototype);

	Forces.prototype.constructor = Forces;
	Forces.prototype.init = function() {
		Page.prototype.init.call(this);
		this.card = helper.createDomNode(card);
		this.card.classList.add('card-main')
		this.element.appendChild(this.card);
		this.element.appendChild(helper.createDomNode(image));

		var canvas = this.canvas = document.createElement('canvas');
		canvas.setAttribute('data-paper-resize', 'true');
		canvas.style.position = 'absolute';
		canvas.style.top = 0;
		canvas.style.left = 0;

		weight.page(this);
		lift.page(this);
		drag.page(this);
		thrust.page(this);
	};

	Forces.prototype.onLoad = function() {
		Page.prototype.onLoad.call(this);

		var element = this.element.querySelector('img');
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
		Page.prototype.activate.call(this);
		this.element.appendChild(this.canvas);

		var scope = helper.createPaperScript(this.canvas, paperScript)
		if (config.logger.paperjsScope) config.logger.paperjsScopeFn.call(this, this.canvas.id);
	};

	Forces.prototype.deactivate = function() {
		Page.prototype.deactivate.call(this);
		//paper.clear();
		this.element.removeChild(this.canvas);
	};


	function paperScript() {
		var num = state.FORCES.NUMBER_OF_PARTICLES;
		var w = view.viewSize.width;
		var h = view.viewSize.height;
		var white = new Color(255, 255, 255);
		var weight, lift, drag, thrust;

		lift = createArrow('north');
		weight = createArrow('south');
		thrust = createArrow('west');
		drag = createArrow('east');

		var liftYOffset = lift.position.y;
		var weightYOffset = weight.position.y;
		var thrustYOffset = thrust.position.y;
		var dragYOffset = drag.position.y;

		circles = new Array(num);
		while (num--)
			circles[num] = new Path.Circle({
					center: [state.rand(-10, config.width), state.rand(-10, config.height)],
					radius: state.rand(3, 6),
					fillColor: white,
					// opacity greatly reduces frame rate on tablets
					// strokeColor: new Color(255,255,255,0.3), strokeWidth: 5
				});

		function onFrame(event) {
			if (config.fps) config.fps(event.delta);

			circles.forEach(function(c, i) {
				if (c.position.x > w) c.position.x = -10;
				if (c.position.y < 0) c.position.y = h + 10;
				c.position.x += state.rand(2, 4);
				c.position.y -= state.rand(1, 3);
			});

			//console.log('onFrame', lift);
			var xOffset = Math.cos(event.time / 2) / 4;
			var yOffset = 20 * Math.sin(event.time);
			var longitudalRotation = Math.cos(event.time / 2) * Math.atan2(lift.children[0].position.y, lift.children[0].position.x);
			var latitudalRotation = longitudalRotation / 4;

			lift.children[0]._segments[0].point.x += xOffset
			lift.children[1].position.x += xOffset
			lift.children[1].rotate(longitudalRotation);
			lift.position.y = yOffset + liftYOffset;

			weight.children[0]._segments[1].point.x += xOffset
			weight.children[1].position.x += xOffset
			weight.children[1].rotate(-longitudalRotation);
			weight.position.y = yOffset + weightYOffset;

			thrust.children[0]._segments[1].point.y = -yOffset + thrustYOffset;
			thrust.children[0]._segments[0].point.x += xOffset / 2;
			thrust.children[1].position.x += xOffset / 2;
			thrust.children[1].rotate(latitudalRotation);

			drag.children[0]._segments[1].point.y = -yOffset + dragYOffset;
			drag.children[0]._segments[0].point.x += xOffset / 2;
			drag.children[1].position.y = -yOffset + dragYOffset;
			//drag.children[1].position.x += xOffset / 2;
			drag.children[1].rotate(latitudalRotation);
		}

		function onResize() {
			w = view.viewSize.width;
			h = view.viewSize.height;
		}

		function createArrow(direction) {
			var p1, ps, line, triangle;

			switch (direction) {
			case 'north':
				p1 = new Point(375, 50);
				p2 = new Point(375, 125);
			  line = new Path.Line(p1, p2);
				triangle = new Path.RegularPolygon(p1, 3, 7);
				break;
			case 'south':
				p1 = new Point(375, 350);
				p2 = new Point(375, 425);
			  line = new Path.Line(p1, p2);
				triangle = new Path.RegularPolygon(p2, 3, 7);
				triangle.rotate(180)
				break;
			case 'east':
				p1 = new Point(575, 150);
				p2 = new Point(670, 150);
			  line = new Path.Line(p1, p2);
				triangle = new Path.RegularPolygon(p2, 3, 7);
				triangle.position.y += 2;
				triangle.rotate(90)
				break;
			case 'west':
				p1 = new Point(100, 350);
				p2 = new Point(200, 350);
			  line = new Path.Line(p1, p2);
				triangle = new Path.RegularPolygon(p1, 3, 7);
				triangle.position.y += 1;
				triangle.rotate(-90)
				break;
			}

			line.strokeWidth = 2;
			line.fillColor = white;
			line.strokeColor = white;
			triangle.fillColor = white;
			var g = new Group([line, triangle]);
			return g
		}
	}

	return new Forces();
});


