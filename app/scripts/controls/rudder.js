define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';

	function Rudder() {
		Section.call(this);
	}

	Rudder.prototype = Object.create(Section.prototype);

	Rudder.prototype.constructor = Rudder;

	return new Rudder();
});


