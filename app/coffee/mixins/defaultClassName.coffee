define [], () ->
    defaultClassName: (name) ->
        if @model.has "className"
            return @model.get "className"
        else
            return name