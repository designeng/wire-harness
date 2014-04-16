var __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

define(["marionette"], function(Marionette) {
  var SwitchItemView, _ref;
  return SwitchItemView = (function(_super) {
    __extends(SwitchItemView, _super);

    function SwitchItemView() {
      _ref = SwitchItemView.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    SwitchItemView.prototype.itemSelectedClass = void 0;

    SwitchItemView.prototype.itemFocusedClass = void 0;

    SwitchItemView.prototype.template = '<input type="radio" name="{{inputName}}"/><label for="{{inputName}}">{{inputNameValue}}</label>';

    SwitchItemView.prototype.className = function() {
      return this.defaultClassName("switchControlItem");
    };

    SwitchItemView.prototype.templateHelpers = {
      inputName: function() {
        var keys, name, _name;
        if (!(name = this.name)) {
          return _.uniqueId("radio_");
        } else {
          if (_.isString(this.name)) {
            _name = this.name;
            this.name = {};
            this.name[_name] = _name;
          }
          keys = _.keys(this.name);
          return keys[0].toLowerCase();
        }
      },
      inputNameValue: function() {
        var keys, name;
        if (!(name = this.name)) {
          return _.uniqueId("radio_") + "_Value";
        } else {
          keys = _.keys(this.name);
          return this.name[keys[0]];
        }
      }
    };

    SwitchItemView.prototype.events = {
      "click": "onClick",
      "focus :input": "onInputFocus",
      "blur :input": "onInputBlur"
    };

    SwitchItemView.prototype._attrPrefix = "";

    SwitchItemView.prototype.initialize = function() {};

    SwitchItemView.prototype.onRender = function() {
      this.input = this.$el.find("input");
      this.label = this.$el.find("label");
      this.index = this.model.get("index");
      _.bindAll(this, "onInputFocus");
      if (this.index !== 0) {
        this.input.remove();
      }
      return this.$el.addClass("item" + this.index);
    };

    SwitchItemView.prototype.onClick = function() {
      this.check();
      return this.trigger("checked");
    };

    SwitchItemView.prototype.check = function() {
      this.input.attr("checked", "checked");
      this.label.addClass(this.itemSelectedClass);
      return this.label.removeClass(this.itemFocusedClass);
    };

    SwitchItemView.prototype.unCheck = function() {
      this.input.removeAttr("checked");
      this.label.removeClass(this.itemSelectedClass);
      return this.label.removeClass(this.itemFocusedClass);
    };

    SwitchItemView.prototype.onInputFocus = function() {
      if (this.index === 0) {
        this.trigger("infocus", this.index);
      }
      return this.label.addClass(this.itemFocusedClass);
    };

    SwitchItemView.prototype.onInputBlur = function() {
      if (this.index === 0) {
        this.trigger("inblur");
      }
      return this.label.removeClass(this.itemFocusedClass);
    };

    return SwitchItemView;

  })(Marionette.ItemView);
});
