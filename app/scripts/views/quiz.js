define(['./template'], function(template) {
	'use strict';

	var quiz = function() {/***
		<div class="card">
			<div class="card-primary">
				<div>
					<div class="col col__quiz-equation" style="width: 20%">
						<h3 class="quiz__correct-title">{{ obj.correctAnswers }}</h3>
						<div class="quiz__correct">
							<span class="quiz__correct-count"></span>
							<span class="quiz__correct-total"></span>
						</div>
					</div>
					{[ obj.questions.forEach(function(q, i) { ]}
						<div class="col col__quiz-question col__quiz-question--{{ q.isActive ? 'active' : 'inactive' }}">
							<p>{{ q.question }}</p>
							<ol class="quiz__answer-list">
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




