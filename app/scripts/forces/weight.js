define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./weightInteraction'
], function(Section, draw, helper, WeightInteraction) {
	'use strict';

	function Weight() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.weight.quiz);
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	Weight.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, WeightInteraction);
	};

	return new Weight();
});

