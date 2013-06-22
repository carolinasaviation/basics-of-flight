/*global define */
define([], function () {
	'use strict';

	var ACTIVE_CLASS = 'nav-item-active';
	document.querySelector('.nav').addEventListener('click', function(e) {
		var active = document.querySelector('.nav .' + ACTIVE_CLASS);
		if (active) active.classList.remove(ACTIVE_CLASS);

		var node = e.target;

		while (!node.matches('.nav-item'))
			node = node.parentNode;

		node.classList.add(ACTIVE_CLASS);
		console.log('TODO: Toggle page manager for: ' + node.textContent);
	}, false);

	return '\'Allo \'Allo!';
});
