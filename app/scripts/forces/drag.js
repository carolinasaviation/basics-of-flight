define([
	'../lib/section',
	'../lib/animations',
	'../lib/helpers',
	'./dragInteraction'
], function(Section, draw, helper, DragInteraction) {
	'use strict';

	var ARROWS_SELECTOR = '.drag-arrows';
	var image = '<div class="' + ARROWS_SELECTOR.substr(1) + '"><div class="arrow arrow-e"></div><div class="arrow arrow-e"></div><div class="arrow arrow-e"></div></div>';

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
