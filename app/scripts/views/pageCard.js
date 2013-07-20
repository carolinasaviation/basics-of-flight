define(['lodash'], function(_) {
	'use strict';

	var card = [
		'<div class="card">',
			'<div class="card-primary">',
				'<h1>{{ title }}</h1>',
				'<p>{{ description }}</p>',
			'</div>',
		'</div>'
	].join('');

	return _.template(card);
});



