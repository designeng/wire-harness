define [
    "backbone"
], (Marionette) ->
    class InjModel extends Backbone.Model

        initialize: ->
            setTimeout () =>
                    @set "one", 123
                    console.log "seted to 123"
                , 1000