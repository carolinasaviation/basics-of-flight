define(['./template'], function(template) {
	'use strict';

	var quiz = function() {/***
		<div>
			{[ obj.questions.forEach(function(q, i) { ]}
			<div class="col col__quiz-question col__quiz-question--{{ q.isActive ? 'active' : 'inactive' }}">
				<p>{{ q.question }}</p>
				<div style="position:relative">
					<ol class="quiz__answer-list">
					{[ q.answers.forEach(function(a, ai) { ]}
						<li>
							<input value={{ ai }} type="radio" id="quiz__input-{{ '' + i + ai }}-{{ a.replace(/\s+/g, '').toLowerCase() }}"
								name="quiz__input-{{ i }}">
							<label for="quiz__input-{{ '' + i + ai }}-{{ a.replace(/\s+/g, '').toLowerCase() }}">{{ a }}</label>
						</li>
					{[ }); ]}
					</ol>
					<button class="quiz__submit">Submit</button>
				</div>
			</div>
			{[ }); ]}
			<div class="col col__quiz-result col__quiz-result--success">
		  </div>
			<div class="col col__quiz-result col__quiz-result--error">
		  </div>
		</div>
	***/
	};

	return template(quiz);
});




