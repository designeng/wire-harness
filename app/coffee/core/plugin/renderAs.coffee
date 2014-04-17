# renderAsRoot plugin

# render target in application page region

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

    copyOwnProps = () ->
        i = 0
        dst = {}
        len = arguments.length
        while i < len
            src = arguments[i]
            if src
                for p of src
                    dst[p] = src[p]  if src.hasOwnProperty(p)
            i++
        return dst


    initBindOptions = (incomingOptions, pluginOptions, resolver) ->
        if resolver.isRef(incomingOptions)
            incomingOptions = { in: incomingOptions }

        options = copyOwnProps(incomingOptions, pluginOptions)
        return options


    return (options) ->

        connections = []

        rootViewDeferred = When.defer()

        # TODO: it must be adapted for other browsers
        normalizeView = (view) ->
            if !view.render and view instanceof HTMLElement
                view = new Normalized({node: view})
            return view

        doRenderAsRoot = (facet, options, wire) ->
            view = facet.target

            view = normalizeView view

            app.renderAsRoot view
            rootViewDeferred.resolve(view)

        doRenderAsChild = (facet, options, wire) ->
            childView = facet.target

            childView = normalizeView childView

            return When(rootViewDeferred.promise).then(
                (rootView) ->
                    # not ideal, but works
                    # region class name and region name must depends on target name - facet.id
                    $("<div class='#{facet.id}Wrapper'></div>").appendTo(rootView.el)
                    rootView.addRegion facet.id + "Region", ".#{facet.id}Wrapper"
                    rootView[facet.id + "Region"].show childView
            ).otherwise(
                # does not work as error throw
                (error) ->
                    throw "rootView does not resolved, did you assigned renderAsRoot component?"
            )

        doAfterRenderAsRootFacet = (facet, options, wire) ->
            target = facet.target

            return When(rootViewDeferred.promise).then(
                    () ->
                        When(wire(initBindOptions(facet.options, options, wire.resolver)), (options) ->
                            owner = options.in
                            owner[options.invoke](target)
                        )
                )

        renderAsRootFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsRoot(facet, options, wire))

        renderAsChildFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsChild(facet, options, wire))

        afterRenderAsRootFacet = (resolver, facet, wire) ->
            resolver.resolve(doAfterRenderAsRootFacet(facet, options, wire))

        context:
            destroy: (resolver) ->
                connection.removeAll(connections)
                resolver.resolve()

        facets: 
            renderAsRoot:
                ready: renderAsRootFacet
            renderAsChild:
                ready: renderAsChildFacet
            afterRenderAsRoot:
                "ready:after": afterRenderAsRootFacet