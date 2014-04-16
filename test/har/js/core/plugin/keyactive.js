define(["underscore", "keysviewmixin", "when", "underscore.string"], function(_, keysViewMixin, When, _Str) {
  var bindKeyEventToMethod, getMethodName;
  bindKeyEventToMethod = function(methodName) {
    return this[methodName];
  };
  getMethodName = function(str) {
    return "on" + _Str.classify.call(this, str);
  };
  return function(options) {
    var addKeyBehavior, injectKeysBehaviorFacet;
    addKeyBehavior = function(facet, options, wire) {
      var target;
      target = facet.target;
      return When(wire({
        options: facet.options
      }), function(options) {
        return wire.loadModule(keysViewMixin).then(function(Module) {
          var keys,
            _this = this;
          _.extend(target, Module);
          keys = facet.options;
          if (!_.isEmpty(keys)) {
            target.keys = {};
          }
          _.each(keys, function(evt) {
            return target.keyOn(evt, getMethodName(evt));
          });
          return target;
        });
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
