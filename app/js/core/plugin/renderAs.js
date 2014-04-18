var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["when", "wire/lib/connection", "marionette", "underscore", "core/bootApp"], function(When, connection, Marionette, _, app) {
  var Normalized, WhenAll, _ref;
  WhenAll = When.all;
  Normalized = (function(_super) {
    __extends(Normalized, _super);

    function Normalized() {
      _ref = Normalized.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Normalized.prototype.template = "<div/>";

    Normalized.prototype.onRender = function() {
      return this.$el.append(Marionette.getOption(this, "node"));
    };

    return Normalized;

  })(Marionette.Layout);
  return function(options) {
    var childViewDeferred, connections, doRenderAsChild, doRenderAsRoot, invocation, normalizeView, renderAsChildFacet, renderAsRootFacet, rootViewDeferred;
    connections = [];
    rootViewDeferred = When.defer();
    childViewDeferred = When.defer();
    invocation = function(target, invoke, wire) {
      var invokeSplitted, method, objectPromise, objectRef;
      invokeSplitted = invoke.$ref.split(".");
      objectRef = invokeSplitted[0];
      method = invokeSplitted[1];
      if (invoke = wire.resolver.isRef(invoke)) {
        objectPromise = wire.resolveRef(objectRef);
        return When(objectPromise, function(obj) {
          if (_.isObject(obj && method && obj[method])) {
            return obj[method](target);
          } else if (_.isFunction(obj)) {
            return obj(target);
          } else if (_.isObject(obj && !method)) {
            throw "method is not specified in object";
          }
        });
      } else {
        return console.log("nothing to invoke - not reference");
      }
    };
    normalizeView = function(view) {
      if (!view.render && view instanceof HTMLElement) {
        view = new Normalized({
          node: view
        });
      }
      return view;
    };
    doRenderAsRoot = function(facet, options, wire) {
      var afterRender, view;
      view = facet.target;
      afterRender = facet.options.afterRender;
      view = normalizeView(view);
      if (afterRender) {
        When(rootViewDeferred.promise).then(invocation(view, afterRender, wire));
      }
      app.renderAsRoot(view);
      return rootViewDeferred.resolve(view);
    };
    doRenderAsChild = function(facet, options, wire) {
      var afterRender, childView;
      childView = facet.target;
      afterRender = facet.options.afterRender;
      childView = normalizeView(childView);
      if (afterRender) {
        When(childViewDeferred.promise).then(invocation(childView, afterRender, wire));
      }
      return When(rootViewDeferred.promise).then(function(rootView) {
        $("<div class='" + facet.id + "Wrapper'></div>").appendTo(rootView.el);
        rootView.addRegion(facet.id + "Region", "." + facet.id + "Wrapper");
        rootView[facet.id + "Region"].show(childView);
        return childViewDeferred.resolve(childView);
      }).otherwise(function(error) {
        throw "rootView does not resolved, did you assigned renderAsRoot component?";
      });
    };
    renderAsRootFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsRoot(facet, options, wire));
    };
    renderAsChildFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsChild(facet, options, wire));
    };
    return {
      context: {
        destroy: function(resolver) {
          connection.removeAll(connections);
          return resolver.resolve();
        }
      },
      facets: {
        renderAsRoot: {
          ready: renderAsRootFacet
        },
        renderAsChild: {
          ready: renderAsChildFacet
        }
      }
    };
  };
});
