define({
  $plugins: ["wire/debug"],
  bootApp: {
    module: "core/bootApp",
    ready: {
      start: {
        regionSelector: "#application"
      }
    }
  }
});
