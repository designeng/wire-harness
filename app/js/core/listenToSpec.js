define({
  $plugins: ["wire/debug", "wire/connect", "listenTo", "core/plugin/extender", "core/plugin/localizer"],
  globalEvents: {
    create: {
      module: "mixins/globalEvents"
    }
  },
  targetToMixin: {
    create: {
      module: "controls/testmixins/targetToMixin"
    },
    listenTo: {
      globalEvents: {
        "html:click": "onHtmlClick"
      }
    }
  },
  switchItemView: {
    extend: {
      module: "controls/switch/item/switchItemView",
      "with": {
        itemSelectedClass: "switchItem__selected",
        itemFocusedClass: "switchItem__focused"
      }
    }
  },
  switcher: {
    create: {
      module: "controls/switch/switchControl",
      args: {
        name: "switch"
      }
    },
    properties: {
      itemView: {
        $ref: 'switchItemView'
      },
      keyEvents: ["up", "down", "left", "right", "space", "tab"],
      inputOptions: ["loc_One", "loc_Two", "loc_Three"],
      showInputs: true
    },
    init: {
      createMethods: {}
    },
    listenTo: {
      globalEvents: {
        "html:click": "onHtmlClick"
      }
    },
    localize: "template",
    connect: {
      "show": 'bootApp.showView'
    },
    ready: {
      "show": {
        $ref: 'switcher'
      }
    },
    destroy: {
      triggerMethod: "close"
    }
  }
});
