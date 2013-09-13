define(['./template'], function(template) {
	'use strict';

	var tmpl = function() {/***
		<nav class="nav">
			<ul>
				{[ _.forEach(pages, function(page) { ]}
					<li class="nav-item-container">
						<a class="nav-item" href="#/{{ page.name.toLowerCase() }}">
							<img class="nav-image" src="images/proto-nav-{{ page.name.toLowerCase() }}.png">
							<span class="nav-text">{{ page.name }}</span>
						</a>
						<ul class="subnav">
							{[ _.forEach(page.sections, function(section) { ]}
								<li class="subnav-item-container"><a class="subnav-item" href="{{ (section.name || section).toLowerCase() }}">{{ section.name || section }}</a></li>
							{[ }); ]}
						</ul>
				 </li>
				{[ }); ]}
			</ul>
		</nav>
	***/
	};

	return template(tmpl);
});
