define([
	'../lib/section',
	'./interactives/drag',
	'i18n'
], function(Section, interactive, i18n) {
	'use strict';

	function Drag() {
		Section.call(this);
		this.film('//www.youtube.com/embed/beTsXzvtXDs');
		this.quiz(i18n.drag.quiz);
		this.interactive = interactive;
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	return new Drag();
});
