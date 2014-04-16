define({
  $plugins: [],
  bootApp: {
    module: "core/bootApp",
    ready: {
      start: {
        regionSelector: "#application"
      }
    }
  }
});
