define(function() {

	function createPaperScript(module, canvas, paperScriptFunction) {
		if (paper.view && paper.view._element === canvas) {
		 	return paper.PaperScope.get(canvas);
		}

		/* TODO: reuse a paperscope object once I know how to setup the view
		 * paper.PaperScope.get(canvas) || */
		var scope = new paper.PaperScope().setup(canvas);
		var code = paperScriptFunction.toString().replace(/^function[\w\s()]*{/, '').replace(/}$/, '')
		canvas.id = scope._id;

		scope.PaperScript.evaluate(code, scope);

		module.paperProject = window.paper.project;
		module.paperView = window.paper.view;
		module.paperScope = scope;
		return scope;
	}

	function cleanupPaperScript(module) {
		if (module.paperScope)
			module.paperScope.remove();
		if (module.paperView)
			module.paperView.remove();
	}

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
		createPaperScript: createPaperScript,
		cleanupPaperScript: cleanupPaperScript,
		createDomNode: createDomNode,
		limit: limit,
		scale: scale,
		toArray: function toArray(n) { return Array.prototype.slice.call(n, 0); }
	}
});
