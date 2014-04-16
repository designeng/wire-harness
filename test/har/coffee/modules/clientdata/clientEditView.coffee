define [
    "marionette"
], (Marionette) ->
    class ClientEditView extends Marionette.Layout

        # @injected
        template: null

        initialize: ->
            console.log "ClientEditView inited"

        # hack, must be redesigned
        show: (target) ->
            return target

        log: (prop) ->
            console.log "PROP:", @[prop]

        getValues: ->
            res = @_form.getValues()
            console.log res