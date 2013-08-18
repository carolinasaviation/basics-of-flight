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

	// FF adds \n"use strict";\n to the inside of functions when toString'd
	// so we match that if needed
	var FN_REPLACER = /^function[\w\s()]*{[\s?"use strict";\s?]*?\/\s*\*{3}([^]*)\*{3}\//;
	var TMPL_MINIFIER = /[>|}](\s+)[<|{]/gm;
	function toString(fn) {
		return fn.toString().match(FN_REPLACER)[1].replace(TMPL_MINIFIER, function(m, p1) {
			return m.replace(p1, '');
		}).trim();
	}

	return function(fn) {
		return _.template(toString(fn));
	};
});

