var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone"], function(Backbone) {
  var TableBodyCollection, _ref;
  return TableBodyCollection = (function(_super) {
    __extends(TableBodyCollection, _super);

    function TableBodyCollection() {
      _ref = TableBodyCollection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    TableBodyCollection.prototype.initialize = function() {
      var items,
        _this = this;
      items = [
        {
          one: "ONE",
          two: "TWO"
        }, {
          one: "ONE1",
          two: "TWO1"
        }, {
          one: "ONE2",
          two: "TWO2"
        }
      ];
      this.add(items);
      setTimeout(function() {
        return _this.add(new Backbone.Model({
          one: 123,
          two: 234
        }));
      }, 1000);
      return setTimeout(function() {
        return _this.add(new Backbone.Model({
          one: 456,
          two: "abc"
        }));
      }, 2000);
    };

    return TableBodyCollection;

  })(Backbone.Collection);
});
