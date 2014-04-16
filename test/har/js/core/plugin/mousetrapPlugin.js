define(["underscore", "mousetrap", "when", "underscore.string"], function(_, Mousetrap, When, _Str) {
  var bindKeyEventToMethod, getMethodName, noop;
  bindKeyEventToMethod = function(methodName) {
    return this[methodName];
  };
  getMethodName = function(str) {
    return "on" + _Str.classify.call(this, str);
  };
  noop = function() {};
  return function(options) {
    var addKeyBehavior, injectKeysBehaviorFacet;
    addKeyBehavior = function(facet, options, wire) {
      var target;
      target = facet.target;
      return When(wire({
        options: facet.options
      }), function(options) {
        var key, keys, methodName, _i, _len;
        keys = facet.options;
        for (_i = 0, _len = keys.length; _i < _len; _i++) {
          key = keys[_i];
          methodName = getMethodName(key);
          if (!target[methodName]) {
            target[methodName] = noop;
          }
          _.bindAll(target, methodName);
          Mousetrap.bind(key, target[methodName]);
        }
        return target;
      });
    };
    injectKeysBehaviorFacet = function(resolver, facet, wire) {
      return resolver.resolve(addKeyBehavior(facet, options, wire));
    };
    return {
      context: {
        "create:after": function(resolver, wire) {
          return resolver.resolve();
        }
      },
      facets: {
        keys: {
          "create:before": injectKeysBehaviorFacet
        }
      }
    };
  };
});
