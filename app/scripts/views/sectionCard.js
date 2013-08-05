define(['./template'], function(template) {
	'use strict';

	var card = function() {/***
		<div class="card">
			<h1>{{ title }}</h1>
			<div class="card-primary">
				<div>
					<div class="col col-equation" style="width: 20%">{{ equation }}</div>
					<div class="col" style="width: 80%">{{ equationDescription }}</div>
				</div>
				<div>
					<div class="col col-equation" style="width: 20%">', '<img src="images/{{ historicalFigure }}" /></div>
					<div class="col" style="width: 80%">{{ historicalDescription }}</div>
				</div>
			</div>
			<div class="card-secondary">
				'<button class="btn btn-interaction" data-action="startInteraction"></button>
			</div>
		</div>
	 ***/
	};

	return template(card);
});


