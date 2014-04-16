define({
  $exports: {
    $ref: 'formModel'
  },
  formModel: {
    create: {
      module: 'cola/Model',
      args: {
        strategyOptions: {
          validator: {
            module: 'sample-app/test-model/validateModel'
          }
        }
      }
    },
    before: {
      update: 'beforeUpdate',
      validate: 'beforeValidate'
    }
  },
  beforeUpdate: {
    module: 'sample-app/test-model/beforeUpdate'
  },
  beforeValidate: {
    module: 'sample-app/test-model/beforeValidate'
  },
  $plugins: ['wire/dom', 'wire/on', 'wire/aop', 'cola', 'wire/debug']
});
