define(["core/bootApp"], function(app) {
  return function(options) {
    var doReport, reportFacet;
    doReport = function(facet, options, wire) {
      var target;
      target = facet.target;
      return console.log("____TARGET:::::", target, app);
    };
    reportFacet = function(resolver, facet, wire) {
      return resolver.resolve(doReport(facet, options, wire));
    };
    return {
      context: {
        ready: function(resolver, wire) {
          return resolver.resolve();
        },
        destroy: function(resolver, wire) {
          return resolver.resolve();
        }
      },
      facets: {
        report: {
          ready: reportFacet
        }
      }
    };
  };
});
