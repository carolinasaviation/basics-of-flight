define([
	'./_page',
	'../forces/weight',
	'../forces/lift',
	'../forces/drag',
	'../forces/thrust',
	'../lib/animations',
], function(Page, weight, lift, drag, thrust, draw) {

	var html = '<img src="/images/plane.png" style="-webkit-transform: translate(0px,0px)">';
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
		 [25, '-webkit-transform: translate(0,30px)'],
		 [50, '-webkit-transform: translate(0,0px)'],
		 [75, '-webkit-transform: translate(0,-30px)']
		]);
	}

	return new Forces();
});


