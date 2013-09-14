define([
	'../lib/section',
	'./interactives/exterior'
], function(Section, interactive) {
	'use strict';

	function Exterior() {
		Section.call(this);
		this.interactive = interactive;
	}

	Exterior.prototype = Object.create(Section.prototype);

	Exterior.prototype.constructor = Exterior;

	return new Exterior();
});

