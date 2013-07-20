define(['../lib/section'], function(Section) {
	'use strict';

	function Thrust() {
		Section.call(this);
	}

	Thrust.prototype = Object.create(Section.prototype);

	Thrust.prototype.constructor = Thrust;

	return new Thrust();
});
