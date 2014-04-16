define [
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

            setTimeout(()=>
                @add new Backbone.Model
                    one: 123
                    two: 234
            , 1000)

            setTimeout(()=>
                @add new Backbone.Model
                    one: 456
                    two: "abc"
            , 2000)