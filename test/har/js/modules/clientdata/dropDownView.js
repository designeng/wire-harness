var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var DropDownView, _ref;
  return DropDownView = (function(_super) {
    __extends(DropDownView, _super);

    function DropDownView() {
      _ref = DropDownView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    DropDownView.prototype.template = null;

    DropDownView.prototype.initialize = function() {
      return console.log("dropDownView inited");
    };

    DropDownView.prototype.onRender = function() {
      return console.log("dropDownView rendered");
    };

    DropDownView.prototype.logProp = function(prop) {
      return console.log("____PROP::::::::", this[prop]);
    };

    return DropDownView;

  })(Marionette.Layout);
});
