define ->
    keyFunctions = {
        onSpace: (e) ->
            return "space"
        
        onLeft: (e) ->
            return "left"

        # onRight: (e) ->
        #     console.log "right!!!!" 
        #     return "right"  

        # onUp: (e) -> 
        #     console.log "UP!!!!"           
        #     return "up"

        # onDown: (e) -> 
        #     return "down"

        # onTab: (e) ->
        #     return "tab"
            
    }

    bindKeyMethods = (keyEvents) ->
        _.extend @, keyFunctions


    return bindKeyMethods