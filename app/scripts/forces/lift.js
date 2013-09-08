define([
	'../lib/section',
	'./interactives/lift'
], function(Section, interactive) {
	'use strict';

	function Lift() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.lift.quiz);
		this.interactive = interactive;
	}

	Lift.prototype = Object.create(Section.prototype);

	Lift.prototype.constructor = Lift;

	return new Lift();
});
