define(['cola/adapter/Array', 'rest', 'rest/interceptor/mime', 'when'], function(ArrayAdapter, rest, mime, When) {
  var client, serviceDefered;
  serviceDefered = When.defer();
  client = rest.chain(mime);
  client({
    path: '/service/harness'
  }).then(function(response) {
    var source;
    source = new ArrayAdapter(response.entity.urls);
    return serviceDefered.resolve(source);
  }, function(error) {
    return console.log("SERVICE ERROR:", error);
  });
  return serviceDefered.promise;
});
