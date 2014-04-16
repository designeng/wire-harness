define [
    "jquery"
    "marionette"
    "underscore"
], ($, Marionette, _) ->   

    class GlobalEvents extends Marionette.Controller

        htmlEvents: ['html:click']
        windowsEvents: ['window:resize']

        initialize: ->
            @bindGlobalEvents()

        bindGlobalEvents: ->
            $(window).on 'resize', =>                               # window resize event
                sEvents = @joinEvent('windowsEvents')
                @trigger sEvents, {
                    width: $(window).width()
                    height: $(window).height()
                }

            $("html").on 'click', (e) =>                            # html click event
                sEvents = @joinEvent('htmlEvents')
                @trigger(sEvents, e)

        addHtmlEvent: (eventName) ->                                # for add custom events
            @htmlEvents.push(eventName)

        removeHtmlEvent: (eventName) ->                             # for remove custom events
            @htmlEvents = _.without(@htmlEvents, eventName)

        joinEvent: (eventGroup) ->
            return @[eventGroup].join(' ')