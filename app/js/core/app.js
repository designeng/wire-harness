define(["appinstance"], function(App) {
  App.addInitializer(function(options) {
    console.log("App.addInitializer", options);
    if (!options.regionSelector) {
      throw new Error("Application region not specified!");
    }
    return App.addRegions({
      application: options.regionSelector
    });
  });
  App.start = function(options) {
    return console.log("START", options);
  };
  App.show = function(view) {
    console.log(":::::::SHOW:::::::", view);
    return this.regionSelector.show(view);
  };
  return App;
});
