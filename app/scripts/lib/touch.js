define([
	'hammer'
], function(Hammer) {
	Hammer || (Hammer = window.Hammer);

	function wrapper(element) {
		return Hammer(element);
	}

	return wrapper;

});

