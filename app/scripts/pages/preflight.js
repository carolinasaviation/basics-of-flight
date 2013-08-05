define([
	'./_page',
	'../preflight/outside',
	'../preflight/inside',
	'../lib/animations',
	'../lib/helpers',
	'paper'
], function(Page, outside, inside /*, draw, helper, paper */) {
	'use strict';

	function Preflight() {
		Page.call(this);

		this.sections = [
			outside, inside
		];
	}

	Preflight.prototype = Object.create(Page.prototype);

	Preflight.prototype.constructor = Preflight;

	return new Preflight();
});


