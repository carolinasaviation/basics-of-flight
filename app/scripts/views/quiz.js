define(['./template'], function(template) {
	'use strict';

	var quiz = function() {/***
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
					{[ q.answers.forEach(function(a, ai) { ]}
						<li>
							<input value={{ ai }} type="radio" id="quiz__input-{{ '' + i + ai }}-{{ a.replace(/\s+/g, '').toLowerCase() }}"
								name="quiz__input-{{ i }}">
							<label for="quiz__input-{{ '' + i + ai }}-{{ a.replace(/\s+/g, '').toLowerCase() }}">{{ a }}</label>
						</li>
					{[ }); ]}
					</ol>
				</div>
			{[ }); ]}
		</div>
	***/
	};

	return template(quiz);
});




