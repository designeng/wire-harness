define(["wire", "./coreSpec.js"], function(wire, coreSpec) {
  return describe("After wire context created", function() {
    beforeEach(function(done) {
      var _this = this;
      return wire(coreSpec).then(function(ctx) {
        _this.ctx = ctx;
        return done();
      }).otherwise(function(err) {
        return console.log("ERROR", err);
      });
    });
    return it("rootComponent", function(done) {
      expect(this.ctx.rootComponent).toBeDefined();
      return done();
    });
  });
});
