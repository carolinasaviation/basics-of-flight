define([
	'../lib/helpers',
	'../views/quiz',
], function(helper, view) {
	'use strict';

	function Quiz() {
		this.questions = [];
		this['correct-count'] = 0;
		this['correct-total'] = 0;
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
			obj.isActive = this.questions.length === 0;
			this['correct-total'] = this.questions.length;
			this.questions.push(obj);
		},

		render: function() {
			var self = this;
			var quizCard = helper.createDomNode(view({ correctAnswers: i18n.quiz.correctAnswers, questions: this.questions }));
			['count', 'total'].forEach(function(type) {
				quizCard.querySelector('.quiz__correct-' + type).textContent = self['correct-' + type];
			});


			return quizCard;
		}

	};

	return Quiz;
});
