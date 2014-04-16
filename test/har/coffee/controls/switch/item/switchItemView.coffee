define [
    "marionette"
], (Marionette) ->
    
    class SwitchItemView extends Marionette.ItemView

        # @injected
        itemSelectedClass: undefined

        # @injected
        itemFocusedClass: undefined

        logProp: ->
            console.log "log:::", @itemSelectedClass, @itemFocusedClass

        template: '<input type="radio" name="{{inputName}}"/><label for="{{inputName}}">{{inputNameValue}}</label>'

        className: ->
            # @defaultClassName("switchControlItem")
            return "switchControlItem"

        templateHelpers:
            inputName: ->
                console.log "templateHelpers ----"
                unless name = @name
                    _.uniqueId "radio_"
                else
                    # @name must be object anyway
                    if _.isString @name
                        _name = @name
                        @name = {}
                        @name[_name] = _name
                    keys = _.keys @name
                    return keys[0].toLowerCase()
            inputNameValue: ->
                unless name = @name
                    _.uniqueId("radio_") + "_Value" 
                else
                    keys = _.keys @name
                    return @name[keys[0]]

        events:
            "click"         : "onClick"
            "focus :input"  : "onInputFocus"
            "blur :input"   : "onInputBlur"

        initialize: ->

        log: (arg) ->
            console.log "READY:", arg

        onRender: ->

            @input = @$el.find("input")
            @label = @$el.find("label")

            @index  = @model.get "index"

            _.bindAll @, "onInputFocus"

            if @index != 0
                @input.remove()

            @$el.addClass("item#{@index}")

        onClick: ->
            @check()
            # uncheck others
            @trigger "checked"

        check: ->
            @input.attr "checked", "checked"
            @label.addClass @itemSelectedClass
            @label.removeClass @itemFocusedClass

        unCheck: ->
            @input.removeAttr("checked")
            @label.removeClass @itemSelectedClass
            @label.removeClass @itemFocusedClass

        onInputFocus: ->
            if @index == 0
                @trigger "infocus", @index
            @label.addClass @itemFocusedClass

        onInputBlur: ->
            if @index == 0
                @trigger "inblur"
            @label.removeClass @itemFocusedClass