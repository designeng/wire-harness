define [
    "marionette"
    "when"
    "backbone.collectionbinder"
], (Marionette, When) ->

    return (options) ->

        doBind = (facet, options, wire) ->
            target = facet.target

            return When(wire({options: facet.options}),
                    (options) ->

                        to = options.options.to

                        throw new Error('plugin/colBind: "to" must be specified') unless to

                        # FRP maybe?
                        target.collection = to.collection
                        
                        return target
                )

        bindFacet = (resolver, facet, wire) ->
            resolver.resolve(doBind(facet, options, wire))

        context:
            ready: (resolver, wire) ->
                resolver.resolve()

        # TODO: We need to decide what to do with a route is detroyed
        destroy: {}

        facets: 
            bind: 
                ready: bindFacet
