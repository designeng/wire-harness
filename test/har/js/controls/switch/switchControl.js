var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["backbone", "marionette", "meld"], function(Backbone, Marionette, Meld) {
  var NoItemsView, SwitchControlView, _ref;
  NoItemsView = Marionette.ItemView.extend({
    template: 'No options'
  });
  return SwitchControlView = (function(_super) {
    __extends(SwitchControlView, _super);

    function SwitchControlView() {
      _ref = SwitchControlView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SwitchControlView.prototype.template = "<ul>${loc_test}</ul>";

    SwitchControlView.prototype.className = function(res) {
      return "switchControl";
    };

    SwitchControlView.prototype.itemView = void 0;

    SwitchControlView.prototype.emptyView = NoItemsView;

    SwitchControlView.prototype.onUp = function() {
      return console.log("ON UP!!!", this);
    };

    SwitchControlView.prototype.onDown = function() {
      return console.log("ON down!!!", this);
    };

    SwitchControlView.prototype.onLeft = function() {
      return console.log("on LEFT", this);
    };

    SwitchControlView.prototype.onRight = function() {
      return console.log("on RIGHT", this);
    };

    SwitchControlView.prototype.onSpace = function() {
      return console.log("on Space", this);
    };

    SwitchControlView.prototype.onTab = function() {
      return console.log("on Tab", this);
    };

    SwitchControlView.prototype.initialize = function() {
      this.model = new Backbone.Model({
        name: Marionette.getOption(this, "name")
      });
      this.collection = new Backbone.Collection();
      this.on("itemview:checked", this.onItemClick);
      this.on("itemview:infocus", this.onInFocus);
      this.on("itemview:inblur", this.onInBlur);
      return this.inFocus = false;
    };

    SwitchControlView.prototype.show = function(target) {
      console.log("show after init", target);
      return target;
    };

    SwitchControlView.prototype.onBeforeRender = function() {
      var modIndex, option, optionModel, _i, _len, _ref1;
      modIndex = 0;
      _ref1 = this.inputOptions;
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        option = _ref1[_i];
        optionModel = new Backbone.Model({
          name: option,
          index: modIndex++
        });
        this.collection.add(optionModel);
      }
      if (this.collection.length) {
        return this.currentIndex = 0;
      }
    };

    SwitchControlView.prototype.onRender = function() {
      if (!this._showInputs) {
        this.hideInputs();
      }
      if (_.isNumber(this._startIndex)) {
        return this.chooseItem(this._startIndex);
      }
    };

    SwitchControlView.prototype.onHtmlClick = function(e) {
      if ($.contains(this.el, e.target)) {
        return this.onInsideClick();
      } else {
        return this.onOutClick();
      }
    };

    SwitchControlView.prototype.hideInputs = function() {
      var _this = this;
      return this.children.each(function(item) {
        if (item.model.get("index") === 0) {
          return item.input.addClass("switchItemInput__hidden");
        } else {
          return item.input.hide();
        }
      });
    };

    SwitchControlView.prototype.onInFocus = function(index) {
      return this.inFocus = true;
    };

    SwitchControlView.prototype.onInBlur = function() {
      return this.inFocus = false;
    };

    SwitchControlView.prototype.onInsideClick = function() {
      return this.inFocus = true;
    };

    SwitchControlView.prototype.onOutClick = function() {
      return this.inFocus = false;
    };

    SwitchControlView.prototype.onItemClick = function(itemview) {
      this.inFocus = true;
      this.currentIndex = itemview.model.get("index");
      return this.chooseItem(this.currentIndex);
    };

    SwitchControlView.prototype.afterKeyPressed = function(key) {
      console.log("KEY PRESSED", key);
      if (!this.inFocus) {
        return;
      }
      if (key === "space") {
        this.chooseItem(this.currentIndex);
      }
      if (key === "left" || key === "up") {
        this.choosePrevious();
      }
      if (key === "down" || key === "right") {
        return this.chooseNext();
      }
    };

    SwitchControlView.prototype.choosePrevious = function() {
      if (this.currentIndex > 0) {
        return this.chooseItem(--this.currentIndex);
      }
    };

    SwitchControlView.prototype.chooseNext = function() {
      if (this.currentIndex < this.collection.length - 1) {
        return this.chooseItem(++this.currentIndex);
      }
    };

    SwitchControlView.prototype.chooseItem = function(index) {
      var item;
      if (_.isNumber(this.checkedItemIndex)) {
        this.children.findByIndex(this.checkedItemIndex).unCheck();
      }
      item = this.children.findByIndex(index);
      item.check();
      this.checkedItemIndex = index;
      this.model.set("name", this.model.get("name"));
      this.model.set("data", _.keys(item.model.get("name"))[0]);
      return item;
    };

    SwitchControlView.prototype.onClose = function() {
      var _this = this;
      return _.each(this.keyEvents, function(evt) {
        return _this.keyOff(evt);
      });
    };

    return SwitchControlView;

  })(Marionette.CompositeView);
});
