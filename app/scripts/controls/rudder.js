define([
	'../lib/section',
	'./interactives/rudder'
], function(Section, interactive) {
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


