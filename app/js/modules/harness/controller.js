define(["require", "when", "jquery"], function(require, When, $) {
  var HarnessController;
  return HarnessController = (function() {
    function HarnessController() {}

    HarnessController.prototype.global = void 0;

    HarnessController.prototype.harnessUrl = void 0;

    HarnessController.prototype.getRequireJsConfig = void 0;

    HarnessController.prototype.getBaseUrl = void 0;

    HarnessController.prototype.amdLoaderUrl = "/bower_components/requirejs/require.js";

    HarnessController.prototype.requireConfig = "/app/js/requireConfig.js";

    HarnessController.prototype.callbackKey = 'harnessCallback';

    HarnessController.prototype.onItemClick = function(item) {
      var harness, i, iframe, iframes, loadConfig, urlToLoad,
        _this = this;
      urlToLoad = this.getBaseUrl() + item.url;
      i = 0;
      iframes = document.getElementsByTagName('iframe');
      while (i < iframes.length) {
        iframes[i].parentNode.removeChild(iframes[i]);
        i++;
      }
      iframe = document.body.ownerDocument.createElement('iframe');
      document.body.appendChild(iframe);
      iframe.src = urlToLoad;
      harness = iframe.contentWindow;
      loadConfig = function() {
        var doc, scriptConfig;
        doc = window.frames[0].document;
        scriptConfig = doc.createElement('script');
        scriptConfig.onload = function() {
          var _require;
          _require = harness.require;
          return _require(["wire"], function(wire) {
            return harness.runTests(wire);
          });
        };
        scriptConfig.onerror = function() {
          return console.log('could not load requireConfig!');
        };
        scriptConfig.src = _this.requireConfig;
        return (doc.head || doc.getElementsByTagName('head')[0]).appendChild(scriptConfig);
      };
      return iframe.onload = function() {
        var doc, script;
        doc = window.frames[0].document;
        script = doc.createElement('script');
        script.onload = function() {
          return loadConfig();
        };
        script.onerror = function() {
          return console.log('could not load amdLoader!');
        };
        script.src = _this.amdLoaderUrl;
        return (doc.head || doc.getElementsByTagName('head')[0]).appendChild(script);
      };
    };

    HarnessController.prototype.onReady = function() {
      return this.conf = this.getRequireJsConfig();
    };

    HarnessController.prototype.loadHarness = function(playground) {
      return this.playground = playground.$el.find(".playground");
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

    HarnessController.prototype.loadHarnessInIframe = function(url, node) {
      return this.global[this.callbackKey] = function(cb) {
        var harness,
          _this = this;
        harness = iframe.contentWindow;
        document.title = 'harness: ' + harness.document.title;
        return this.loadAMDLoader(harness, function() {
          console.log(">>>>>>>>");
          delete _this.global[_this.callbackKey];
          require = harness.require;
          alert("require::", require);
          require(commonCfg);
          _this.loaded();
          return cb();
        });
      };
    };

    return HarnessController;

  })();
});
