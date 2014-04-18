define [
    'cola/adapter/Array'
    'rest'
    'rest/interceptor/mime'
    'when'
], (ArrayAdapter, rest, mime, When) ->

    serviceDefered = When.defer()

    client = rest.chain(mime)

    client({path: '/service/harness'}).then(
        (response) ->
            source = new ArrayAdapter(response.entity.urls)
            serviceDefered.resolve source
        , (error) ->
            console.log "SERVICE ERROR:", error
    )

    return serviceDefered.promise

    