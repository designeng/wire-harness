define [
    "core/appinstance"
], (App) ->

    rootModule = App.module "RootModule", (rootModule, App) ->

        

        rootModule.addInitializer (options) ->
            console.log "RootModule"