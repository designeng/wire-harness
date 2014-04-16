var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["when", "marionette", "underscore", "core/bootApp"], function(When, Marionette, _, app) {
  var Normalized, _ref;
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
    var doRenderAsChild, doRenderAsPage, normalizeView, renderAsChildFacet, renderAsRootFacet, rootViewDeferred;
    rootViewDeferred = When.defer();
    normalizeView = function(view) {
      if (!view.render && view instanceof HTMLElement) {
        view = new Normalized({
          node: view
        });
      }
      return view;
    };
    doRenderAsPage = function(facet, options, wire) {
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
        return rootView[facet.id + "Region"].show(childView);
      }).otherwise(function(error) {
        throw "rootView does not resolved, did you assigned renderAsRoot component?";
      });
    };
    renderAsRootFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsPage(facet, options, wire));
    };
    renderAsChildFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsChild(facet, options, wire));
    };
    return {
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
