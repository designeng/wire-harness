define ->
    getBaseUrl = (options) ->
        baseUrl = requirejs.s.contexts._.config.baseUrl
        return baseUrl