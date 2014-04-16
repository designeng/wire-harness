require(["wire", "wire!bootstrapSpec", "routerMainSpec"], function(wire, bootstrapCTX, routerMainSpec) {
  return bootstrapCTX.wire(routerMainSpec).then(function(resultCTX) {
    return console.log("resultCTX::::", resultCTX);
  });
});
