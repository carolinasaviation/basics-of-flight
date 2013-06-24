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
		'<nav class="subnav">',
			'{[ _.forEach(sections, function(section) { ]}',
				'<a class="subnav-item" href="{{ (section.name || section).toLowerCase() }}">{{ section.name || section }}</a>',
			'{[ }); ]}',
		'</nav>'
	].join('');

	return _.template(tmpl);
});
