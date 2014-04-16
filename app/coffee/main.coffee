require [
    "wire"
    "wire!bootstrapSpec"
    "routerMainSpec"
], (wire, bootstrapCTX, routerMainSpec) ->

    bootstrapCTX.wire(
        routerMainSpec
    ).then (resultCTX) ->
        console.log "resultCTX::::", resultCTX
