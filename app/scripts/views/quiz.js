define(['./template'], function(template) {
	'use strict';

	var quiz = function() {/***
		<div class="card">
			<div class="card-primary">
				<div>
					<div class="col col-equation" style="width: 20%">
						<h3>{{ obj.correctAnswers }}</h3>
						<span data-bind="correctAnswers"></span>
					</div>
					<div class="col question" style="width:80%">
						<p>What must the pilot do to bring the aircraft back to a balanced flight speed?</p>
						<ol>
							<li>Increase thrust</li>
							<li>Slow down</li>
							<li>Point the aircraft downwards</li>
						</ol>
					</div>
				</div>
			</div>
			<div class="card-secondary">
				<button class="btn btn-interaction" data-action="stopInteraction"></button>
			</div>
		</div>
	***/
	};

	return template(quiz);
});




