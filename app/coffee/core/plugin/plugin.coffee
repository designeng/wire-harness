`define([
    'backbone',
    'jquery',
    'when'
],
function(Backbone, JQuery, When){`

return (options) ->

    # list all existing Backbone routes 
    currentContext = null

    createRouter = (componentDefinition, wire) ->
        # Did user supply a new routerclass (instead of Backbone default)
        When.promise (resolve) ->
            if componentDefinition.options.routerModule
                # instantiate new class 
                wire.loadModule(componentDefinition.options.routerModule).then (Module) ->
                    tempRouter = new Module
                    resolve tempRouter
                , (error) ->
                    console.error error
            else
                # using default Backbone router
                tempRouter = new Backbone.Router()
                resolve tempRouter

    # TODO: Also clear destroy inner modules
    routeBinding = (tempRouter, componentDefinition, wire) ->
        for route, spec of componentDefinition.options.routes
            routeFn = ((spec) ->
                vars = {}
                if arguments.length > 1
                    # get all the variable names without the route itself
                    keys = route.split(':').slice(1)
                    for key, index in keys
                        vars[key.replace('/','')] = arguments[index+1]
                wire.loadModule(spec).then (specObj) ->
                    currentContext?.destroy()
                    specObj.vars = vars
                    wire.createChild(specObj).then (ctx) ->
                        currentContext = ctx
                        window.ctx = ctx
                    , (error) ->
                        console.error error.stack
            ).bind null, spec

            tempRouter.route route, route, routeFn


    initializeRouter = (resolver, componentDefinition, wire) ->
        createRouter(componentDefinition, wire).then (tempRouter) ->
            routeBinding tempRouter, componentDefinition, wire
            resolver.resolve(tempRouter)
        , (error) ->
            console.error error.stack

    context:
        ready: (resolver, wire) ->
            Backbone.history.stop()
            Backbone.history.start()
            resolver.resolve()

    # TODO: We need to decide what to do with a route is detroyed
    destroy: {}

    factories: 
        bbRouter: initializeRouter

`})`
