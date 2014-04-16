define(["core/appinstance"], function(App) {
  var rootModule;
  return rootModule = App.module("RootModule", function(rootModule, App) {
    return rootModule.addInitializer(function(options) {
      return console.log("RootModule");
    });
  });
});
