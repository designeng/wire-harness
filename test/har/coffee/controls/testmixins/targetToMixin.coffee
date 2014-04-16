define [
    "marionette"
], (Marionette) ->

    class TargetToMixin extends Marionette.Controller
        template: ""

        initialize: ->
            console.log "targetToMixin"


        onHtmlClick: ->
            console.log "onHtmlClick ============"