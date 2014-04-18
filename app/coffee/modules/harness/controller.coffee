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
            # @playground.attr("src", urlToLoad)

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


        # Asynchronously loads require.js (curl.js) and calls back when done.
        # @param harness {Window} the iframe into which we'll load the
        # harness.  We need to load require (curl) into this window!
        # @param cb {Function} the function to call back when require.js (curl.js) is loaded.

        loadAMDLoader: (harness, cb) ->
            doc = harness.document
            script = doc.createElement('script')
            script.onload = cb
            script.onerror = () ->
                console.log 'could not load AMDLoader!'

            script.src = @amdLoaderUrl

            console.log "_____@amdLoaderUrl", @amdLoaderUrl
            (doc.head || doc.getElementsByTagName('head')[0]).appendChild(script)


        # Load harness into an iframe, then load curl.js into it, and
        # finally, call the harness's callback to start it.
        # @param url {String} path to harness.
        # @param node {Element} parent element of the new iframe.

        loadHarnessInIframe: (url, node) ->
            # create temporary global callback
            @global[@callbackKey] = (cb) ->
                harness = iframe.contentWindow
                document.title = 'harness: '  + harness.document.title
                @loadAMDLoader harness, () =>
                    console.log ">>>>>>>>"
                    delete @global[@callbackKey]
                    require = harness.require
                    alert "require::", require
                    require(commonCfg)
                    @loaded()
                    cb()