define(['../lib/section'], function(Section) {

	var html = [
		'<div class="card">',
			'<h1>', i18n.lift.title, '</h1>',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', i18n.lift.equation, '</div>',
					'<div class="col" style="width: 80%">', i18n.lift.equationDescription, '</div>',
				'</div>',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', '<img src="images/', i18n.lift.historicalFigure, '" />', '</div>',
					'<div class="col" style="width: 80%">', i18n.lift.historicalDescription, '</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-interaction" data-action="startInteraction"></button>',
			'</div>',
		'</div>'
	].join('');


	function Lift(html) {
		Section.call(this, html);
	}

	Lift.prototype = Object.create(Section.prototype);

	Lift.prototype.constructor = Lift;

	return new Lift(html);
});
