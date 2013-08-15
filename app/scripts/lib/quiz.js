define([
	'../lib/helpers',
	'../views/quiz',
], function(helper, view) {
	'use strict';

	function Quiz() {
		this.questions = [];
	}

	Quiz.prototype = {
		constructor: Quiz,

		/**
		 * Add a question to the
		 *
		 * @param {Object} obj the question/answer object
		 * @param {String} [obj.question] the question
		 * @param {Array} [obj.answers] array of answers
		 */
		addQuestion: function(obj) {
			this.questions.push(obj);
		},

		render: function() {
			return helper.createDomNode(view({ correctAnswers: i18n.quiz.correctAnswers, questions: this.questions }));
		}

	};

	return Quiz;
});
