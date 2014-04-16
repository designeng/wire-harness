define [
    "wire"
    "marionette"
    "text!./fixtures/resultTpl.html"
], (wire, Marionette) ->

    # ------------- table collection --------------------------
    define "tableBodyCollection", [
        "backbone"
    ], (Backbone) ->
        class TableBodyCollection extends Backbone.Collection

            initialize: ->
                items = [
                    {one: "ONE", two: "TWO"}
                    {one: "ONE1", two: "TWO1"}
                    {one: "ONE2", two: "TWO2"}
                ]
                @add items

    # ------------- table layout --------------------------
    define "table", [
        "marionette"
    ], (Marionette) ->
        class Table extends Marionette.Layout
            template: ""

            initialize: ->
                console.log "table"
    
    # ------------- tableSpec --------------------------
    define "tableSpec", ->
        tableSpec = 
            collection: 
                create:
                    module: "tableBodyCollection"
            table:
                create: 
                    module: "table"




    # ------------- filter collection data -----------------
    define "filterCollectionData", ->
        filterData = [
            {}
        ]



    # ------------- filter layout --------------------------
    define "filter", [
        "jquery"
        "marionette"
    ], ($, Marionette) ->
        class Filter extends Marionette.Layout
            template: ""

            initialize: ->
                console.log "Filter"


    # ------------- rootSpec --------------------------
    rootSpec = 
        filter:
            create: 
                module: "filter"
        table: {wire: "tableSpec"}


    # ------------- test suites --------------------------
    describe "After wire filterSpec context created", ->

        beforeEach (done) ->
            wire(rootSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "filter", (done) ->
            console.log "CTX", @ctx
            expect(@ctx.filter).toBeDefined()
            done()
        it "table", (done) ->
            expect(@ctx.table).toBeDefined()
            done()




