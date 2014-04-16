define [
    "marionette"
], (Marionette) ->
    class TargetView extends Marionette.Layout

        template: "<div>TEST TARGET VIEW</div>"

        initialize: ->
            console.log "TargetView inited"

        onRender: ->
            console.log "TargetView rendered"

            setTimeout () =>
                    console.log "@MODEL one", @model.get "one"
                , 2000

        show: ->
            return @