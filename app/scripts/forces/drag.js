define(['../lib/section'], function(Section) {
	'use strict';

	var html = [
		'<div class="card">',
			'<h1>', i18n.drag.title, '</h1>',
			'<div class="card-primary">',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', i18n.drag.equation, '</div>',
					'<div class="col" style="width: 80%">', i18n.drag.equationDescription, '</div>',
				'</div>',
				'<div>',
					'<div class="col col-equation" style="width: 20%">', '<img src="images/', i18n.drag.historicalFigure, '" />', '</div>',
					'<div class="col" style="width: 80%">', i18n.drag.historicalDescription, '</div>',
				'</div>',
			'</div>',
			'<div class="card-secondary">',
				'<button class="btn btn-interaction" data-action="startInteraction"></button>',
			'</div>',
		'</div>'
	].join('');

	function Drag(html) {
		Section.call(this, html);
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	return new Drag(html);
});
