define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';


	function Ailerons() {
		Section.call(this);
	}

	Ailerons.prototype = Object.create(Section.prototype);

	Ailerons.prototype.constructor = Ailerons;

	return new Ailerons();
});

