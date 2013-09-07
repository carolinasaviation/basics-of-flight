define([
	'../lib/section',
	'./interactives/weight',
], function(Section, interactive) {
	'use strict';

	function Weight() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.weight.quiz);
		this.interactive = interactive;
	}

	Weight.prototype = Object.create(Section.prototype);

	Weight.prototype.constructor = Weight;

	return new Weight();
});

