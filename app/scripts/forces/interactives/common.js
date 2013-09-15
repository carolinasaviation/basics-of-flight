define([
	'../../lib/things',
], function(__) {
	return {
		setupCessna: function(section, canvas) {
			var img = document.getElementById('cessna-isometric').cloneNode(true);
			img.id = section.name.toLowerCase() + '-cessna-isometric';
			img.classList.add('interactive--image');
			img.style.position = 'absolute';
			img.style.left = '15%';
			img.style.width = '60%';

			canvas.parentNode.appendChild(img);
			return img;
		},

		setupForces: function(canvas, granger) {
			var origin = new __.Vector(canvas.width / 2, canvas.height / 2)
			var field = new __.Field(new __.Vector(canvas.width / 2 - 50, canvas.height / 2 - 50), 100);
			var particle = new __.Particle(origin.clone());
			var value = +granger.element.value;

			return {
				origin: origin,
				field: field,
				particle: particle,
				value: value
			};
		}

	}


});

