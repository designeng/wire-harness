var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var TargetView, _ref;
  return TargetView = (function(_super) {
    __extends(TargetView, _super);

    function TargetView() {
      _ref = TargetView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TargetView.prototype.template = "<div>TEST TARGET VIEW</div>";

    TargetView.prototype.initialize = function() {
      return console.log("TargetView inited");
    };

    TargetView.prototype.onRender = function() {
      var _this = this;
      console.log("TargetView rendered");
      return setTimeout(function() {
        return console.log("@MODEL one", _this.model.get("one"));
      }, 2000);
    };

    TargetView.prototype.show = function() {
      return this;
    };

    return TargetView;

  })(Marionette.Layout);
});
