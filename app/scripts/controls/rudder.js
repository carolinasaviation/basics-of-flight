define([
	'../lib/section',
	'./interactives/rudder',
	'i18n'
], function(Section, interactive, i18n) {
	'use strict';

	function Rudder() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.rudder.quiz);
		this.interactive = interactive;
	}

	Rudder.prototype = Object.create(Section.prototype);

	Rudder.prototype.constructor = Rudder;

	return new Rudder();
});


