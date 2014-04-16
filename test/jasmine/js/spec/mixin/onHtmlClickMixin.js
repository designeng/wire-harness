var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "marionette"], function(wire, Marionette) {
  var rootSpec;
  define("globalEvents", ["jquery", "underscore", "backbone"], function($, _, Backbone) {
    var GlobalEvents;
    GlobalEvents = (function() {
      function GlobalEvents() {}

      GlobalEvents.prototype.initialize = function() {
        return this.on("html:click", function() {
          return console.log("GlobalEvents");
        });
      };

      GlobalEvents.prototype.play = function(opt) {
        return console.log("PLAY", opt);
      };

      GlobalEvents.prototype.triggerEvent = function(ev) {
        return this.trigger(ev);
      };

      return GlobalEvents;

    })();
    GlobalEvents = _.extend(GlobalEvents.prototype, Backbone.Events);
    return GlobalEvents;
  });
  define("targetToMixin", ["marionette"], function(Marionette) {
    var TargetToMixin, onHtmlClick, _ref;
    onHtmlClick = jasmine.createSpy("onHtmlClick");
    return TargetToMixin = (function(_super) {
      __extends(TargetToMixin, _super);

      function TargetToMixin() {
        _ref = TargetToMixin.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TargetToMixin.prototype.template = "";

      TargetToMixin.prototype.initialize = function() {
        var _this = this;
        console.log("targetToMixin");
        return setTimeout(function() {
          return _this.trigger("html:click");
        }, 1000);
      };

      TargetToMixin.prototype.onHtmlClick = function() {
        return console.log("onHtmlClick");
      };

      return TargetToMixin;

    })(Marionette.Controller);
  });
  rootSpec = {
    globalEvents: {
      create: {
        module: "globalEvents"
      },
      ready: {
        "triggerEvent": "html:click"
      }
    },
    targetToMixin: {
      create: {
        module: "targetToMixin",
        listenTo: {
          globalEvents: {
            "html:click": "onHtmlClick"
          }
        }
      }
    },
    $plugins: ["wire/debug", "listenTo"]
  };
  return describe("After wire rootSpec context created", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(rootSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("targetToMixin", function(done) {
      expect(this.ctx.targetToMixin).toBeDefined();
      return done();
    });
  });
});
