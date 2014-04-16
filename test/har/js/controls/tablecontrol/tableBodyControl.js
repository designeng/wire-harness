var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var TableBodyControl, _ref;
  return TableBodyControl = (function(_super) {
    __extends(TableBodyControl, _super);

    function TableBodyControl() {
      _ref = TableBodyControl.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableBodyControl.prototype.initialize = function() {
      return console.log("tableBodyControl inited");
    };

    TableBodyControl.prototype.onRender = function() {
      return console.log(" tableBodyControl rendered");
    };

    return TableBodyControl;

  })(Marionette.Layout);
});
