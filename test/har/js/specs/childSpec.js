define({
  $plugins: ["wire/debug", "wire/connect", "core/plugin/colBind", "core/plugin/renderAs"],
  $exports: {
    tableModule: {
      $ref: 'controller'
    }
  },
  controller: {
    create: {
      module: "modules/stats/tableResultController"
    }
  },
  collection: {
    create: {
      module: "controls/tablecontrol/collection/tableBodyCollection"
    }
  },
  tableView: {
    create: {
      module: "controls/tablecontrol/tableControl"
    },
    properties: {
      header: {
        $ref: 'headerView'
      },
      body: {
        $ref: 'bodyView'
      }
    },
    bind: {
      to: {
        $ref: 'collection'
      },
      bindings: {
        selector: ".tbody"
      }
    },
    renderAsRoot: true
  },
  headerView: {
    create: {
      module: "controls/tablecontrol/tableHeaderControl"
    }
  },
  bodyView: {
    create: {
      module: "controls/tablecontrol/tableBodyControl"
    }
  }
});
