define([

], function() {

	var convert = {};

	function extractUnit(any) {
		if (typeof any === 'undefined' || typeof any === 'number') return '';

		var unit = String(any).replace(/\s+$/, '');
		return unit.match(/[a-z%]*$/i)[0];
	}

	function parse(n) {
		var unit = extractUnit(n);

		n = parseFloat(n, 10);
		return [ n, unit ];
	}

	function convert(measurement, format) {
		measurement = parse(measurement);
		return convert[measurement[1] + 'to' + format](measurement[0]);
	}

	function register(start, end, toFn, fromFn) {
		convert[start + 'to' + end] = toFn;
		convert[end + 'to' + start] = fromFn;
	}

	register('kg', 'lbs',
		function(lb) { return lb / 2.20462; },
		function(kg) { return kg * 2.20462; }
	);

	register('ft', 'm',
		function(m) { return m / 0.3048; },
		function(ft) { return ft * 0.3048 ; }
	);

	return {
		convert: convert,
		register: register
	}

});

