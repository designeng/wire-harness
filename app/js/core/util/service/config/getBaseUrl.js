define(function() {
  var getBaseUrl;
  return getBaseUrl = function(options) {
    var baseUrl;
    baseUrl = requirejs.s.contexts._.config.baseUrl;
    return baseUrl;
  };
});
