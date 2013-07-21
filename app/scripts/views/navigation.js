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

	var FN_REPLACER = /[^]*\/\*([^]*)\*\/\}$/;
	var TMPL_MINIFIER = /[>|}](\s+)[<|{]/gm;
	function toString(fn) {
		return fn.toString().match(FN_REPLACER)[1].replace(TMPL_MINIFIER, function(m, p1, i) {
			return m.replace(p1, '');
		}).trim();
	}

	var tmpl = toString(function() {/*
		<nav class="nav">
			<ul>
				{[ _.forEach(pages, function(page) { ]}
					<li class="nav-item-container">
						<a class="nav-item" href="#/{{ page.name }}">
							<img class="nav-image" src="images/proto-nav-{{ page.name }}.png">
							<span class="nav-text">{{ page.name }}</span>
						</a>
						<ul class="subnav">
							{[ _.forEach(page.sections, function(section) { ]}
								<li class="subnav-item-container"><a class="subnav-item" href="{{ (section.name || section) }}">{{ section.name || section }}</a></li>
							{[ }); ]}
						</ul>
				 </li>
				{[ }); ]}
			</ul>
		</nav>
	*/});

	return _.template(tmpl);
});
