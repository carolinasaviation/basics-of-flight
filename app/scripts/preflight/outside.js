define(['../lib/section'], function(Section) {
	'use strict';

	function Outside() {
		Section.call(this);
	}

	Outside.prototype = Object.create(Section.prototype);

	Outside.prototype.constructor = Outside;

	return new Outside();
});

