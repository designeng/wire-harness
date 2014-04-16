define [
    "wire"
    "./routeMapFake.js"
], (wire, routeMapFake) ->

    wire({
        $plugins:[
            # "wire/debug"
        ]
        routeMapParser:
            create: "core/modules/root/routeProcessor"
            properties:
                routeMap: routeMapFake
            ready:
                startProcessing: {}
    }).then (ctx) ->
        console.log "CTX", ctx
    .otherwise (err) ->
        console.log "ERR:", err