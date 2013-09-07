define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
], function(Section, draw, helper) {
	'use strict';

	function Flaps() {
		Section.call(this);
	}

	Flaps.prototype = Object.create(Section.prototype);

	Flaps.prototype.constructor = Flaps;

	return new Flaps();
});

