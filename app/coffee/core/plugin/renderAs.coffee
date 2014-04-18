# renderAsRoot plugin

# render target in application page region
# if afterRender is defined in facet options, reference will be invoked with normalized view as argument

define [
    "when"
    "wire/lib/connection"
    "marionette"
    "underscore"
    "core/bootApp"
], (When, connection, Marionette, _, app) ->

    WhenAll = When.all

    class Normalized extends Marionette.Layout
        template: "<div/>"
        onRender: ->
            @$el.append(Marionette.getOption @, "node")

    return (options) ->

        connections = []

        rootViewDeferred = When.defer()
        childViewDeferred = When.defer()

        invocation = (target, invoke, wire) ->                

            invokeSplitted = invoke.$ref.split(".")
            objectRef = invokeSplitted[0]
            method = invokeSplitted[1]

            if invoke = wire.resolver.isRef(invoke)
                objectPromise = wire.resolveRef(objectRef)
                When(objectPromise, (obj) ->
                    if _.isObject obj and method and obj[method]
                        obj[method](target)
                    else if _.isFunction obj
                        obj(target)
                    else if _.isObject obj and !method
                        throw "method is not specified in object"
                )
            else
                console.log "nothing to invoke - not reference"

        # TODO: it must be adapted for other browsers
        normalizeView = (view) ->
            if !view.render and view instanceof HTMLElement
                view = new Normalized({node: view})
            return view

        doRenderAsRoot = (facet, options, wire) ->
            view = facet.target
            afterRender = facet.options.afterRender

            view = normalizeView view

            if afterRender
                When(rootViewDeferred.promise).then(invocation(view, afterRender, wire))

            app.renderAsRoot view

            rootViewDeferred.resolve(view)

        doRenderAsChild = (facet, options, wire) ->
            childView = facet.target
            afterRender = facet.options.afterRender

            childView = normalizeView childView

            if afterRender
                When(childViewDeferred.promise).then(invocation(childView, afterRender, wire))

            return When(rootViewDeferred.promise).then(
                (rootView) ->
                    # not ideal, but works
                    # region class name and region name must depends on target name - facet.id
                    $("<div class='#{facet.id}Wrapper'></div>").appendTo(rootView.el)
                    rootView.addRegion facet.id + "Region", ".#{facet.id}Wrapper"
                    rootView[facet.id + "Region"].show childView
                    childViewDeferred.resolve(childView)
            ).otherwise(
                # does not work as error throw
                (error) ->
                    throw "rootView does not resolved, did you assigned renderAsRoot component?"
            )

        renderAsRootFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsRoot(facet, options, wire))

        renderAsChildFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsChild(facet, options, wire))

        context:
            destroy: (resolver) ->
                connection.removeAll(connections)
                resolver.resolve()

        facets: 
            renderAsRoot:
                ready: renderAsRootFacet
            renderAsChild:
                ready: renderAsChildFacet