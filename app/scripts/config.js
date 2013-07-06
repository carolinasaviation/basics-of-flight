define(['./i18n/en'], function(i18n) {

	window.i18n = i18n;
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
				"%c%s: %c%s",
				'color:' + logger.colors[this.name] + ';font-weight: bold', this.name,
				'color: ' + logger.colors.fn, fn
			);
		},
		sectionLifeCycleFn: function(fn) {
			console.log("%c%s/%c%s: %c%s",
				'color: ' + logger.colors[this._page.name] + ';font-weight: bold', this._page.name,
				'color: ' + logger.colors[this.name], this.name,
				'color: ' + logger.colors.fn, fn
			);
		}
	};

	return {
		logger: logger,
		width: dim.width,
		height: dim.height,

		transform: 'webkitTransform',
		animation: 'webkitAnimation',

		createDomNode: function(str, tmpElement) {
			tmpElement = document.createElement(tmpElement || 'div');
			tmpElement.innerHTML = str;
			return tmpElement.firstChild;
		}
	}

});

