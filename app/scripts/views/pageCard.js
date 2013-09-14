define(['./template'], function(template) {
	'use strict';

	var card = function() {/***
		<div class="card">
			<div class="card-primary">
				<h1>{{ title }}</h1>
				{! description !}
			</div>
		</div>
	***/
	};

	return template(card);
});



