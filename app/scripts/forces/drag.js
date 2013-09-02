define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./dragInteraction'
], function(Section, draw, helper, DragInteraction) {
	'use strict';

	function Drag() {
		Section.call(this);
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	Drag.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, DragInteraction);
	};

	return new Drag();
});
