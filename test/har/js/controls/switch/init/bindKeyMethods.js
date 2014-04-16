define(function() {
  var bindKeyMethods, keyFunctions;
  keyFunctions = {
    onSpace: function(e) {
      return "space";
    },
    onLeft: function(e) {
      return "left";
    }
  };
  bindKeyMethods = function(keyEvents) {
    return _.extend(this, keyFunctions);
  };
  return bindKeyMethods;
});
