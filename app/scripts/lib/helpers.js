define(function() {

	function createPaperScript(canvas, paperScriptFunction) {
		if (paper.view && paper.view._element === canvas) {
		 	return paper.PaperScope.get(canvas);
		}

		var scope = paper.PaperScope.get(canvas) || new paper.PaperScope().setup(canvas);
		var code = paperScriptFunction.toString().replace(/^function[\w\s()]*{/, '').replace(/}$/, '')
		canvas.id = scope._id;

		scope.PaperScript.evaluate(code, scope);

		return scope;
	}


	return {
		createPaperScript: createPaperScript,

		createDomNode: function(str, tmpElement) {
			tmpElement = document.createElement(tmpElement || 'div');
			tmpElement.innerHTML = str;
			return tmpElement.firstChild;
		}
	}
});
