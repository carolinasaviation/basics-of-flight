define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./weightInteraction'
], function(Section, draw, helper, WeightInteraction) {
	'use strict';

	var ARROWS_SELECTOR = '.weight-arrows';
	var image = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow arrow-s"></div><div class="arrow arrow-s"></div><div class="arrow arrow-s"></div></div>';

	function Weight() {
		Section.call(this);
		this._film = '//www.youtube.com/embed/beTsXzvtXDs';
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, WeightInteraction);
	};

	return new Weight();
});
