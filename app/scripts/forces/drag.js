define([
	'../lib/section',
	'./interactives/drag'
], function(Section, interactive) {
	'use strict';

	function Drag() {
		Section.call(this);
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	Drag.prototype.startInteraction = function() {
		Section.prototype.startInteraction.call(this, interactive);
	};

	return new Drag();
});
