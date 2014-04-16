var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var routeProcessor, _ref;
  return routeProcessor = (function(_super) {
    __extends(routeProcessor, _super);

    function routeProcessor() {
      _ref = routeProcessor.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    routeProcessor.prototype.routeMap = null;

    routeProcessor.prototype.initialize = function(options) {
      return console.log("routeProcessor", options, this.routeMap);
    };

    routeProcessor.prototype.logConfig = function(opt) {
      return console.log("routeMap", opt, this.routeMap);
    };

    return routeProcessor;

  })(Marionette.Controller);
});
