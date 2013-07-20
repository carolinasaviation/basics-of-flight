define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';

	function Flaps() {
		Section.call(this);
	}

	Flaps.prototype = Object.create(Section.prototype);

	Flaps.prototype.constructor = Flaps;

	return new Flaps();
});

