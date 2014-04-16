var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["when", "marionette", "underscore", "core/bootApp"], function(When, Marionette, _, app) {
  var Normalized, count, _ref;
  count = 0;
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
    var doRenderAsColumn, doRenderAsPage, normalizeView, pageViewDeferred, renderAsColumnFacet, renderAsRootFacet;
    pageViewDeferred = When.defer();
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
      return pageViewDeferred.resolve(view);
    };
    doRenderAsColumn = function(facet, options, wire) {
      var columnView;
      columnView = facet.target;
      columnView = normalizeView(columnView);
      return When(pageViewDeferred.promise).then(function(pageView) {
        $("<div class='column" + count + "'></div>").appendTo(pageView.el);
        pageView.addRegion("column" + count + "Region", ".column" + count);
        pageView["column" + count + "Region"].show(columnView);
        return count++;
      }).otherwise(function(error) {
        throw "pageView does not resolved, did you assigned renderAsRoot component?";
      });
    };
    renderAsRootFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsPage(facet, options, wire));
    };
    renderAsColumnFacet = function(resolver, facet, wire) {
      return resolver.resolve(doRenderAsColumn(facet, options, wire));
    };
    return {
      facets: {
        renderAsRoot: {
          ready: renderAsRootFacet
        },
        renderAsColumn: {
          ready: renderAsColumnFacet
        }
      }
    };
  };
});
