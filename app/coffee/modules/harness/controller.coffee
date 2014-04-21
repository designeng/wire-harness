define [
    "require"
    "when"
    "jquery"
], (require, When, $) ->

    class HarnessController

        # @injected
        global: undefined

        # @injected
        harnessUrl: undefined

        # @injected
        getRequireJsConfig: undefined

        # @injected
        getBaseUrl: undefined


        amdLoaderUrl: "/bower_components/requirejs/require.js"

        requireConfig: "/app/js/requireConfig.js"

        callbackKey: 'harnessCallback'

        onItemClick: (item) ->
            urlToLoad = @getBaseUrl() + item.url

            # remove iframe first
            i = 0
            iframes = document.getElementsByTagName('iframe')
            while i < iframes.length
                iframes[i].parentNode.removeChild(iframes[i])
                i++

            # create iframe
            iframe = document.body.ownerDocument.createElement('iframe')
            document.body.appendChild(iframe)
            iframe.src = urlToLoad
            harness = iframe.contentWindow

            loadConfig = () =>
                doc = window.frames[0].document
                scriptConfig = doc.createElement('script')
                scriptConfig.onload = () ->
                    _require = harness.require
                    _require ["wire"], (wire) ->
                        harness.runTests(wire)
                        
                scriptConfig.onerror =  () ->
                    console.log 'could not load requireConfig!'
                scriptConfig.src = @requireConfig
                (doc.head || doc.getElementsByTagName('head')[0]).appendChild(scriptConfig)

            iframe.onload = () =>
                doc = window.frames[0].document

                script = doc.createElement('script')
                script.onload = () ->
                    loadConfig()
                        
                script.onerror =  () ->
                    console.log 'could not load amdLoader!'
                script.src = @amdLoaderUrl
                (doc.head || doc.getElementsByTagName('head')[0]).appendChild(script)

        onReady: () ->
            @conf = @getRequireJsConfig()

        loadHarness: (playground) ->
            @playground = playground.$el.find(".playground")

        afterChildLoad: (target) ->
            console.log "_____afterChildLoad", target