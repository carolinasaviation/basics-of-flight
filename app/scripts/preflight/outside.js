define([
	'../lib/section',
	'./interactives/outside'
], function(Section, interactive) {
	'use strict';

	function Outside() {
		Section.call(this);
		this.interactive = interactive;
	}

	Outside.prototype = Object.create(Section.prototype);

	Outside.prototype.constructor = Outside;

	return new Outside();
});

