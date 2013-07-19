define(['./_page'], function(Page) {
	'use strict';

	function Preflight() {
		Page.call(this);

		this.sections = [
			'outside', 'inside'
		];
	}

	Preflight.prototype = Object.create(Page.prototype);

	Preflight.prototype.constructor = Preflight;

	return new Preflight();
});


