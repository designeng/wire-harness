define({
  $plugins: ["wire/debug", "core/plugin/bbRouter"],
  appRouter: {
    bbRouter: {
      routes: {
        "main": "childSpec",
        "sample": "sample-app/main",
        "else": "modelToViewInjectionSpec"
      }
    }
  }
});
