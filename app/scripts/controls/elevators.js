define([
	'../lib/section',
	'./interactives/elevators',
	'i18n'
], function(Section, interactive, i18n) {
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


