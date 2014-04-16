var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["wire", "marionette"], function(wire, Marionette) {
  var rootSpec;
  define("tableBodyCollection", ["backbone"], function(Backbone) {
    var TableBodyCollection, _ref;
    return TableBodyCollection = (function(_super) {
      __extends(TableBodyCollection, _super);

      function TableBodyCollection() {
        _ref = TableBodyCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      TableBodyCollection.prototype.initialize = function() {
        var items;
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
        return this.add(items);
      };

      return TableBodyCollection;

    })(Backbone.Collection);
  });
  define("table", ["marionette"], function(Marionette) {
    var Table, _ref;
    return Table = (function(_super) {
      __extends(Table, _super);

      function Table() {
        _ref = Table.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Table.prototype.template = "";

      Table.prototype.initialize = function() {
        return console.log("table");
      };

      return Table;

    })(Marionette.Layout);
  });
  define("tableSpec", function() {
    var tableSpec;
    return tableSpec = {
      collection: {
        create: {
          module: "tableBodyCollection"
        }
      },
      table: {
        create: {
          module: "table"
        }
      }
    };
  });
  define("filterCollectionData", function() {
    var filterData;
    return filterData = [{}];
  });
  define("testDecorator", [], function() {
    var testDecorator;
    return testDecorator = (function() {
      function testDecorator() {}

      testDecorator.prototype.testDecoratorMethod = function() {
        return console.log("testDec");
      };

      return testDecorator;

    })();
  });
  define("filter", ["jquery", "marionette"], function($, Marionette) {
    var Filter;
    return Filter = (function() {
      function Filter() {}

      Filter.prototype.template = "";

      Filter.prototype.initialize = function() {
        return console.log("Filter");
      };

      return Filter;

    })();
  });
  rootSpec = {
    keyDecorator: {
      create: {
        module: "testDecorator"
      }
    },
    filter: {
      create: {
        module: "filter"
      },
      mixin: [
        {
          $ref: 'keyDecorator'
        }
      ]
    },
    table: {
      wire: "tableSpec"
    },
    $plugins: ["wire/debug"]
  };
  return describe("After wire filterSpec context created", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(rootSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("filter", function(done) {
      this.ctx.filter.testDecoratorMethod();
      expect(this.ctx.filter.testDecoratorMethod).toBeDefined();
      return done();
    });
  });
});
