define [
    "marionette"
], (Marionette) ->
    class routeProcessor extends Marionette.Controller
        
        routeMap: null

        initialize: (options) ->
            console.log "routeProcessor", options, @routeMap

        logConfig: (opt) ->
            console.log "routeMap", opt, @routeMap