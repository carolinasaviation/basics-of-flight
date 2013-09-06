define(function() {
	window.requestAnimationFrame || (window.requestAnimationFrame = window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame);
	window.cancelAnimationFrame || (window.cancelAnimationFrame = window.mozCancelAnimationFrame || window.webkitCancelRequestAnimationFrame);

	var el = document.createElement('div'),
			hasAnimation = false,
			animationstring = 'animation',
			prefix = '',
			prefixes = 'Webkit Moz O ms Khtml'.split(' '),
			pfx  = ''
			i = 0;

	if (el.style.animationName) animation = true;
	else
		for (; i < prefixes.length; i++) {
			if (el.style[prefixes[i] + 'AnimationName'] === undefined) continue;

			pfx = prefixes[i];
			animationstring = pfx + 'Animation';
			prefix = '-' + pfx.toLowerCase() + '-';
			animation = true;
			break;
		}

	var transitionstring = '-webkit-transition';

	var appendStyle = (function() {
		/*
		if (document.styleSheets && document.styleSheets.length)
			return function(keyframes) {
				document.styleSheets[0].insertRule(keyframes, 0);
			}
		*/

		return function(keyframes) {
			var s = document.createElement('style');
			s.innerHTML = keyframes;
			document.getElementsByTagName('head')[0].appendChild(s);
		}
	})();

	var counter = 0;
	function generateName(type) {
		return type + '-' + counter++;
	}

	// examples:
	// animate(myDiv, 'rotate 1s linear infinite', [[0, 'transform: rotate(0deg)'], [100, 'transform: rotate(360deg)']]);
	function animate(element, properties, animation) {
		var name = generateName('animate');
		var frames = animation.map(function(frame) {
			return frame[0] + '%{' + frame[1] + '}'
		}).join('');
		var keyframes = ['@', prefix, 'keyframes ', name, '{ ', frames, '}'].join('');

		appendStyle(keyframes);

		element.style[animationstring] = name + ' ' + properties
	}

	function transition(element, transitions) {
		var name = generateName('transition');

		console.log(transitionstring, transitions);
		element.style[transitionstring] = transitions.join(',');
	}

	return {
		createAnimation: animate,
		createTransition: transition
	}

});

