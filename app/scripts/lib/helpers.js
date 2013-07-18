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
		module.paperProject.remove();
		module.paperView.remove();
	}

	return {
		createPaperScript: createPaperScript,
		cleanupPaperScript: cleanupPaperScript,

		createDomNode: function(str, tmpElement) {
			tmpElement = document.createElement(tmpElement || 'div');
			tmpElement.innerHTML = str;
			return tmpElement.firstChild;
		}
	}
});
