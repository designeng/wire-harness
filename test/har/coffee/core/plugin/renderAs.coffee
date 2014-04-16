# renderAsRoot plugin

# render target in application page region

define [
    "when"
    "marionette"
    "underscore"
    "core/bootApp"
], (When, Marionette, _, app) ->

    class Normalized extends Marionette.Layout
        template: "<div/>"
        onRender: ->
            @$el.append(Marionette.getOption @, "node")

    return (options) ->

        rootViewDeferred = When.defer()

        # TODO: it must be adapted for other browsers
        normalizeView = (view) ->
            if !view.render and view instanceof HTMLElement
                view = new Normalized({node: view})
            return view

        doRenderAsPage = (facet, options, wire) ->
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

        renderAsRootFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsPage(facet, options, wire))

        renderAsChildFacet = (resolver, facet, wire) ->
            resolver.resolve(doRenderAsChild(facet, options, wire))

        facets: 
            renderAsRoot:
                ready: renderAsRootFacet
            renderAsChild:
                ready: renderAsChildFacet