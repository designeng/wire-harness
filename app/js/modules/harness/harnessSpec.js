define({
  $plugins: ['wire/dom', 'wire/dom/render', 'wire/on', 'wire/connect', "cola", "core/plugin/renderAs", 'wire/debug'],
  testsCollection: {
    wire: 'modules/harness/collection/spec'
  },
  harnessList: {
    render: {
      template: {
        module: 'text!modules/harness/sidebar.html'
      },
      css: {
        module: 'css!modules/harness/sidebarStructure.css'
      }
    },
    on: {
      'click:.item': 'testsCollection.edit'
    },
    renderAsChild: {
      afterRender: {
        $ref: 'controller.afterChildLoad'
      }
    },
    bind: {
      to: {
        $ref: 'testsCollection'
      },
      bindings: {
        url: '.url'
      }
    }
  },
  harnessPlayground: {
    render: {
      template: {
        module: 'text!modules/harness/playground.html'
      },
      css: {
        module: 'css!modules/harness/structure.css'
      }
    },
    renderAsRoot: {
      afterRender: {
        $ref: 'controller.loadHarness'
      }
    }
  },
  getBaseUrl: {
    module: "core/util/service/config/getBaseUrl"
  },
  getRequireJsConfig: {
    module: "core/util/service/config/getRequireJsConfig"
  },
  controller: {
    create: {
      module: "modules/harness/controller"
    },
    properties: {
      global: window,
      getBaseUrl: {
        $ref: "getBaseUrl"
      },
      getRequireJsConfig: {
        $ref: "getRequireJsConfig"
      },
      harnessUrl: "js/controls/tablecontrol/test/harness.html"
    },
    connect: {
      'testsCollection.onEdit': 'onItemClick'
    },
    ready: {
      "onReady": {}
    }
  }
});
