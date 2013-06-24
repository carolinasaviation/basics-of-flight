define(['./_page'], function(Page) {

	function Controls() {
		Page.call(this);

		this.sections = [
			'engine', 'flaps', 'ailerons', 'rudder'
		];
	}

	Controls.prototype = Object.create(Page.prototype);

	Controls.prototype.constructor = Controls;

	return new Controls();
});

