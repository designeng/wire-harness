# reporter plugin

# use App as mediator

define [
    "core/bootApp"
], (app) ->

    return (options) ->

        doReport = (facet, options, wire) ->
            target = facet.target
            console.log "____TARGET:::::", target, app

        reportFacet = (resolver, facet, wire) ->
            resolver.resolve(doReport(facet, options, wire))

        context:
            ready: (resolver, wire) ->
                resolver.resolve()
            destroy: (resolver, wire) ->
                resolver.resolve()

        facets: 
            report:
                ready: reportFacet