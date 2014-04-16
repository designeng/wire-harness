define({
  $plugins: ["wire/debug", "wire/dom", "wire/dom/render", "wire/on", "wire/connect", "wire/aop", "cola", "core/plugin/localizer"],
  clientFormTpl: {
    module: 'text!/app/templates/clientdata/template.html'
  },
  clientEditView: {
    create: {
      module: "modules/clientdata/clientEditView"
    },
    properties: {
      template: {
        $ref: 'clientFormTpl'
      }
    },
    localize: "template",
    ready: {
      "show": {
        $ref: 'clientEditView'
      }
    },
    connect: {
      'show': 'bootApp.showView'
    }
  },
  dropDownTpl: {
    clone: {
      $ref: 'first!.dropdown'
    }
  },
  dropDownView: {
    create: "modules/clientdata/dropDownView",
    properties: {
      template: {
        $ref: 'dropDownTpl'
      }
    },
    ready: {
      "logProp": "template"
    }
  }
});
