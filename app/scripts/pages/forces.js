define([
	'./_page',
	'../forces/weight',
	'../forces/lift',
	'../forces/drag',
	'../forces/thrust',
	'../lib/animations',
	'paper',
], function(Page, weight, lift, drag, thrust, draw, paper) {

	var html = '<img src="images/cessna-isometric.svg" style="position:relative;z-index:1;-webkit-transform: translate(0px,0px)">';
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
		this.card = config.createDomNode(card);
		this.card.style.position = 'absolute';
		this.card.style.marginTop = '1.5em';
		this.card.style.width = '50%';
		this.card.style.zIndex = '10';
		this.element.appendChild(this.card);
		this.element.appendChild(config.createDomNode(html));

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
		//this.play(this.element.querySelector('img'), { });
		var element = this.element.querySelector('img');

		draw.createAnimation(element, '3s linear infinite', [
		 [0, '-webkit-transform: translate(0,0);'],
		 [27, '-webkit-transform: translate(0,30px)'],
		 [50, '-webkit-transform: translate(0,0px)'],
		 [73, '-webkit-transform: translate(0,-30px)']
		]);

		// temp!
		this.activate();
	};

	Forces.prototype.activate = function() {
		Page.prototype.activate.call(this);
		this.element.appendChild(this.canvas);

		if (window.view && view._element === this.canvas) return;

		paper.install(window);
		paper.setup(this.canvas);
		var num = 100;
		circles = new Array(100);
		while (num--)
			circles[num] = new paper.Path.Circle({
					center: [rand(-10, config.width), rand(-10, config.height)],
					radius: rand(3, 6),
					fillColor: new paper.Color(255,255,255),
					strokeColor: new paper.Color(255,255,255,0.3),
					strokeWidth: 5
				});

		view.onFrame = onFrame;
		var w = view.viewSize.width;
		var h = view.viewSize.height;
		function onFrame(event) {
			circles.forEach(function(c, i) {
				if (c.position.x > w) c.position.x = -10;
				if (c.position.y < 0) c.position.y = h + 10;
				c.position.x += rand(3, 5);
				c.position.y -= rand(1, 3);
			});
		}
	};

	Forces.prototype.deactivate = function() {
		Page.prototype.deactivate.call(this);
		project.remove();
		this.element.removeChild(this.canvas);
	};

	function rand(min, max, isFloat) {
		var rand = Math.random();
		return Math.floor(max * rand) + min;
	}

	return new Forces();
});


