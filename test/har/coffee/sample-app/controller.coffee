define ->
    editContact: (contact) ->
        @_updateForm @_form, contact
        return

    logModel: (model) ->
    	# how to get model fields?
    	console.log "MODEL:", model
