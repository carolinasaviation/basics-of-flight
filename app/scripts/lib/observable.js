define(function() {

	/*
	function defaults(o, o2) {
		Object.getOwnPropertyNames(o).forEach(function(attr) {
			if (o2[attr]) return;
			o2[attr] = o[attr];
		});
	}

  function Observable(prototype) {
    this._listeners = {};
    this._subscriptions = [];

		defaults(prototype, Observable.prototype);
  }
 */

  Observable = {

		_listeners: {},
		_subscriptions: [],
    isObservable: true,

    on: function(event, handler, context) {
      var listeners = this._listeners[event] = this._listeners[event] || [];
      listeners.push({
        handler: handler,
        context: context || this
      });
      return this;
    },

    off: function(event, handler) {
      var listeners = this._listeners[event];
      for (var i = 0; i < listeners.length; i++) {
        if (listeners[i].handler === handler) {
          listeners.splice(i, 1);
          return;
        }
      }
      return this;
    },

    once: function(event, handler) {
      this.on(event, function newHandler() {
        handler();
        this.off(event, newHandler);
      });
      return this;
    },

    removeAllListeners: function(event) {
      var listeners = this._listeners[event];
      if (listeners) listeners.length = 0;
      return this;
    },

    emit: function(event) {
      var listeners = this._listeners[event];
      if (!(listeners && listeners.length)) return;

      var args = Array.prototype.slice.call(arguments, 1);

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].handler.apply(listeners[i].context, args);
      }
      return this;
    },

    listenTo: function(target, events, handler) {
      var self = this;

      _.each(events.split(" "), function startListen(event) {
        target.on(event, handler);
        self._subscriptions.push({
          target: target,
          event: event,
          handler: handler
        });
      });
      return this;
    },

    stopListeningTo: function(target) {
      var self = this;
      this._subscriptions = _.compact(_.map(this._subscriptions, function(subscription) {
        if (subscription.target !== target) return subscription;
        subscription.target.off(subscription.event, subscription.handler);
      }));

      return this;
    }

  };

	return Observable;

});
