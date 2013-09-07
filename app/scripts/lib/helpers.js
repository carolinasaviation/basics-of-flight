define(function() {

	function createDomNode(str, tmpElement) {
		tmpElement = document.createElement(tmpElement || 'div');
		tmpElement.innerHTML = str;
		return tmpElement.firstChild;
	}

	function limit(val, min, max) {
		return Math.max(Math.min(val, max), min);
	}

	function scale(percentage, min, max) {
		if (percentage > 1) percentage /= 100;
		return limit((+percentage) * (max - min) + min, min, max);
	}

	return {
		createDomNode: createDomNode,
		limit: limit,
		scale: scale,
		toArray: function toArray(n) { return Array.prototype.slice.call(n, 0); }
	}
});
