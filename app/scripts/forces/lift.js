define([
	'../lib/section',
	'./interactives/lift'
], function(Section, interactive) {
	'use strict';

	function Lift() {
		Section.call(this);
	}

	Lift.prototype = Object.create(Section.prototype);

	Lift.prototype.constructor = Lift;

	Lift.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, interactive);
	};

	return new Lift();
});
