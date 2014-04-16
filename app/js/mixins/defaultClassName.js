define([], function() {
  return {
    defaultClassName: function(name) {
      if (this.model.has("className")) {
        return this.model.get("className");
      } else {
        return name;
      }
    }
  };
});
