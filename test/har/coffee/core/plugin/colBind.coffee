define [
    "marionette"
    "when"
    "backbone.collectionbinder"
], (Marionette, When) ->

    return (options) ->

        # bindToCollection = (resolver, componentDefinition, wire) ->
        #     createRouter(componentDefinition, wire).then (tempRouter) ->
        #         routeBinding tempRouter, componentDefinition, wire
        #         resolver.resolve(tempRouter)
        #     , (error) ->
        #         console.error error.stack

        collectionBinders = []

        doBind = (facet, options, wire) ->
            target = facet.target

            # it was
            # return When(wire(initBindOptions(facet.options, options, wire.resolver)),

            # resolver.isRef: https://github.com/cujojs/wire/blob/master/lib/resolver.js

            return When(wire({options: facet.options}),
                    (options) ->
                        # options.options.to must be refactored (look at cola!)

                        to = options.options.to
                        bindings = options.options.bindings

                        throw new Error('plugin/colBind: "to" must be specified') unless to
                        throw new Error('plugin/colBind: "bindings" must be specified') unless bindings

                        rowHtml = "<tr><td data-name='one'></td><td data-name='two'></td></tr>"
                        elManagerFactory = new Backbone.CollectionBinder.ElManagerFactory(rowHtml, "data-name")
                        collectionBinder = new Backbone.CollectionBinder(elManagerFactory, {autoSort: true})

                        collectionBinders.push collectionBinder
                        
                        selector = bindings.selector
                        element = target.$el.find(selector)

                        collectionBinder.bind(to, element)
                        
                        return target
                )
    
        removeAll = (targets) ->
            for target in targets
                target.unbind()

        bindFacet = (resolver, facet, wire) ->
            resolver.resolve(doBind(facet, options, wire))

        context:
            ready: (resolver, wire) ->
                resolver.resolve()
            destroy: (resolver, wire) ->
                for colBinder in collectionBinders
                    colBinder.unbind()

                resolver.resolve()


        facets: 
            bind:
                ready: bindFacet
