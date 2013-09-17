define([
	'./Vector'
], function(Vector) {
	'use strict';

	function Field(point, mass) {
		this.position = point || new Vector(0, 0);
		this.mass = mass || 5;
	};

	Field.prototype.draw = function(ctx) {
		ctx.fillStyle = '#f00';
		ctx.beginPath();
		ctx.arc(this.position.x, this.position.y, 5, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill()
	}

	return Field;

});

