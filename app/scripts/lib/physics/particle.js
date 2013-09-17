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
		this.velocity.add(this.acceleration);
		this.position.add(this.velocity);
	};

	Particle.prototype.moveTowardField = function(field) {
		// our starting acceleration this frame
		var speed = 1;
		var dx = field.position.x - this.position.x,
				dy = field.position.y - this.position.y,
				angle, vx, vy;

		angle = Math.atan2(dy, dx),
		vx = Math.cos(angle) * speed,
		vy = Math.sin(angle) * speed;

		//arrow.rotation = angle; //radians
		if (Math.abs(dx) < speed) vx = 0;
		if (Math.abs(dy) < speed) vy = 0;

		this.position.add(vx, vy);
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

