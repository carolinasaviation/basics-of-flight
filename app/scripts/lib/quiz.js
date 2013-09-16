define([
	'../lib/helpers',
	'../views/quiz',
	'i18n'
], function(helper, view, i18n) {
	'use strict';

	var NUMBER_OF_ANSWERS = 3;

	function Quiz(questions) {
		this.element = null;
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
			this.active = this.questions[0];
			this.checked = null;
			this.element = helper.createDomNode(view({ correctAnswers: i18n.t.correctAnswers, questions: this.questions }));
			/*
			['count', 'total'].forEach(function(type) {
				self.element.querySelector('.quiz__correct-' + type).textContent = self['correct-' + type];
			});
		  */

			return this.element;
		},

		select: function(id) {
			if (this.checked) this.checked.removeAttribute('checked');
			this.checked = document.getElementById(id);
			this.checked.setAttribute('checked', 'checked');
			this.element.querySelector('button').style.top = NUMBER_OF_ANSWERS / 100 * this.checked.value + '%';

			return this;
		},

		submit: function() {
			if (+this.checked.value === i) {
				// correct answer

			}
			else {

			}

			return this;
		},

		appendTo: function(el) {
			el.appendChild(this.render());
		}

	};

	return Quiz;
});
