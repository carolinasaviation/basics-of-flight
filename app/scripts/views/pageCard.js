define(['lodash'], function(_) {
	'use strict';

	// Use mustache-style templating in underscore (escaping by default)
	// evaluate: {[ for (var key in obj) { ]}
	// interpolate: {! firstName !}
	// escape: {{ firstName }}

	_.templateSettings = {
		evaluate : /\{\[([\s\S]+?)\]\}/g,
		interpolate : /\{\!(.+?)\!\}/g,
		escape: /\{\{(.+?)\}\}/g
	};

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



