define [
    "underscore"
    "mousetrap"
    "when"
    "underscore.string"
], (_, Mousetrap, When, _Str) ->

    bindKeyEventToMethod = (methodName) ->
        return @[methodName]

    getMethodName = (str) ->
        return "on" + _Str.classify.call(@, str)

    noop = () ->
        # blank

    return (options) ->

        addKeyBehavior = (facet, options, wire) ->
            target = facet.target
            return When(wire({options: facet.options}),
                    (options) ->

                        keys = facet.options 
                        
                        for key in keys
                            methodName = getMethodName(key)

                            if !target[methodName]
                                # must be overridden or injected in your object!
                                target[methodName] = noop

                            _.bindAll target, methodName

                            Mousetrap.bind key, target[methodName]       
                        
                        return target
                )

        injectKeysBehaviorFacet = (resolver, facet, wire) ->
            resolver.resolve(addKeyBehavior(facet, options, wire))

        context:
            "create:after": (resolver, wire) ->
                resolver.resolve()

        facets: 
            keys:
                "create:before": injectKeysBehaviorFacet