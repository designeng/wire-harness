define({
  $exports: {
    $ref: 'contacts'
  },
  contacts: {
    create: {
      module: 'cola/Collection',
      args: {
        strategyOptions: {
          validator: {
            module: 'sample-app/collection/validateContact'
          }
        }
      }
    },
    before: {
      add: 'cleanContact | generateMetadata',
      update: 'cleanContact | generateMetadata'
    }
  },
  contactStore: {
    create: {
      module: 'cola/adapter/LocalStorage',
      args: 'contacts-demo'
    },
    bind: {
      $ref: 'contacts'
    }
  },
  cleanContact: {
    module: 'sample-app/collection/cleanContact'
  },
  generateMetadata: {
    module: 'sample-app/collection/generateMetadata'
  },
  $plugins: ['wire/dom', 'wire/on', 'wire/aop', 'cola']
});
