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
        harnessPlayground: undefined

        amdLoaderUrl: "/bower_components/requirejs/require.js"

        callbackKey: 'harnessCallback'

        onReady: () ->
            console.log "READY"

            console.log "URL::", @harnessUrl

            # @loadHarness(@harnessUrl, document.body)
            # @loadAMDLoader()

        loadHarness: (root) ->
            $(root).find(".playground").attr("src", @harnessUrl)
            console.log "________________loadHarness"

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

        # loadHarness: (url, node) ->
        #     # create temporary global callback
        #     @global[@callbackKey] = (cb) ->
        #         harness = iframe.contentWindow
        #         document.title = 'harness: '  + harness.document.title
        #         @loadAMDLoader harness, () =>
        #             console.log ">>>>>>>>"
        #             delete @global[@callbackKey]
        #             curl = harness.require
        #             alert "CURL::", curl
        #             # curl(commonCfg)
        #             # @loaded()
        #             # cb()



        # Mark document as "loaded", meaning we loaded a harness.

        loaded: () ->
            document.documentElement.className += ' loaded'