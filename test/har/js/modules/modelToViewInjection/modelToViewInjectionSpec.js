define({
  $plugins: ["wire/debug", "wire/connect", "core/plugin/renderAs"],
  injModel: {
    create: "modules/modelToViewInjection/injModel"
  },
  targetView: {
    create: {
      module: "modules/modelToViewInjection/targetView"
    },
    properties: {
      model: {
        $ref: 'injModel'
      }
    },
    renderAsRoot: true
  }
});
