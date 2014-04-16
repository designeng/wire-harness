define(["wire", "./routeMapFake.js"], function(wire, routeMapFake) {
  return wire({
    $plugins: [],
    routeMapParser: {
      create: "core/modules/root/routeProcessor",
      properties: {
        routeMap: routeMapFake
      },
      ready: {
        startProcessing: {}
      }
    }
  }).then(function(ctx) {
    return console.log("CTX", ctx);
  }).otherwise(function(err) {
    return console.log("ERR:", err);
  });
});
