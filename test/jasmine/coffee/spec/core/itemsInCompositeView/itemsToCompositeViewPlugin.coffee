define [
    "wire"
    "marionette"
], (wire, Marionette) ->

    define "switcher", [
        "marionette"
    ], (Marionette) ->
        class Switcher extends Marionette.Layout
            template: "<div>Switcher test</div>"

            initialize: ->
                console.log "SWITCHER"


    define "input", [
        "jquery"
        "marionette"
    ], ($, Marionette) ->
        class InputText extends Marionette.Layout
            template: "<input type='text' value='MyInput'/>"

            initialize: ->
                console.log "InputText"

            updateValue: ->
                @$el.find("input").val @value


    itemsSpec = 
        switcher:
            create:
                module: "switcher"
            ready: "render"
        inputOne:
            create:
                module: "input"
            properties:
                value: "INPUT TEXT TEST"
            ready: "updateValue"



    describe "After wire context created", ->

        beforeEach (done) ->
            wire(itemsSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "switcher", (done) ->
            expect(@ctx.switcher).toBeDefined()
            done()
        it "inputOne", (done) ->
            expect(@ctx.inputOne).toBeDefined()
            done()