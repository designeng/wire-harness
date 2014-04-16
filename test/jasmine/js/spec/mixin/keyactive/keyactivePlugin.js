var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "marionette"], function(wire, Marionette) {
  var rootSpec;
  define("switchControl", ["marionette"], function(Marionette) {
    var CompositeControlView, _ref;
    return CompositeControlView = (function(_super) {
      __extends(CompositeControlView, _super);

      function CompositeControlView() {
        _ref = CompositeControlView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      CompositeControlView.prototype.initialize = function() {};

      return CompositeControlView;

    })(Marionette.CompositeView);
  });
  rootSpec = {
    $plugins: ["wire/debug", "core/plugin/mousetrapPlugin"],
    view: {
      create: "switchControl",
      keys: ["up"]
    }
  };
  return describe("keyactivePlugin suite", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(rootSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("switchControl on methods", function(done) {
      _.extend(this.ctx.view, {
        onUp: function() {
          return console.log("ON UP!!!");
        }
      });
      console.log("@ctx.view.onUp", this.ctx.view.onUp);
      expect(this.ctx.view.onUp).toBeDefined();
      this.ctx.view.onUp = jasmine.createSpy("onUp");
      expect(this.ctx.view.onUp).toHaveBeenCalled();
      return done();
    });
  });
});
