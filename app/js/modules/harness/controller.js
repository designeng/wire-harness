define(["require", "when", "jquery"], function(require, When, $) {
  var HarnessController;
  return HarnessController = (function() {
    function HarnessController() {}

    HarnessController.prototype.global = void 0;

    HarnessController.prototype.harnessUrl = void 0;

    HarnessController.prototype.harnessPlayground = void 0;

    HarnessController.prototype.amdLoaderUrl = "/bower_components/requirejs/require.js";

    HarnessController.prototype.callbackKey = 'harnessCallback';

    HarnessController.prototype.onReady = function() {
      console.log("READY");
      return console.log("URL::", this.harnessUrl);
    };

    HarnessController.prototype.loadHarness = function(root) {
      return root.$el.find(".playground").attr("src", this.harnessUrl);
    };

    HarnessController.prototype.afterChildLoad = function(target) {
      return console.log("_____afterChildLoad", target);
    };

    HarnessController.prototype.loadAMDLoader = function(harness, cb) {
      var doc, script;
      doc = harness.document;
      script = doc.createElement('script');
      script.onload = cb;
      script.onerror = function() {
        return console.log('could not load AMDLoader!');
      };
      script.src = this.amdLoaderUrl;
      console.log("_____@amdLoaderUrl", this.amdLoaderUrl);
      return (doc.head || doc.getElementsByTagName('head')[0]).appendChild(script);
    };

    HarnessController.prototype.loaded = function() {
      return document.documentElement.className += ' loaded';
    };

    return HarnessController;

  })();
});
