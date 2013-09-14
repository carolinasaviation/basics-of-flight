define(function() {

	var dim = document.body.getBoundingClientRect();
	var logger = {
		colors: {
			fn: '#f8682b',

			// Sections
			Forces: '#0b304a',
			Controls: '#0b304a',
			Preflight: '#0b304a',

			// Forces sections
			Weight: '#0D6E9B',
			Lift: '#0D6E9B',
			Drag: '#0D6E9B',
			Thrust: '#0D6E9B'

			// Controls sections
			// Preflight sections
		},
		pageLifeCycle: true,
		sectionLifeCycle: true,
		pageLifeCycleFn: function(fn) {
			console.log(
				'%c%s: %c%s',
				'color:' + logger.colors[this.name] + ';font-weight: bold', this.name,
				'color: ' + logger.colors.fn, fn
			);
		},
		sectionLifeCycleFn: function(fn) {
			console.log('%c%s/%c%s: %c%s',
				'color: ' + logger.colors[this._page.name] + ';font-weight: bold', this._page.name,
				'color: ' + logger.colors[this.name], this.name,
				'color: ' + logger.colors.fn, fn
			);
		}
	};


	return {
		logger: logger,
		// false or fn
		/*
		fps: function(delta) {
			var text;
			if (delta === 0) {
				if (!paper.project.layers[0].children['fps']) {
					text = new PointText(paper.view.viewSize.width - 55, 20);
					text.name = 'fps';
				}
				return '00';
			}
			else {
				text = paper.project.layers[0].children['fps'];
			}
			fps = (1 / delta).toFixed(2);

			text.content = fps + 'fps'
			text.fillColor = '#ffffff';
			return fps;
		},
	  */
		width: dim.width,
		height: dim.height,

		transform: 'webkitTransform',
		animation: 'webkitAnimation'
	};

});

