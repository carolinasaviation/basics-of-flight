define({
	// === FORCES
	forces: {
		title: 'Forces',
		description: 'To fly an airplane you have to master the aerodynamics of flight.'
	},
	drag: {
		introduction: {
			title: 'What is drag?',
			description: '<p>For a wing, the total drag coefficient, Cd is equal to the base drag coefficient at zero lift Cdo plus the induced drag coefficient Cdi.</p>'
		},
		science: {
			title: 'How is drag calculated?',
			equation: 'Cd = Cd0 + Cl^2 / ( pi * Ar * e)',
			description: 'For a wing, the total drag coefficient, Cd is equal to the base drag coefficient at zero lift Cdo plus the induced drag coefficient Cdi.',
		},
		history: {
			title: 'Drag&rsquou;s Discovery',
			figure: 'throwaway-wrights.jpg',
			description: 'The Wright brothers, Orville (August 19, 1871 – January 30, 1948) and Wilbur (April 16, 1867 – May 30, 1912), were two American brothers, inventors, and aviation pioneers who were credited with inventing and building the world&rsquo;s first successful airplane and making the first controlled, powered and sustained heavier-than-air human flight, on December 17, 1903.'
		},
		quiz: []
	},
	lift: {
		introduction: {
			title: 'What is lift?',
			description: '<p>The lift of an object can be calculated using the Kutta–Joukowski theorem.</p>'
		},
		science: {
			title: 'How is lift calculated?',
			equation: 'L\' =  \rho v \Gamma\,',
			description: 'The lift of an object can be calculated using the Kutta–Joukowski theorem.',
		},
		history: {
			title: 'Who discovered the science of lift?',
			figure: 'throwaway-kutta.jpg',
			description: 'Kutta was born in Pitschen, Upper Silesia (today Byczyna, Poland). In 1901, he co-developed the Runge-Kutta method, used to solve ordinary differential equations numerically. He is also remembered for the Zhukovsky-Kutta aerofoil, the Kutta-Zhukovsky theorem and the Kutta condition in aerodynamics.'
		},
		quiz: []
	},
	thrust: {
		introduction: {
			title: 'What is thrust?',
			description: '<p>Thrust is a force which can be calculated by mass times acceleration.</p>',
		},
		science: {
			title: 'How is thrust calculated?',
			equation: 'F = m * a',
			description: 'Thrust is a force which can be calculated by mass times acceleration.',
		},
		history: {
			title: 'The history of thrust',
			figure: 'throwaway-thrust.png',
			description: 'Newton&rsquo;s third law of motion states something or another. The png wireframes are much too small to read. This is a description of the force of weight and its effects on an airplane. This is a description of the force of weight and its effects on an airplane. This is a description of the force of weight and its effects on an airplane.'
		},
		quiz: []
	},
	weight: {
		introduction: {
			title: 'What is weight?',
			description: '\
<p>The weight of an object is equal to the mass of an object multiplied by the force of gravity.</p>\
<p>For real. It&rsquo;s true. Just ask wikipedia. Wikipedia is smart. Really smart. Like Alex Trebek smart.</p>\
<p>But if this was a lengthy description with some meat to it, what would it look like? It may look like this.</p>\
<p>This being that thing that is long enough to scroll a bit. How does it look? How does it feel?</p>'
		},
		science: {
			title: 'How is weight calculated?',
			equation: 'W = mg',
			description: 'The weight of an object is equal to the mass of an object multiplied by the force of gravity.',
		},
		history: {
			title: 'The history of Weight',
			figure: 'throwaway-newton.jpg',
			description: 'Thrust is a reaction force described quantitatively by Newton&rsquo;s second and third laws. When a system expels or accelerates mass in one direction, the accelerated mass will cause a force of equal magnitude but opposite direction on that system.',
		},
		quiz: [
			{
				question: 'What physical force causes the effect of weight?',
				answers: [
					'Gravity',
					'Pressure',
					'Electricity',
				]
			},
			{
				question: 'What must the pilot do to bring the aircraft back to a balanced flight speed?',
				answers: [
					'Increase Thrust',
					'Slow down',
					'Point the aircraft downwards'
				]
			}
		]
	},

	// === CONTROLS
	controls: {
		title: 'Controls',
		description: 'To fly an airplane you have to master manipulating the forces.'
	},
	elevators: {
		introduction: {
			title: 'Elevators',
			description: '<p>There are shaft engines, reaction engines, and now even the Wankel engine.</p>',
		},
		science: {
			equation: '',
			description: 'There are shaft engines, reaction engines, and now even the Wankel engine.',
		},
		history: {
			figure: 'throwaway-engine.jpg',
			description: 'A Rolls-Royce Merlin installed in a preserved Avro York. From http://en.wikipedia.org/wiki/Aircraft_engine'
		},
		quiz: []
	},
	flaps: {
		introduction: {
			title: 'Flaps',
			description: '<p>Flaps are responsible for increasing drag.</p>',
		},
		science: {
			equation: '',
			description: 'Flaps are responsible for increasing drag.',
		},
		history: {
			figure: 'throwaway-flaps.jpg',
			description: 'Flaps are hinged surfaces mounted on the trailing edges of the wings of a fixed-wing aircraft to reduce the speed at which an aircraft can be safely flown and to increase the angle of descent for landing. They shorten takeoff and landing distances. Flaps do this by lowering the stall speed and increasing the drag.'
		},
		quiz: []
	},
	ailerons: {
		introduction: {
			title: 'What&rsquo;s an aileron?',
			description: '<p>French for &lsquo;little wing&rsquo;</p>',
		},
		science: {
			equation: 'F = m * a',
			description: 'French for &lsquo;little wing&rsquo;',
		},
		history: {
			figure: 'throwaway-aileron.gif',
			description: 'An aileron is a hinged flight control surface usually attached to the trailing edge of each wing of a fixed-wing aircraft. Ailerons are used in pairs to control the aircraft in roll, or movement around the aircraft&rsquo;s longitudinal axis, which normally results in a change in heading due to the tilting of the lift vector. Movement around this axis is called &lsquo;rolling&rsquo; or &lsquo;banking&rsquo;.'
		},
		quiz: []
	},
	rudder: {
		introduction: {
			title: 'Rudder',
			description: '',
		},
		science: {
			equation: 'W = mg',
			description: '',
		},
		history: {
			figure: 'throwaway-rudder.gif',
			description: 'The rudder is a directional control surface along with the rudder-like elevator. It is usually attached to the fin  which allows the pilot to control yaw about the vertical axis, i.e. change the horizontal direction in which the nose is pointing.'
		},
		quiz: []
	},

	// === PREFLIGHT
	preflight: {
		title: 'Preflight',
		description: 'Before taking to the skies, you best make sure your plane is all checked out!'
	},
	inside: {
		introduction: {
			title: 'Inside the cockpit',
			description: '',
		},
		science: {
			equation: '',
			description: '',
		},
		history: {
			figure: 'throwaway-engine.jpg',
			description: 'A Rolls-Royce Merlin installed in a preserved Avro York. From http://en.wikipedia.org/wiki/Aircraft_engine'
		},
		quiz: []
	},
	outside: {
		introduction: {
			title: 'The outside',
			description: '',
		},
		science: {
			equation: '',
			description: 'Flaps are responsible for increasing drag.',
		},
		history: {
			figure: 'throwaway-flaps.jpg',
			description: 'Flaps are hinged surfaces mounted on the trailing edges of the wings of a fixed-wing aircraft to reduce the speed at which an aircraft can be safely flown and to increase the angle of descent for landing. They shorten takeoff and landing distances. Flaps do this by lowering the stall speed and increasing the drag.'
		},
		quiz: []
	},

	quiz: {
		correctAnswers: 'Correct Answers',
	},
	altitude: 'Altitude',
	speed: 'Speed',
	gravity: 'Gravity'

});

