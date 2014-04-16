require.config({
  baseUrl: "/app/js",
  packages: [
    {
      name: "wire",
      main: "wire",
      location: "../../bower_components/wire"
    }, {
      name: "when",
      main: "when",
      location: "../../bower_components/when"
    }, {
      name: "meld",
      main: "meld",
      location: "../../bower_components/meld"
    }, {
      name: "cola",
      main: "cola",
      location: "../../bower_components/cola"
    }, {
      name: "rest",
      main: "rest",
      location: "../../bower_components/rest"
    }, {
      name: "backbone",
      main: "backbone",
      location: "../../bower_components/backbone"
    }, {
      name: "underscore",
      main: "underscore",
      location: "../../bower_components/underscore"
    }, {
      name: "underscore.string",
      main: "underscore.string",
      location: "../../bower_components/underscore.string/lib"
    }, {
      name: "marionette",
      main: "backbone.marionette",
      location: "../../bower_components/marionette/lib/core/amd"
    }, {
      name: "backbone.modelbinder",
      main: "Backbone.ModelBinder",
      location: "../../bower_components/Backbone.ModelBinder"
    }, {
      name: "backbone.wreqr",
      main: "backbone.wreqr",
      location: "../../bower_components/backbone.wreqr/lib/amd"
    }, {
      name: "backbone.babysitter",
      main: "backbone.babysitter",
      location: "../../bower_components/backbone.babysitter/lib/amd"
    }, {
      name: "backbone.collectionbinder",
      main: "Backbone.CollectionBinder",
      location: "../../bower_components/Backbone.ModelBinder"
    }, {
      name: "mousetrap",
      main: "mousetrap",
      location: "../../bower_components/mousetrap"
    }, {
      name: "jquery",
      main: "jquery",
      location: "../../bower_components/jquery/dist"
    }, {
      name: "text",
      main: "text",
      location: "../../bower_components/text"
    }, {
      name: "i18n",
      main: "i18n",
      location: "../../bower_components/requirejs-i18n"
    }, {
      name: "listenTo",
      main: "listenTo",
      location: "../../bower_components/listenTo"
    }, {
      name: "css",
      main: "css",
      location: "../../bower_components/require-css"
    }, {
      name: "domReady",
      main: "domReady",
      location: "../../bower_components/requirejs-domready"
    }
  ],
  shim: {
    "backbone": {
      deps: ["underscore", "jquery"],
      exports: "Backbone"
    },
    "backbone.wreqr": {
      deps: ["backbone"]
    },
    "backbone.babysitter": {
      deps: ["backbone"]
    },
    "marionette": {
      deps: ["jquery", "underscore", "backbone"],
      exports: "Marionette"
    },
    "backbone.collectionbinder": {
      deps: ["backbone.modelbinder"]
    },
    "underscore.string": {
      deps: ["underscore"]
    }
  },
  paths: {
    "bootstrapSpec": "specs/bootstrapSpec",
    "childSpec": "specs/childSpec",
    "listenToSpec": "specs/listenToSpec",
    "extenderPluginSpec": "specs/extenderPluginSpec",
    "clientDataSpec": "modules/clientdata/clientDataSpec",
    "sampleAppSpec": "sample-app/main",
    "modelToViewInjectionSpec": "modules/modelToViewInjection/modelToViewInjectionSpec",
    "editViewSpec": "modules/editView/editViewSpec",
    "routerMainSpec": "specs/routerMainSpec",
    "mediator": "boot/mediator",
    "context/main": "withwire/context/main",
    "oneComponent": "withwire/components/oneComponent"
  },
  locale: "ru"
});

require(["wire", "wire!bootstrapSpec", "routerMainSpec"], function(wire, bootstrapCTX, routerMainSpec) {
  return bootstrapCTX.wire(routerMainSpec).then(function(resultCTX) {
    return console.log("resultCTX::::", resultCTX);
  });
});
