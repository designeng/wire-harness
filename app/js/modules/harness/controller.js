define(["require"], function(require) {
  var HarnessController;
  return HarnessController = (function() {
    function HarnessController() {}

    HarnessController.prototype.onReady = function() {
      return console.log("READY");
    };

    return HarnessController;

  })();
});
