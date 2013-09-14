define([
	'../lib/section',
	'./interactives/ailerons',
	'i18n'
], function(Section, interactive, i18n) {
	'use strict';

	function Ailerons() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.ailerons.quiz);
		this.interactive = interactive;
	}

	Ailerons.prototype = Object.create(Section.prototype);

	Ailerons.prototype.constructor = Ailerons;

	return new Ailerons();
});

