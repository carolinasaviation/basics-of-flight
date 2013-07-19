define(['../lib/section'], function(Section) {
	'use strict';

	var html = [
		'<div class="card">',
			'<h1>', i18n.thrust.title, '</h1>',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', i18n.thrust.equation, '</div>',
					'<div class="col" style="width: 80%">', i18n.thrust.equationDescription, '</div>',
				'</div>',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', '<img src="images/', i18n.thrust.historicalFigure, '" />', '</div>',
					'<div class="col" style="width: 80%">', i18n.thrust.historicalDescription, '</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-interaction" data-action="startInteraction"></button>',
			'</div>',
		'</div>'
	].join('');

	function Thrust(html) {
		Section.call(this, html);
	}

	Thrust.prototype = Object.create(Section.prototype);

	Thrust.prototype.constructor = Thrust;

	return new Thrust(html);
});
