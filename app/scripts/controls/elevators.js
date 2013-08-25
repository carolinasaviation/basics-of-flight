define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';

	function Elevators() {
		Section.call(this);
	}

	Elevators.prototype = Object.create(Section.prototype);

	Elevators.prototype.constructor = Elevators;

	return new Elevators();
});


