define(["marionette"], function(Marionette) {
  return beforeEach(function() {
    Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
      var template;
      template = templateId;
      if (!template || template.length === 0) {
        template = " ";
      }
      return template;
    };
    return jasmine.Expectation.addMatchers({
      toBeInstanceOf: function(type) {
        return this.actual instanceof type;
      }
    });
  });
});
