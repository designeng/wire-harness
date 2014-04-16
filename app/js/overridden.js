define(["marionette"], function(Marionette) {
  return Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
    var template;
    template = templateId;
    if (!template || template.length === 0) {
      template = " ";
    }
    return template;
  };
});
