define({
  $plugins: ['cola'],
  $exports: {
    $ref: 'tests'
  },
  source: {
    create: "modules/harness/collection/collectionSource"
  },
  tests: {
    create: {
      module: 'cola/Collection'
    },
    ready: {
      "addSource": {
        $ref: "source"
      }
    }
  }
});
