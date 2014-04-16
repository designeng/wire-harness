define [
    "wire"
    "marionette"
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

    # ------------- testDecorator -----------------
    define "testDecorator", [], () ->
        class testDecorator
            testDecoratorMethod: () ->
                console.log "testDec"

    # ------------- filter layout --------------------------
    define "filter", [
        "jquery"
        "marionette"
    ], ($, Marionette) ->
        class Filter
            template: ""

            initialize: ->
                console.log "Filter"


    # ------------- rootSpec --------------------------
    rootSpec = 
        keyDecorator:            
            # create: 
                # module: "mixins/baseActiveKey"
                # args: 
                #     BaseObject: Marionette.Controller           
            create: 
                module: "testDecorator"
        filter:
            create: 
                module: "filter"
            mixin: [
                { $ref: 'keyDecorator' }
            ]
        table: {wire: "tableSpec"}
        $plugins:[
            "wire/debug"
        ]


    # ------------- test suites --------------------------
    describe "After wire filterSpec context created", ->

        beforeEach (done) ->
            wire(rootSpec).then (@ctx) =>
                done()
            .otherwise (err) ->
                console.log "ERROR", err

        it "filter", (done) ->
            @ctx.filter.testDecoratorMethod()
            expect(@ctx.filter.testDecoratorMethod).toBeDefined()
            done()
        # it "filter", (done) ->
        #     console.log @ctx.filter
        #     # expect(@ctx.filter.bindKeysOn).toBeDefined()
        #     done()
        # it "table", (done) ->
        #     expect(@ctx.table).toBeDefined()
        #     done()




