define([
	'../lib/section',
	'./interactives/inside'
], function(Section, interactive) {
	'use strict';

	function Inside() {
		Section.call(this);
		this.interactive = interactive;
	}

	Inside.prototype = Object.create(Section.prototype);

	Inside.prototype.constructor = Inside;

	return new Inside();
});

