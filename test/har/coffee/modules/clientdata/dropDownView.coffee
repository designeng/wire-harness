define [
    "marionette"
], (Marionette) ->
    class DropDownView extends Marionette.Layout

        # @injected
        template: null

        initialize: ->
            console.log "dropDownView inited"

        onRender: ->
            console.log "dropDownView rendered"

        logProp: (prop) ->
            console.log "____PROP::::::::", @[prop]