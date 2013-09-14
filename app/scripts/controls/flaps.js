define([
	'../lib/section',
	'./interactives/flaps',
	'i18n'
], function(Section, interactive, i18n) {
	'use strict';

	function Flaps() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.flaps.quiz);
		this.interactive = interactive;
	}

	Flaps.prototype = Object.create(Section.prototype);

	Flaps.prototype.constructor = Flaps;

	return new Flaps();
});

