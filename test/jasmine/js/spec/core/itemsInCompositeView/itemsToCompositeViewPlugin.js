var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "marionette"], function(wire, Marionette) {
  var itemsSpec;
  define("switcher", ["marionette"], function(Marionette) {
    var Switcher, _ref;
    return Switcher = (function(_super) {
      __extends(Switcher, _super);

      function Switcher() {
        _ref = Switcher.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Switcher.prototype.template = "<div>Switcher test</div>";

      Switcher.prototype.initialize = function() {
        return console.log("SWITCHER");
      };

      return Switcher;

    })(Marionette.Layout);
  });
  define("input", ["jquery", "marionette"], function($, Marionette) {
    var InputText, _ref;
    return InputText = (function(_super) {
      __extends(InputText, _super);

      function InputText() {
        _ref = InputText.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      InputText.prototype.template = "<input type='text' value='MyInput'/>";

      InputText.prototype.initialize = function() {
        return console.log("InputText");
      };

      InputText.prototype.updateValue = function() {
        return this.$el.find("input").val(this.value);
      };

      return InputText;

    })(Marionette.Layout);
  });
  itemsSpec = {
    switcher: {
      create: {
        module: "switcher"
      },
      ready: "render"
    },
    inputOne: {
      create: {
        module: "input"
      },
      properties: {
        value: "INPUT TEXT TEST"
      },
      ready: "updateValue"
    }
  };
  return describe("After wire context created", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(itemsSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    it("switcher", function(done) {
      expect(this.ctx.switcher).toBeDefined();
      return done();
    });
    return it("inputOne", function(done) {
      expect(this.ctx.inputOne).toBeDefined();
      return done();
    });
  });
});
