define
    $plugins: [
        "wire/debug"
        "wire/dom/render"
        "wire/on"
        "wire/connect"
        "wire/aop"
        "cola"
    ]

    clientEditView:
        render:
            template: { module: 'text!./template.html' }
            replace: { module: 'i18n!app/edit/strings' }
        on:
            submit: 'form.getValues'
        # connect: {
        #     'contactsCollection.onChange': 'reset'
        # }

    # herpers
    form: 
        module: 'cola/dom/form'
