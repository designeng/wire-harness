define [
    "underscore"
    "keysviewmixin"
    "when"
    "underscore.string"
], (_, keysViewMixin, When, _Str) ->

    bindKeyEventToMethod = (methodName) ->
        return @[methodName]

    getMethodName = (str) ->
        return "on" + _Str.classify.call(@, str)

    return (options) ->

        addKeyBehavior = (facet, options, wire) ->
            target = facet.target
            return When(wire({options: facet.options}),
                    (options) ->
                        wire.loadModule(keysViewMixin).then (Module) ->

                            _.extend target, Module

                            keys = facet.options

                            target.keys = {} unless _.isEmpty keys

                            _.each keys, (evt) =>   
                                # target.keyOn evt, bindKeyEventToMethod.call(target, getMethodName(evt))
                                target.keyOn evt, getMethodName(evt)

                            # _.each keys, (evt) =>   
                            #     # target.keyOn evt, bindKeyEventToMethod.call(target, getMethodName(evt))
                            #     target.keys[evt] = getMethodName(evt)

                            # for evt in keys
                            #     methodName = getMethodName evt

                            #     if ! target[methodName]
                            #         target[methodName] = (e) =>
                            #             console.log "EVENT:::", e
                                        # blank funcion

                        
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