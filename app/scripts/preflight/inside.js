define(['../lib/section'], function(Section) {
	'use strict';

	function Inside() {
		Section.call(this);
	}

	Inside.prototype = Object.create(Section.prototype);

	Inside.prototype.constructor = Inside;

	return new Inside();
});

