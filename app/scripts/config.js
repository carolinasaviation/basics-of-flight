define(['./i18n/en'], function(i18n) {

	window.i18n = i18n;
	var dim = document.body.getBoundingClientRect();

	return {
		logger: {
			pageLifeCycle: true,
			sectionLifeCycle: true,
			pageLifeCycleFn: function(fn) {
				console.log("%s: %s", this.name, fn);
			},
			sectionLifeCycleFn: function(fn) {
				console.log([this._page.name, this.name].join('#') + ': ' + fn);
			}
		},

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

