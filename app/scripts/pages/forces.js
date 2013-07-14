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
		this.card.style.position = 'absolute';
		this.card.style.marginTop = '1.5em';
		this.card.style.width = '50%';
		this.card.style.zIndex = '10';
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
			[27, '-webkit-transform: translate(0,30px);'],
			[50, '-webkit-transform: translate(0,0);'],
			[73, '-webkit-transform: translate(0,-30px);']
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
		circles = new Array(num);
		while (num--)
			circles[num] = new Path.Circle({
					center: [state.rand(-10, config.width), state.rand(-10, config.height)],
					radius: state.rand(3, 6),
					fillColor: new Color(255,255,255),
					// opacity greatly reduces frame rate on tablets
					// strokeColor: new Color(255,255,255,0.3), strokeWidth: 5
				});

		var w = view.viewSize.width;
		var h = view.viewSize.height;
		function onFrame(event) {
			if (config.fps) config.fps(event.delta);

			circles.forEach(function(c, i) {
				if (c.position.x > w) c.position.x = -10;
				if (c.position.y < 0) c.position.y = h + 10;
				c.position.x += state.rand(2, 4);
				c.position.y -= state.rand(1, 3);
			});
		}

		function onResize() {
			w = view.viewSize.width;
			h = view.viewSize.height;
		}
	}

	return new Forces();
});


