define [
    "wire"
    "marionette"
], (wire, Marionette) ->

    define "switchControl", [
        "marionette"
    ], (Marionette) ->               

        class CompositeControlView extends Marionette.CompositeView

            initialize: ->


    # ------------- rootSpec -----------------------------

    rootSpec = 
        $plugins: [
            "wire/debug"
            "core/plugin/mousetrapPlugin"
        ]

        view:
            create: "switchControl"
            keys: ["up"]


    # ------------- test suites --------------------------
    describe "keyactivePlugin suite", ->

        beforeEach (done) ->
            wire(rootSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "switchControl on methods", (done) ->

            _.extend @ctx.view, {
                onUp: ->
                    console.log "ON UP!!!"
            }
            console.log "@ctx.view.onUp", @ctx.view.onUp

            expect(@ctx.view.onUp).toBeDefined()

            @ctx.view.onUp = jasmine.createSpy "onUp"

            expect(@ctx.view.onUp).toHaveBeenCalled()

            done()

        # it "switchControl on methods should be called", (done) ->
        #     @ctx.view.onUp = jasmine.createSpy "onUp"

        #     expect(@ctx.view.onUp).toBeCalled()

        #     done()