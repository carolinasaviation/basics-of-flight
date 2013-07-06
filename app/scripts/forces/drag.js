define(['../lib/section'], function(Section) {

	function Drag() {
		Section.call(this);
	}

	Drag.prototype = Object.create(Section.prototype);

	Drag.prototype.constructor = Drag;

	return new Drag();
});
