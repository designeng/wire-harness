define [
    "wire"
    "./coreSpec.js"
], (wire, coreSpec) ->

    describe "After wire context created", ->

        beforeEach (done) ->
            wire(coreSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "rootComponent", (done) ->
            expect(@ctx.rootComponent).toBeDefined()
            done()