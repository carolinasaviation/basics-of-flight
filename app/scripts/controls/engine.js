define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'paper',
], function(Section, draw, helper, paper) {
	'use strict';

	function Engine() {
		Section.call(this);
	}

	Engine.prototype = Object.create(Section.prototype);

	Engine.prototype.constructor = Engine;

	return new Engine();
});


