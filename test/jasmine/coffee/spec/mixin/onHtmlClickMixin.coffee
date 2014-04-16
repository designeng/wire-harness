define [
    "wire"
    "marionette"
], (wire, Marionette) ->

    # ------------- global events --------------------------
    define "globalEvents", [
        "jquery"
        "underscore"
        "backbone"
    ], ($, _, Backbone) ->

        class GlobalEvents

            # htmlEvents: ['html:click']
            # windowsEvents: ['window:resize']

            constructor: ->

            initialize: ->
                @on "html:click", ()->
                    console.log "GlobalEvents"

            play: (opt) ->
                console.log "PLAY", opt

            triggerEvent: (ev) ->
                @trigger ev


        GlobalEvents = _.extend GlobalEvents::, Backbone.Events

        return GlobalEvents

        # return globalEvents = new GlobalEvents() unless globalEvents?


    # ------------- target layout --------------------------

    define "targetToMixin", [
        "marionette"
    ], (Marionette) ->
        onHtmlClick = jasmine.createSpy "onHtmlClick"

        class TargetToMixin extends Marionette.Controller
            template: ""

            initialize: ->
                console.log "targetToMixin"

                setTimeout(()=>
                    @trigger "html:click"
                , 1000)

            # onHtmlClick: onHtmlClick
            onHtmlClick: ->
                console.log "onHtmlClick"


    # ------------- rootSpec --------------------------
    rootSpec = 
        globalEvents:          
            create:
                module: "globalEvents"
            ready:
                "triggerEvent": "html:click"
                
        targetToMixin:
            create: 
                module: "targetToMixin"
                listenTo:
                    globalEvents:
                        "html:click": "onHtmlClick"

            # mixin: [
            #     { $ref: 'globalEvents' }
            # ]

        $plugins:[
            "wire/debug"
            "listenTo"
        ]


    # ------------- test suites --------------------------
    describe "After wire rootSpec context created", ->

        beforeEach (done) ->
            wire(rootSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        # it "targetToMixin onHtmlClick called after event triggered", (done) ->
        #     expect(@ctx.targetToMixin.onHtmlClick).toHaveBeenCalled()
        #     done()

        it "targetToMixin", (done) ->
            # console.log "globalEvents::::", @ctx.globalEvents
            # expect(@ctx.targetToMixin.onHtmlClick).toHaveBeenCalled()
            expect(@ctx.targetToMixin).toBeDefined()
            done()
        # it "filter", (done) ->
        #     console.log @ctx.filter
        #     # expect(@ctx.filter.bindKeysOn).toBeDefined()
        #     done()
        # it "table", (done) ->
        #     expect(@ctx.table).toBeDefined()
        #     done()




