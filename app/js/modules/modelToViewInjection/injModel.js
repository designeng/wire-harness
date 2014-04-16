var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone"], function(Marionette) {
  var InjModel, _ref;
  return InjModel = (function(_super) {
    __extends(InjModel, _super);

    function InjModel() {
      _ref = InjModel.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    InjModel.prototype.initialize = function() {
      var _this = this;
      return setTimeout(function() {
        _this.set("one", 123);
        return console.log("seted to 123");
      }, 1000);
    };

    return InjModel;

  })(Backbone.Model);
});
