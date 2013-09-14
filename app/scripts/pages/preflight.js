define([
	'../lib/page',
	'../preflight/exterior',
	'../preflight/interior',
	'../lib/animations',
	'../lib/helpers'
], function(Page, exterior, interior /*, draw, helper*/) {
	'use strict';

	function Preflight() {
		Page.call(this);

		this.sections = [
			exterior,
			interior
		];
	}

	Preflight.prototype = Object.create(Page.prototype);

	Preflight.prototype.constructor = Preflight;

	return new Preflight();
});


