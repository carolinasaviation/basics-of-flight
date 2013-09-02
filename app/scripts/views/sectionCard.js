define(['./template'], function(template) {
	'use strict';

	var card = function() {/***
		<div class="card">
			{[ ['introduction', 'quiz', 'science', 'history'].forEach(function(section, i) { ]}
			<div class="card-content {{ i === 0 ? "card-content--active" : "card-content--inactive" }}" data-role="{{ section }}">
				<h1>{! obj[section].title !}</h1>
				{[ if (typeof obj[section].equation !== 'undefined') { ]}
				<div class="card-equation">{! obj[section].equation !}</div>
				{[ } ]}
				{[ if (typeof obj[section].figure !== 'undefined') { ]}
				<div class="card-figure"><img src="images/{{ obj[section].figure }}"></div>
				{[ } ]}
				{! obj[section].description !}
				{[ if (i !== 0) { ]}
				<button class="btn btn-go-back" data-action="show-introduction">Back</button>
				{[ } ]}
			</div>
			{[ }); ]}
			<div class="card-tabs">
				<button class="btn btn-quiz" data-action="show-quiz">
					<svg version="1.1" class="icon-quiz" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="70.866px" height="70.866px" viewBox="0 0 70.866 70.866" enable-background="new 0 0 70.866 70.866" xml:space="preserve"><g><path fill="none" stroke="#ED1C24" stroke-width="1.7" stroke-miterlimit="10" d="M42.007,32.196c-0.753,1.073-2.352,3.159-3.009,4.293c-0.508,0.877-1.114,2.307-1.127,2.961c-0.008,0.396,0.058,1.525-0.2,1.57c-1.271,0.22-5.585,0.679-6.018-0.071c-0.409-0.708,0.013-3.958,1.833-6.957l3.427-4.739c0.741-1.047,1.343-2.245,1.343-3.341c0-2.346-1.458-4.408-3.751-4.091c-3.172,0.439-3.175,3.232-3.759,5.031c-0.255,0.786-5.914,1.077-5.978-0.427c-0.281-6.62,4.366-10.44,9.737-10.44c5.233,0,9.772,3.642,9.772,9.977C44.276,28.456,43.302,30.35,42.007,32.196z M31.551,52.525c-0.39-0.714-0.21-4.802-0.043-6.173c0.065-0.54,6.263-0.707,6.48-0.134c0.524,1.383,0.348,5.867,0,6.402C37.707,53.052,31.812,53.002,31.551,52.525z"/></g>
				</button>
				<button class="btn btn-science" data-action="show-science">
					<svg version="1.1" class="icon-physics" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70.866px" height="70.866px" viewBox="0 0 70.866 70.866" enable-background="new 0 0 70.866 70.866" xml:space="preserve"> <g> <g> <path fill-rule="evenodd" clip-rule="evenodd" fill="#ED1C24" stroke="#ED1C24" stroke-width="0.9" stroke-miterlimit="10" d=" M50.509,48.405c-3.104-0.114-5.693-0.678-8.254-1.398c-0.268-0.075-0.381-0.027-0.416,0.239c-0.015,0.12-0.047,0.238-0.073,0.356 c-0.106,0.466-0.11,0.463-0.565,0.328c-0.195-0.058-0.259-0.127-0.191-0.35c0.081-0.271,0.278-0.599,0.155-0.821 s-0.508-0.208-0.779-0.296c-1.793-0.583-3.541-1.285-5.267-2.045c-0.141-0.061-0.255-0.078-0.402-0.01 c-1.743,0.808-3.543,1.467-5.379,2.029c-0.251,0.077-0.297,0.158-0.234,0.415c0.466,1.933,1.013,3.838,1.848,5.646 c0.571,1.236,1.35,2.312,2.458,3.147c0.912,0.687,1.839,0.744,2.844,0.292c0.644-0.289,1.172-0.724,1.582-1.294 c0.146-0.202,0.26-0.31,0.473-0.092c0.052,0.053,0.132,0.081,0.202,0.112c0.113,0.05,0.155,0.104,0.065,0.224 c-0.969,1.304-2.2,2.136-3.887,2.07c-0.788-0.03-1.409-0.492-2.004-0.965c-1.424-1.134-2.242-2.674-2.878-4.331 c-0.584-1.52-1.054-3.076-1.405-4.667c-0.047-0.209-0.136-0.246-0.336-0.186c-1.707,0.506-3.44,0.895-5.219,1.026 c-1.486,0.109-2.975,0.269-4.468,0.097c-1.065-0.123-2.044-0.471-2.898-1.15c-1.039-0.826-1.365-1.884-1.159-3.171 c0.324-2.012,1.443-3.575,2.758-5.039c0.984-1.095,2.043-2.114,3.154-3.078c0.164-0.142,0.173-0.232-0.005-0.35 c-0.065-0.042-0.116-0.103-0.175-0.155c-0.365-0.327-0.351-0.314-0.021-0.67c0.164-0.178,0.249-0.128,0.392,0.01 c0.546,0.525,0.544,0.515,1.129,0.051c1.778-1.41,3.618-2.733,5.552-3.923c0.215-0.133,0.335-0.277,0.35-0.543 c0.093-1.634,0.296-3.255,0.6-4.862c0.038-0.198-0.029-0.267-0.218-0.316c-2.218-0.575-4.458-1.03-6.75-1.163 c-1.46-0.085-2.883,0.079-4.209,0.778c-1.146,0.605-1.529,1.325-1.426,2.846c0.021,0.31,0.388,1.022,0.388,1.022 s-0.649,0.634-0.715,0.461c-0.29-0.76-0.075-0.071-0.095-0.125c-0.402-1.107-0.502-2.221-0.084-3.35 c0.186-0.502,0.519-0.877,0.948-1.174c1.321-0.912,2.812-1.233,4.391-1.239c1.801-0.006,3.564,0.299,5.321,0.648 c0.805,0.16,1.604,0.342,2.393,0.569c0.19,0.054,0.25,0.022,0.297-0.188c0.473-2.118,1.205-4.144,2.182-6.083 c0.625-1.241,1.449-2.316,2.588-3.128c1.376-0.982,2.964-0.947,4.274,0.131c1.233,1.016,2.074,2.336,2.748,3.766 c0.739,1.569,1.251,3.218,1.666,4.897c0.062,0.249,0.15,0.233,0.335,0.175c0.392-0.123,0.789-0.225,1.181-0.347 c0.158-0.048,0.259-0.052,0.254,0.155c-0.001,0.065,0.021,0.131,0.039,0.196c0.063,0.234-0.005,0.362-0.261,0.416 c-0.358,0.075-0.703,0.201-1.06,0.284c-0.216,0.05-0.249,0.157-0.202,0.354c0.231,0.972,0.409,1.954,0.561,2.94 c0.132,0.846,0.247,1.694,0.304,2.548c0.015,0.217,0.075,0.36,0.28,0.478c2.069,1.174,4.076,2.445,5.965,3.895 c0.118,0.09,0.207,0.13,0.342,0.009c1.688-1.509,3.32-3.071,4.549-4.996c0.479-0.75,0.857-1.551,1.118-2.407 c0.501-1.644-0.146-2.965-1.757-3.573c-0.668-0.252-1.356-0.412-2.062-0.509c-0.201-0.027-0.409-0.53-0.292-0.701 c0.047-0.071,0.118-0.051,0.181-0.043c1.222,0.147,2.418,0.396,3.465,1.081c1.212,0.793,1.708,2.278,1.292,3.739 c-0.483,1.699-1.399,3.156-2.522,4.496c-0.997,1.189-2.101,2.273-3.271,3.289c-0.229,0.198-0.208,0.273,0.009,0.456 c1.824,1.529,3.482,3.22,4.869,5.159c0.771,1.078,1.301,2.271,1.495,3.592c0.24,1.625-0.609,3.047-2.165,3.641 C53.006,48.262,51.554,48.417,50.509,48.405z M49.909,47.615c1.883,0,3.107-0.195,4.134-0.594 c1.266-0.492,1.935-1.534,1.782-2.796c-0.127-1.057-0.515-2.03-1.094-2.907c-1.424-2.155-3.243-3.951-5.211-5.605 c-0.153-0.128-0.232-0.049-0.336,0.038c-1.896,1.604-3.918,3.035-6.043,4.32c-0.144,0.087-0.229,0.177-0.237,0.361 c-0.089,1.858-0.383,3.69-0.765,5.507c-0.05,0.238,0.033,0.288,0.211,0.332c0.861,0.212,1.718,0.441,2.581,0.637 C46.702,47.31,48.489,47.599,49.909,47.615z M27.921,35.991c-0.011,1.17,0.01,2.339,0.08,3.506c0.01,0.179-0.014,0.369,0.202,0.489c2.132,1.186,4.283,2.335,6.468,3.417c0.177,0.088,0.32,0.08,0.495-0.008 c0.634-0.32,1.276-0.622,1.914-0.935c1.65-0.81,3.312-1.604,4.891-2.55c0.143-0.085,0.269-0.151,0.274-0.367 c0.084-2.615,0.219-5.228,0.069-7.845c-0.03-0.539-0.119-0.971-0.7-1.144c-0.104-0.031-0.195-0.106-0.292-0.16 c-2.009-1.11-4.039-2.179-6.145-3.1c-0.135-0.06-0.248-0.095-0.404-0.021c-2.183,1.015-4.339,2.083-6.418,3.298 c-0.159,0.093-0.237,0.19-0.25,0.382C27.992,32.631,27.916,34.31,27.921,35.991z M20.412,47.25c0.201-0.012,0.4-0.029,0.601-0.033 c2.358-0.045,4.66-0.45,6.917-1.12c0.205-0.06,0.237-0.141,0.201-0.32c-0.072-0.348-0.14-0.696-0.199-1.046 c-0.23-1.358-0.43-2.721-0.556-4.093c-0.017-0.179-0.058-0.325-0.242-0.434c-2.087-1.239-4.042-2.662-5.909-4.211 c-0.167-0.139-0.262-0.153-0.434,0.001c-1.258,1.118-2.472,2.279-3.562,3.562c-1.024,1.207-1.868,2.515-2.112,4.124 c-0.12,0.78-0.114,1.532,0.484,2.156c0.437,0.456,0.931,0.816,1.525,1.043C18.191,47.286,19.299,47.295,20.412,47.25z M35.081,14.645c-0.41-0.014-0.796,0.089-1.15,0.288c-0.911,0.51-1.648,1.219-2.195,2.1c-1.345,2.167-2.179,4.54-2.75,7.015 c-0.054,0.233,0.061,0.253,0.215,0.3c1.876,0.564,3.727,1.201,5.539,1.949c0.165,0.068,0.296,0.048,0.441-0.02 c1.868-0.872,3.773-1.659,5.727-2.318c0.195-0.066,0.202-0.133,0.16-0.307c-0.224-0.893-0.47-1.779-0.769-2.648 c-0.612-1.781-1.367-3.487-2.624-4.927C36.981,15.282,36.202,14.658,35.081,14.645z M27.35,31.205 c-1.113,0.586-5.111,3.476-5.743,4.138c0.98,0.961,5.057,3.859,5.658,4.017C27.109,36.651,27.192,33.949,27.35,31.205z M42.991,39.259c0.056-0.017,0.09-0.02,0.114-0.036c1.888-1.176,3.694-2.462,5.406-3.884c0.206-0.17,0.237-0.241,0-0.415 c-1.344-0.984-2.716-1.924-4.15-2.771c-0.433-0.255-0.864-0.513-1.35-0.802C43.22,34.027,43.065,36.627,42.991,39.259z M35.868,43.887c0.015,0.022,0.021,0.036,0.028,0.04c1.726,0.789,3.502,1.436,5.311,2.007c0.134,0.043,0.203,0.008,0.228-0.14 c0.049-0.295,0.113-0.587,0.17-0.881c0.267-1.386,0.453-2.782,0.562-4.245C40.1,41.858,37.969,42.842,35.868,43.887z M42.165,30.013c-0.154-1.773-0.46-3.464-0.805-5.149c-0.05-0.245-0.156-0.248-0.356-0.17c-0.991,0.383-1.993,0.742-2.981,1.137 c-0.714,0.286-1.411,0.615-2.178,0.951C38.041,27.745,40.079,28.861,42.165,30.013z M28.117,40.793 c0.204,1.722,0.419,3.37,0.765,5.019c1.742-0.533,3.438-1.135,5.125-1.898C32.004,42.895,30.082,41.867,28.117,40.793z M34.025,26.805c-1.712-0.665-3.357-1.229-5.021-1.742c-0.235-0.073-0.234,0.055-0.256,0.188 c-0.197,1.173-0.376,2.349-0.476,3.534c-0.027,0.319-0.119,0.644-0.051,1.004C30.102,28.692,32.019,27.754,34.025,26.805z"/> </g> <circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="35.09" cy="37.654" r="1.473"/> <circle fill="#ED1C24" cx="17.525" cy="31.512" r="2.401"/><circle fill="#ED1C24" cx="47.287" cy="23.693" r="2.401"/> <circle fill="#ED1C24" cx="40.085" cy="51.386" r="2.401"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="35.026" cy="38.718" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="38.035" cy="34.674" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="31.646" cy="34.797" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="32.911" cy="32.472" r="1.473"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="31.702" cy="36.27" r="1.473"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="32.862" cy="37.917" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="38.646" cy="36.181" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="37.189" cy="38.055" r="1.473"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="32.522" cy="33.782" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="34.976" cy="31.96" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="37.446" cy="32.811" r="1.473"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="36.562" cy="36.481" r="1.472"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="34.58" cy="34.272" r="1.473"/>circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="33.986" cy="36.181" r="1.473"/><circle fill="#ED1C24" stroke="#000000" stroke-width="0.1" stroke-miterlimit="10" cx="36.882" cy="34.247" r="1.472"/></g></svg>
				</button>
				<button class="btn btn-history" data-action="show-history">
					<svg version="1.1" class="icon-history" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="70.866px" height="70.866px" viewBox="0 0 70.866 70.866" enable-background="new 0 0 70.866 70.866" xml:space="preserve"><g><path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-width="1.8" stroke-miterlimit="10" d="M16.495,23.196l-1.763,24.689c0,0,15.71-1.783,16.479-1.665s2.341,0.952,3.919,1.064s3.649-1.182,3.649-1.182l16.749,1.687l-1.829-24.797c0,0-2.693,0.026-3.161-0.351s-0.832-1.267-1.625-1.939s-7.694-1.659-9.999-0.714s-3.116,1.171-3.765,2.501s0.668-3.029-7.134-2.715s-5.852,0.727-6.111,0.824s-1.459,1.125-2.221,2.271C19.105,23.738,17.512,22.938,16.495,23.196z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-miterlimit="10" d="M19.564,23.833l-0.93,0.78c0,0-1.477,14.298-0.48,20.672c0,0,13.073-1.788,14.239-1.607s1.218,0.228,2.265,0.676c0.131,0.056,0.258,0.091,0.38,0.109c0.856,0.132,1.479-0.545,1.536-0.576c0.065-0.035,1.254-1.065,1.759-0.702s13.964,1.099,14.329,2.008s-0.731-19.822-1.041-20.488s-3.32-2.881-3.323-3.258s-6.444-1.892-7.981-0.828c0,0-4.105,0.354-5.187,3.488c0,0-1.828-3.214-2.618-2.985s-0.414-1.271-10.051,0C22.46,21.123,22.166,20.779,19.564,23.833z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-width="1.2" stroke-miterlimit="10" d="M35.129,43.915c0,0,0.162-3.013-3.623-3.961s-9.104,0.118-10.642,0.414c0,0,0.59-8.691,1.063-17.914c0,0,0.56-1.28,1.232-1.419s6.142-1.24,8.363-0.146s2.091,0.824,2.842,2c0,0,0.394,0.606,0.764,1.93V43.915z"/><path fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-width="1.2" stroke-miterlimit="10" d="M35.149,24.522c0,0,0.668-1.941,2.162-2.931S42.183,19.88,47.229,21c0,0,0.529,0.56,0.632,0.816s0.969,17.25,1.205,18.551c0,0-2.134-1.52-10.323-1.062c0,0-3.548,0.96-3.471,4.609"/><line fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-width="0.8" stroke-miterlimit="10" x1="20.865" y1="40.367" x2="18.154" y2="45.286"/><line fill-rule="evenodd" clip-rule="evenodd" fill="none" stroke="#ED1C24" stroke-width="0.8" stroke-miterlimit="10" x1="49.066" y1="40.367" x2="52.73" y2="44.806"/></g></svg>
				</button>
		  </div>
			<div class="card-film">
				<button class="btn btn-film" data-action="show-film">Play Film</button>
			</div>
		</div>
	 ***/
	};

	return template(card);
});


