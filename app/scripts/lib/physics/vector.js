define([], function() {
	'use strict';

	function Vector(x, y) {
		this.x = x || 0;
		this.y = y || 0;
	}

	Vector.prototype.clone = function() {
		return new Vector(this.x, this.y);
	};

	Vector.prototype.add = function(vector) {
		if (arguments.length === 1) {
			this.x += vector.x;
			this.y += vector.y;
		}
		else {
			this.x += vector;
			this.y += arguments[1];
		}
	};

	Vector.prototype.moveTo = function(x, y) {
		this.x = x;
		this.y = y;
	}

	Vector.fromArray = function(a) {
		return new Vector(a[0], a[1]);
	}

	return Vector;

});

