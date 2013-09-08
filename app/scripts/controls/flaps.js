define([
	'../lib/section',
	'./interactives/flaps'
], function(Section, interactive) {
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

