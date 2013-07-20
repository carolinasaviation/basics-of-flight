define(['../lib/section'], function(Section) {
	'use strict';

	function Lift() {
		Section.call(this);
	}

	Lift.prototype = Object.create(Section.prototype);

	Lift.prototype.constructor = Lift;

	return new Lift();
});
