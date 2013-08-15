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
					{[ obj.questions.forEach(function(q, i) { ]}
						<div class="col question" style="width:80%;display: {{ i === 0 ? 'block' : 'none' }}">
							<p>{{ q.question }}</p>
							<ol>
							{[ q.answers.forEach(function(a) { ]}
								<li>{{ a }}</li>
							{[ }); ]}
							</ol>
						</div>
					{[ }); ]}
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




