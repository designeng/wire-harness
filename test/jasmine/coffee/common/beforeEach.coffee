# "extended" loaded on the reason of the need for extensions to the basic objects

define [
    "marionette"
], (Marionette) ->

    beforeEach -> 
        # loadFixtures("comboboxControlFixture.html")
        # loadFixtures("wrapperFixture.html")

        # --------------------- all Marionette necessary functions ---------------------
        # code from core/overridden
        Marionette.TemplateCache::loadTemplate = (templateId) ->
            template = templateId
            if not template or template.length is 0
                template = " "                 
            template

        # Marionette.TemplateCache::compileTemplate = (rawTemplate) ->
        #     if !_.isFunction rawTemplate
        #         Handlebars.compile rawTemplate
        #     else 
        #         return rawTemplate
        # ------------------------------------------------------------------------------

        jasmine.Expectation.addMatchers toBeInstanceOf: (type) ->
            @actual instanceof type

