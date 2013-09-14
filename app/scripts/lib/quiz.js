define([
	'../lib/helpers',
	'../views/quiz',
	'i18n'
], function(helper, view, i18n) {
	'use strict';

	function Quiz(questions) {
		this.questions = [];
		this['correct-count'] = 0;
		this['correct-total'] = 0;

		questions.forEach(this.addQuestion.bind(this));
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
		},

		appendTo: function(el) {
			el.appendChild(this.render());
		}

	};

	return Quiz;
});
