var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["when", "wire/lib/connection", "marionette", "underscore", "core/bootApp"], function(When, connection, Marionette, _, app) {
  var Normalized, WhenAll, copyOwnProps, initBindOptions, _ref;
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
  copyOwnProps = function() {
    var dst, i, len, p, src;
    i = 0;
    dst = {};
    len = arguments.length;
    while (i < len) {
      src = arguments[i];
      if (src) {
        for (p in src) {
          if (src.hasOwnProperty(p)) {
            dst[p] = src[p];
          }
        }
      }
      i++;
    }
    return dst;
  };
  initBindOptions = function(incomingOptions, pluginOptions, resolver) {
    var options;
    if (resolver.isRef(incomingOptions)) {
      incomingOptions = {
        "in": incomingOptions
      };
    }
    options = copyOwnProps(incomingOptions, pluginOptions);
    return options;
  };
  return function(options) {
    var afterRenderAsChildFacet, afterRenderAsRootFacet, childViewDeferred, connections, doAfterRenderAsChildFacet, doAfterRenderAsRootFacet, doRenderAsChild, doRenderAsRoot, invokeRef, normalizeView, renderAsChildFacet, renderAsRootFacet, rootViewDeferred;
    connections = [];
    rootViewDeferred = When.defer();
    childViewDeferred = When.defer();
    invokeRef = function(target, invoke, wire) {
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
      var view;
      view = facet.target;
      view = normalizeView(view);
      app.renderAsRoot(view);
      return rootViewDeferred.resolve(view);
    };
    doRenderAsChild = function(facet, options, wire) {
      var childView;
      childView = facet.target;
      childView = normalizeView(childView);
      return When(rootViewDeferred.promise).then(function(rootView) {
        $("<div class='" + facet.id + "Wrapper'></div>").appendTo(rootView.el);
        rootView.addRegion(facet.id + "Region", "." + facet.id + "Wrapper");
        rootView[facet.id + "Region"].show(childView);
        return childViewDeferred.resolve(childView);
      }).otherwise(function(error) {
        throw "rootView does not resolved, did you assigned renderAsRoot component?";
      });
    };
    doAfterRenderAsRootFacet = function(facet, options, wire) {
      var invoke, target;
      target = facet.target;
      invoke = facet.options.invoke;
      return When(rootViewDeferred.promise).then(invokeRef(target, invoke, wire));
    };
    doAfterRenderAsChildFacet = function(facet, options, wire) {
      var invoke, target;
      target = facet.target;
      invoke = facet.options.invoke;
      return When(childViewDeferred.promise).then(invokeRef(target, invoke, wire));
    };
    renderAsRootFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsRoot(facet, options, wire));
    };
    renderAsChildFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsChild(facet, options, wire));
    };
    afterRenderAsRootFacet = function(resolver, facet, wire) {
      return resolver.resolve(doAfterRenderAsRootFacet(facet, options, wire));
    };
    afterRenderAsChildFacet = function(resolver, facet, wire) {
      return resolver.resolve(doAfterRenderAsChildFacet(facet, options, wire));
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
          "ready:before": renderAsRootFacet
        },
        renderAsChild: {
          "ready:before": renderAsChildFacet
        },
        afterRenderAsRoot: {
          "ready:after": afterRenderAsRootFacet
        },
        afterRenderAsChild: {
          "ready:after": afterRenderAsChildFacet
        }
      }
    };
  };
});
