define(['./template'], function(template) {
	'use strict';

	var card = function() {/***
		<div class="card">
			<div class="card-content">
				<h1>{! title !}</h1>
			</div>
			<div class="card-secondary">
				<button class="btn btn-quiz" data-action="startQuiz">
					<img src="images/throwaway-quiz.png" alt="Take quiz">
				</button>
		  </div>
			<div class="card-secondary">
				<button class="btn btn-science" data-action="startScience">
					<img src="images/throwaway-science.png" alt="Science!">
				</button>
		  </div>
			<div class="card-secondary">
				<button class="btn btn-history" data-action="startHistory">
					<img src="images/throwaway-history.png" alt="History!">
				</button>
		  </div>
			<div class="card-secondary">
				<button class="btn btn-film" data-action="startFilm">Play Film</button>
			</div>
		</div>
	 ***/
	};

	return template(card);
});


