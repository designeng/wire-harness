var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var TableResultController, _ref;
  return TableResultController = (function(_super) {
    __extends(TableResultController, _super);

    function TableResultController() {
      _ref = TableResultController.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableResultController.prototype.initialize = function() {};

    return TableResultController;

  })(Backbone.Controller);
});
