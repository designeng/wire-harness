define [
    "core/appinstance"
    "overridden"
], (App) ->

    App.addInitializer (options) ->
        console.log "App.addInitializer", options
        if !options.regionSelector
            throw new Error "Application region not specified!"

        App.addRegions 
            root: options.regionSelector
            pageRegion: "#page"
            tableRegion: "#table"


    App.getRegionManager = () ->
        @_regionManager

    App.show = (region, view) ->
        region.show view

    App.showView = (view) ->
        @.tableRegion.show view
        return view

    App.renderAsRoot = (view) ->
        @pageRegion.show view

    return App