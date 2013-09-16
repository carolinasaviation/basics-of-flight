define([
	'../lib/helpers',
	'../views/sectionCard',
	'../lib/quiz',
	'../lib/touch',
	'../config',
	'i18n'
], function(helper, card, Quiz, touch, config, i18n) {
	'use strict';

	function Section(name) {
		this.name = name || this.constructor.toString().match(/^function (\w+)/)[1];

		this.canvas = document.createElement('canvas');
		this.canvas.style.position = 'absolute';

		var tmp = document.createElement('div');
		tmp.innerHTML = card(i18n[this.name.toLowerCase()]);
		this.card = tmp.firstChild;
		this.handleTap = this.handleTap.bind(this);
		this.isActive = false;
		this.init();
	}

	Section.prototype = {
		raf: undefined,
		_page: undefined,
		_film: undefined,
		_quiz: undefined,
		tween: undefined,
		init: function init(){},

		page: function(page) {
			if (page) this._page = page;
			return this._page;
		},

		film: function(url) {
			this._film = url;
			return this;
		},

		quiz: function(questions) {
			this._quiz = new Quiz(questions);
			this._quiz.appendTo(this.card.querySelector('.card-content[data-role="quiz"]'));
			return this;
		},

		activate: function activate() {
			if (this.isActive) return false;

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, 'activate');

			if (!(this._page && this._page.element)) return;
			this.isActive = true;

			touch(this._page.element).on('tap', this.handleTap);

			this._page.rotateIn(this.card, 'north');
			var cessna = this._page.element.querySelector('.cessna');
			if (cessna) cessna.parentNode.removeChild(cessna);
			this.startInteraction();
		},

		deactivate: function deactivate() {
			if (!this.isActive) return false;

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, 'deactivate');

			if (!(this._page && this._page.element)) return;
			this.isActive = false;

			touch(this._page.element).off('tap', this.handleTap);

			this.stopInteraction();
		},

		startInteraction: function startInteraction() {
			TWEEN.removeAll();

			this.canvas.width = this._page.element.clientWidth;
			this.canvas.height = this._page.element.clientHeight - this.card.clientHeight;
			this._page.element.insertBefore(this.canvas, this._page.element.firstChild);

			if (this.interactive.bindings.el)
				this._page.element.insertBefore(this.interactive.bindings.el, this._page.element.firstChild);

			if (this.interactive.bindings.granger) {
				if (this.name === 'Weight') window.a = this.interactive;
				// recalc dimensions since it's instantiated without being onscreen
				this.interactive.bindings.granger.renderer._calculateDimensions();
				this.interactive.bindings.granger.sync();
			}

			this.tween = this.interactive.interactive.call(this, this.canvas);

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, 'startInteraction');
		},

		stopInteraction: function stopInteraction() {
			if (this.raf) cancelAnimationFrame(this.raf);
			this._page.element.removeChild(this.canvas);

			var tmp = this._page.element.querySelector('.interactive--sprite');
			if (tmp) tmp.parentNode.removeChild(tmp);

			tmp = this._page.element.querySelector('.interactive--image');
			if (tmp) tmp.parentNode.removeChild(tmp);

			if (this.interactive.bindings.el)
				this._page.element.removeChild(this.interactive.bindings.el);

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, 'stopInteraction');
		},

		show: function show(section, targetButton) {
			var el, fn;
			if (section !== 'film') {
				el = this.card.querySelector('.card-content--active');
				el.classList.remove('card-content--active');
				el.classList.add('card-content--inactive');

				el = this.card.querySelector('.card-content[data-role="' + section + '"]');
				el.classList.remove('card-content--inactive');
				el.classList.add('card-content--active');

				if (targetButton) {
					el = (targetButton.matches('.btn-go-back')) ?
						this.card.querySelector('.btn--is-active') :
						targetButton.parentNode.querySelector('.btn--is-active');

					if (el) el.classList.remove('btn--is-active');

					// go back to index selector doesn't get this class
					if (!targetButton.matches('.btn-go-back'))
						targetButton.classList.add('btn--is-active');
				}
			}

			else {
				// close modal
				fn = function fn(_el) {
					el || (el = _el);
					el.parentNode.removeChild(el);
					el.classList.remove('modal--active');
					el.textContent = '';
					touch(el).off('tap', window.closeModal);
				};

				el = document.createElement('div');
				el.classList.add('modal');
				el.innerHTML = '<iframe width="900" height="600" src="' + this._film + '" frameborder="0" allowfullscreen></iframe>';
				el.appendChild(document.createElement('div'));
				el.lastChild.classList.add('modal-backdrop');
				this._page.element.appendChild(el);
				el.classList.add('modal--active');
				setTimeout(function() {
					// hack to let the close Modal be called globally
					window.closeModal = fn;
					touch(el).on('tap', fn);
				}, 4);
			}

			if (config.logger.sectionLifeCycle)
				config.logger.sectionLifeCycleFn.call(this, 'show#' + section);
		},

		handleTap: function(e) {
			var matches = helper.toArray(this.card.querySelectorAll('[data-action]'))
				.filter(function(el) {
					return el.contains(e.target);
				}),
				action = (matches[0] || e.target).getAttribute('data-action'),
				args;

			if (action) {
				if ((matches[0] || e.target).matches('.btn--is-active')) return;

				args = action.split('-');
				action = args.shift();
				if (this[action])
					this[action].apply(this, args.concat(matches[0]));
			}

			// Either Hammer's tap event or dynamically adding these labels to the DOM is preventing
			// default behavior so we have to manually handle the radio selected state
			// which is fine since we're wanting to update the quiz's state and position the submit button
			else if (e.target.nodeName.toLowerCase() === 'label')
				this._quiz.select(e.target.getAttribute('for'));
			else if (e.target.nodeName.toLowerCase() === 'button')
				this._quiz.submit();
		}
	};

	return Section;
});

