define([
	'../lib/page',
	'../preflight/outside',
	'../preflight/inside',
	'../lib/animations',
	'../lib/helpers'
], function(Page, outside, inside /*, draw, helper*/) {
	'use strict';

	function Preflight() {
		Page.call(this);

		this.sections = [
			outside,
			inside
		];
	}

	Preflight.prototype = Object.create(Page.prototype);

	Preflight.prototype.constructor = Preflight;

	return new Preflight();
});


