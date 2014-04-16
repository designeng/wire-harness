define(["appinstance", "core/modules/root/rootModule"], function(App, rootModule) {
  App.addInitializer(function(options) {
    console.log("App.addInitializer", options);
    if (!options.regionSelector) {
      throw new Error("Application region not specified!");
    }
    App.addRegions({
      root: options.regionSelector,
      tableRegion: "#table"
    });
    return console.log("App.tableRegion", App.tableRegion);
  });
  App.getRegionManager = function() {
    return this._regionManager;
  };
  App.show = function(region, view) {
    return region.show(view);
  };
  App.showView = function(view) {
    this.tableRegion.show(view);
    return view;
  };
  App.log = function(msg) {
    return console.log("LOG");
  };
  return App;
});
