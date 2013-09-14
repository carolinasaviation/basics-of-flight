define([
	'../lib/section',
	'./interactives/thrust',
	'i18n'
], function(Section, interactive, i18n) {
	'use strict';

	function Thrust() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.thrust.quiz);
		this.interactive = interactive;
	}

	Thrust.prototype = Object.create(Section.prototype);

	Thrust.prototype.constructor = Thrust;

	return new Thrust();
});
