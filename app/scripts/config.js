define(['./i18n/en'], function(i18n) {

	window.i18n = i18n;

	return {
		logger: {
			pageLifeCycle: false
		},

		transform: 'webkitTransform',

		createDomNode: function(str, tmpElement) {
			tmpElement = document.createElement(tmpElement || 'div');
			tmpElement.innerHTML = str;
			return tmpElement.firstChild;
		}
	}

});

