define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
], function(Section, draw, helper) {
	'use strict';

	function Elevators() {
		Section.call(this);
	}

	Elevators.prototype = Object.create(Section.prototype);

	Elevators.prototype.constructor = Elevators;

	return new Elevators();
});


