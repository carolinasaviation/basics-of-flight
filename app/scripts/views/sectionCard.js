define(['./template'], function(template) {
	'use strict';

	var card = function() {/***
		<div class="card">
			<div class="card-content">
				<h1>{! introduction.title !}</h1>
				{! introduction.description !}
			</div>
			<div class="card-secondary">
				<button class="btn btn-quiz" data-action="startQuiz">
					<svg version="1.1" class="icon-quiz" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.866px" height="70.866px" viewBox="0 0 70.866 70.866" enable-background="new 0 0 70.866 70.866" xml:space="preserve"><g><path fill="none" stroke="#ED1C24" stroke-width="1.7" stroke-miterlimit="10" d="M42.007,32.196c-0.753,1.073-2.352,3.159-3.009,4.293c-0.508,0.877-1.114,2.307-1.127,2.961c-0.008,0.396,0.058,1.525-0.2,1.57c-1.271,0.22-5.585,0.679-6.018-0.071c-0.409-0.708,0.013-3.958,1.833-6.957l3.427-4.739c0.741-1.047,1.343-2.245,1.343-3.341c0-2.346-1.458-4.408-3.751-4.091c-3.172,0.439-3.175,3.232-3.759,5.031c-0.255,0.786-5.914,1.077-5.978-0.427c-0.281-6.62,4.366-10.44,9.737-10.44c5.233,0,9.772,3.642,9.772,9.977C44.276,28.456,43.302,30.35,42.007,32.196z M31.551,52.525c-0.39-0.714-0.21-4.802-0.043-6.173c0.065-0.54,6.263-0.707,6.48-0.134c0.524,1.383,0.348,5.867,0,6.402C37.707,53.052,31.812,53.002,31.551,52.525z"/></g>
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


