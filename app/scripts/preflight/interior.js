define([
	'../lib/section',
	'./interactives/interior'
], function(Section, interactive) {
	'use strict';

	function Interior() {
		Section.call(this);
		this.interactive = interactive;
	}

	Interior.prototype = Object.create(Section.prototype);

	Interior.prototype.constructor = Interior;

	return new Interior();
});

