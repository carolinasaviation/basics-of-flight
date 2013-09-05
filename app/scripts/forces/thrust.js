define([
	'../lib/section',
	'./interactives/thrust'
], function(Section, interactive) {
	'use strict';

	function Thrust() {
		Section.call(this);
	}

	Thrust.prototype = Object.create(Section.prototype);

	Thrust.prototype.constructor = Thrust;

	Thrust.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, interactive);
	};

	return new Thrust();
});
