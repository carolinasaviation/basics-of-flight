define([
	'../lib/helpers',
	'../views/quiz',
	'i18n'
], function(helper, view, i18n) {
	'use strict';

	var NUMBER_OF_ANSWERS = 3;
	var RESULT_TIMEOUT_DELAY = 5000;
	var BEM_PREFIX = 'col__quiz-';

	/**
	 * Creates a new Quiz
	 * @constructor
	 *
	 * @param Array questions questions array of objects. { question: String, answers: Array }
	 * @param Array [answers]
	 */
	function Quiz(questions, answers) {
		this.element = null;
		this.questions = [];
		this['correct-count'] = 0;
		this['correct-total'] = 0;

		var self = this;
		questions.forEach(function(question, i) {
			self.addQuestion(question, !!answers ? answers[i] : undefined);
		});
	}

	Quiz.prototype = {
		constructor: Quiz,

		/**
		 * Add a question object to the instance
		 *
		 * @param {Object} question the question/answer object
		 * @param {String} [obj.question] the question
		 * @param {Array} [obj.answers] array of answers
		 */
		addQuestion: function(question, answer) {
			question.isActive = this.questions.length === 0;
			this['correct-total'] = this.questions.length;
			this.questions.push(question);
		},

		/**
		 * Create first question DOM node
		 *
		 * @return {Node} this.element question node
		 */
		render: function() {
			this.active = this.questions[0];
			this.checked = null;
			this.element = helper.createDomNode(view({ correctAnswers: i18n.t.correctAnswers, questions: this.questions, t: i18n.t }));
			/*
			['count', 'total'].forEach(function(type) {
				self.element.querySelector('.quiz__correct-' + type).textContent = self['correct-' + type];
			});
		  */

			return this.element;
		},

		/**
		 * Select question.
		 * Set checked attribute and store currently selected answer.
		 *
		 * @return Quiz instance
		 */
		select: function(id) {
			this.hideNotification();

			if (this.checked) this.checked.removeAttribute('checked');
			this.checked = document.getElementById(id);
			this.checked.setAttribute('checked', 'checked');
			this.element.querySelector('button').style.top = 100 / NUMBER_OF_ANSWERS * this.checked.value + '%';

			return this;
		},


		/**
		 * Submit the form and show success or error message.
		 *
		 * @return Quiz instance
		 */
		submit: function() {
			var self = this;
			var selector = BEM_PREFIX + 'result--';
			var status = 'error';

			var element;

			if (+this.checked.value === this.active.correctAnswer)
				status = 'success';


			element = this.element.querySelector('.' + selector + status);
			this.showNotification(element);
			setTimeout(function () {
				self.hideNotification(element);
			}, RESULT_TIMEOUT_DELAY);

			return this;
		},

		/**
		 * Add appropriate active class to notification element
		 *
		 * @param Node element the notification html node
		 *
		 * @return Quiz instance
		 */
		showNotification: function(element) {
			element.classList.add(BEM_PREFIX + 'result--' + 'isActive');
			return this;
		},

		/**
		 * Remove active class from currently active notification element
		 *
		 * @param Node [element] the notification html node
		 *
		 * @return Quiz instance
		 */
		hideNotification: function(element) {
			if (typeof element === 'undefined')
				element = this.element.querySelector('.' + BEM_PREFIX + 'result--' + 'isActive');

			if (element)
				element.classList.remove(BEM_PREFIX + 'result--' + 'isActive');
			return this;
		},

		/**
		 * Append current question to an element
		 *
		 * @param Node el element to render quiz into
		 * @return Quiz instance
		 */
		appendTo: function(el) {
			el.appendChild(this.render());

			return this;
		}

	};

	return Quiz;
});
