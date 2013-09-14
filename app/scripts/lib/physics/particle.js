define([
	'./Vector'
], function(Vector) {
	'use strict';

	function Particle(point, velocity, acceleration) {
		this.position = point || new Vector(0, 0);
		this.velocity = velocity || new Vector(0, 0);
		this.acceleration = acceleration || new Vector(0, 0);
	};

	Particle.prototype.move = function() {
		if (this.acceleration.x === null) {
			this.acceleration.x = 0;
			this.velocity.x = 0;
		}
		if (this.acceleration.y === null) {
			this.acceleration.y = 0;
			this.velocity.y = 0;
		}
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	};

	Particle.prototype.moveToField = function(field) {
		// our starting acceleration this frame
		var accelX = 0;
		var accelY = 0;
		var vectorX, vectorY, force;

		// find the distance between the particle and the field
		vectorX = field.position.x - this.position.x;
		vectorY = field.position.y - this.position.y;

		// calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
		force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5);

		// add to the total acceleration the force adjusted by distance
		accelX = vectorX * force;
		accelY = vectorY * force;

		if (Math.abs(vectorX) < 1) {
		 	this.position.x = field.position.x;
			this.acceleration.x = accelX = 0;
		}

		if (Math.abs(vectorY) < 1) {
		 	this.position.y = field.position.y;
			this.acceleration.y = accelY = 0;
		}

		// update our particle's acceleration
		this.acceleration.moveTo(accelX, accelY);
	}

	Particle.prototype.submitToFields = function(fields) {
		// our starting acceleration this frame
		var totalAccelerationX = 0;
		var totalAccelerationY = 0;
		var i, field, vectorX, vectorY, force;

		// for each passed field
		for (i = 0; i < fields.length; i++) {
			field = fields[i];

			// find the distance between the particle and the field
			vectorX = field.position.x - this.position.x;
			vectorY = field.position.y - this.position.y;

			// calculate the force via MAGIC and HIGH SCHOOL SCIENCE!
			if (vectorX === 0 && vectorY === 0)
				force = field.mass;
			else
				force = field.mass / Math.pow(vectorX * vectorX + vectorY * vectorY, 1.5);

			// add to the total acceleration the force adjusted by distance
			totalAccelerationX += vectorX * force;
			totalAccelerationY += vectorY * force;
		}

		// update our particle's acceleration
		//this.acceleration = new Vector(totalAccelerationX, totalAccelerationY);
		this.acceleration.x = totalAccelerationX;
		this.acceleration.y = totalAccelerationY;
	};

	return Particle;
});

