define(["marionette", "baseInput", "inputError", "hbs!templates/control/inputText/inputTextTpl", "jquery.maskedinput", "jquery.placeholder"], function(Marionette, BaseInput, InputErrorControl, inputTextTpl) {
  var InputTextView;
  return InputTextView = BaseInput.extend({
    template: function() {
      return inputTextTpl;
    },
    events: {
      "click": "onClick",
      "keyup :input": "onKeyUp",
      "change :input": "onChange",
      "focus :input": "onFocus",
      "blur :input": "onBlur",
      "mouseover :input": "onOver",
      "mouseout :input": "onOut",
      "mouseout :input": "onOut"
    },
    initialize: function(options) {
      var eventBus;
      BaseInput.prototype.initialize.call(this);
      this.dataModel = this.getDataModel();
      this.context = Marionette.getOption(this, "context");
      this.applyProperties();
      this.currentValue = "";
      if (eventBus = Marionette.getOption(this, "eventBus")) {
        this.eventBus = eventBus;
      }
      return this.name = this.getInputName();
    },
    applyProperties: function() {
      var applyProperties;
      applyProperties = ["value", "disabled", "disabledClassName", "states", "mask", "placeHolder", "isValidValue", "inputErrorHandlerCid"];
      return this.applyModelProperties(applyProperties, {
        prefix: this._attrPrefix
      });
    },
    getDataModel: function() {
      var model;
      if (!(model = Marionette.getOption(this, "dataModel"))) {
        throw new Error("View option or model property 'dataModel' is not defined!");
      }
      return model;
    },
    getInputName: function() {
      var name;
      if (name = this.dataModel.get("inputName")) {
        return name;
      } else if (name = this.model.get("name")) {
        this.dataModel.set("inputName", name);
        return name;
      }
    },
    onRender: function() {
      this.input = this.$el.find("input");
      this.setValueAfterRender();
      if (this._mask) {
        this.input.mask(this._mask);
      }
      if (this.hint) {
        this.addRegion("hintRegion", ".hintWrapper");
      }
      if (this._disabled) {
        this.input.prop("disabled", true);
        this._isInputDisabled = true;
      }
      this.bindAfterRender();
      this.setState('passive');
      return this.inputErrorInit();
    },
    setValueAfterRender: function() {
      if (this._value) {
        return this.setValue(this._value);
      } else {
        return this.setPlaceholder();
      }
    },
    bindAfterRender: function() {
      var _this = this;
      this.dataModel.on("change", function(model) {
        return _this.context.trigger("input:data", {
          model: model
        });
      });
      return this.dataModel.on("validated", function(isValid, model, errors) {
        if (!isValid) {
          return _this.setState("invalid", errors);
        } else {
          _this.setState("valid");
          return _this.context.trigger("collect:data", _this.dataModel);
        }
      });
    },
    setPlaceholder: function(text) {
      if (this._placeHolder) {
        return this.input.addClass('placeholder').val(this.prepareLocalized(this._placeHolder, "string"));
      }
    },
    removePlaceholder: function() {
      if (this._placeHolder) {
        return this.input.removeClass('placeholder');
      }
    },
    onBlur: function() {
      if (!this.getValue().length) {
        return this.setPlaceholder();
      }
    },
    onOver: function() {
      if (this.hint) {
        return this.hintRegion.show(this.hint);
      }
    },
    onOut: function() {
      if (this.hint) {
        return this.hintRegion.close();
      }
    },
    onClick: function() {
      if (!this._isInputDisabled) {
        return this.resetValue();
      }
    },
    onFocus: function() {
      if (!this._isInputDisabled) {
        return this.resetValue();
      }
    },
    onKeyUp: function(e) {
      var inputValue;
      inputValue = $.trim($(e.currentTarget).val());
      if (inputValue === "") {
        return this.inputError.hide();
      }
      if (this.currentValue !== inputValue) {
        this.currentValue = inputValue;
        this.setDataModelValue(inputValue);
        if (!this._isValidValue) {
          this.dataModel.validate();
        }
        if (this.eventBus) {
          return this.eventBus.trigger("input:keyup", {
            value: this.currentValue
          });
        }
      }
    },
    onChange: function() {
      if (this._isValidValue) {
        return this.dataModel.validate();
      }
    },
    inputErrorInit: function() {
      if (!this._inputErrorHandlerCid) {
        this.$el.find(".inputErrorWrapper").replaceWith(this.inputError.render().$el);
        return this.inputError.hide();
      }
    },
    resetValue: function() {
      this.setState("valid");
      this.currentValue = "";
      this.setDataModelValue(this.currentValue);
      this.input.val(this.currentValue);
      this.setState("active");
      return this.removePlaceholder();
    },
    setState: function(state, errors) {
      if (state === "invalid") {
        this.input.addClass(this._states[state]["className"]);
        return this.inputError.show(errors);
      } else if (state === "valid") {
        this.input.removeClass(this._states["invalid"]["className"]);
        return this.inputError.hide();
      } else if (state === "passive") {
        return this.input.addClass("inputPlaceHolder");
      } else if (state === "active") {
        return this.input.removeClass("inputPlaceHolder");
      }
    },
    setValue: function(val) {
      this.currentValue = val;
      this.setDataModelValue(this.currentValue);
      return this.input.val(this.currentValue);
    },
    setDataModelValue: function(val) {
      return this.dataModel.set("data", val);
    },
    getValue: function() {
      return String(this.input.val());
    },
    getStates: function() {
      return String(this._states);
    },
    isEmpty: function() {
      return !$.trim(this.input.val());
    },
    setFocus: function() {
      return this.input.focus();
    }
  });
});
