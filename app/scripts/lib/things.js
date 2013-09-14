define([
	'./physics/vector',
	'./physics/particle',
	'./physics/field'
], function(Vector, Particle, Field) {
	'use strict';

	return {
		Vector: Vector,
		Particle: Particle,
		Field: Field
	};

});
