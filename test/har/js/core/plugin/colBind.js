define(["marionette", "when", "backbone.collectionbinder"], function(Marionette, When) {
  return function(options) {
    var bindFacet, collectionBinders, doBind, removeAll;
    collectionBinders = [];
    doBind = function(facet, options, wire) {
      var target;
      target = facet.target;
      return When(wire({
        options: facet.options
      }), function(options) {
        var bindings, collectionBinder, elManagerFactory, element, rowHtml, selector, to;
        to = options.options.to;
        bindings = options.options.bindings;
        if (!to) {
          throw new Error('plugin/colBind: "to" must be specified');
        }
        if (!bindings) {
          throw new Error('plugin/colBind: "bindings" must be specified');
        }
        rowHtml = "<tr><td data-name='one'></td><td data-name='two'></td></tr>";
        elManagerFactory = new Backbone.CollectionBinder.ElManagerFactory(rowHtml, "data-name");
        collectionBinder = new Backbone.CollectionBinder(elManagerFactory, {
          autoSort: true
        });
        collectionBinders.push(collectionBinder);
        selector = bindings.selector;
        element = target.$el.find(selector);
        collectionBinder.bind(to, element);
        return target;
      });
    };
    removeAll = function(targets) {
      var target, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = targets.length; _i < _len; _i++) {
        target = targets[_i];
        _results.push(target.unbind());
      }
      return _results;
    };
    bindFacet = function(resolver, facet, wire) {
      return resolver.resolve(doBind(facet, options, wire));
    };
    return {
      context: {
        ready: function(resolver, wire) {
          return resolver.resolve();
        },
        destroy: function(resolver, wire) {
          var colBinder, _i, _len;
          for (_i = 0, _len = collectionBinders.length; _i < _len; _i++) {
            colBinder = collectionBinders[_i];
            colBinder.unbind();
          }
          return resolver.resolve();
        }
      },
      facets: {
        bind: {
          ready: bindFacet
        }
      }
    };
  };
});
