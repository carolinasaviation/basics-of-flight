define(['lodash'], function(_) {
	// Use mustache-style templating in underscore (escaping by default)
	// evaluate: {[ for (var key in obj) { ]}
	// interpolate: {! firstName !}
	// escape: {{ firstName }}

	_.templateSettings = {
		evaluate : /\{\[([\s\S]+?)\]\}/g,
		interpolate : /\{\!(.+?)\!\}/g,
		escape: /\{\{(.+?)\}\}/g
	};

	var tmpl = [
		'<nav class="nav">',
			'{[ _.forEach(pages, function(page) { ]}',
				'<a class="nav-item" href="#/{{ page.toLowerCase() }}">',
					'<img class="nav-image" src="images/proto-nav-{{ page.toLowerCase() }}.png">',
					'<span class="nav-text">{{ page }}</span>',
				'</a>',
			'{[ }); ]}',
		'</nav>'
	].join('');

	return _.template(tmpl);
});
