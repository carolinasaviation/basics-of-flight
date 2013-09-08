define([
	'../lib/section',
	'./interactives/elevators'
], function(Section, interactive) {
	'use strict';

	function Elevators() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.elevators.quiz);
		this.interactive = interactive;
	}

	Elevators.prototype = Object.create(Section.prototype);

	Elevators.prototype.constructor = Elevators;

	return new Elevators();
});


