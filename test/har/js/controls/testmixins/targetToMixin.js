var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var TargetToMixin, _ref;
  return TargetToMixin = (function(_super) {
    __extends(TargetToMixin, _super);

    function TargetToMixin() {
      _ref = TargetToMixin.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TargetToMixin.prototype.template = "";

    TargetToMixin.prototype.initialize = function() {
      return console.log("targetToMixin");
    };

    TargetToMixin.prototype.onHtmlClick = function() {
      return console.log("onHtmlClick ============");
    };

    return TargetToMixin;

  })(Marionette.Controller);
});
