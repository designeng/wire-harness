define({
  $plugins: ['wire/dom', 'wire/dom/render', 'wire/on', "core/plugin/renderAs", 'wire/debug'],
  harnessPlayground: {
    render: {
      template: {
        module: 'text!modules/harness/playground.html'
      },
      css: {
        module: 'css!modules/harness/structure.css'
      }
    },
    renderAsRoot: true,
    afterRenderAsRoot: {
      invoke: "loadHarness",
      "in": {
        $ref: 'controller'
      }
    }
  },
  controller: {
    create: {
      module: "modules/harness/controller"
    },
    properties: {
      global: window,
      harnessUrl: "js/controls/tablecontrol/test/harness.html",
      harnessPlayground: 'harnessPlayground'
    },
    ready: {
      "onReady": []
    }
  }
});
