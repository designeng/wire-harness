define
    $plugins: [
        "wire/debug"
        "wire/dom"
        "wire/dom/render"
        "wire/on"
        "wire/connect"
        "wire/aop"
        "cola"
        "core/plugin/localizer"
    ]

    # clientFormContainer: 

    clientFormTpl:
        module: 'text!/app/templates/clientdata/template.html'

    clientEditView:
        create:
            module: "modules/clientdata/clientEditView"

        properties:
            template: {$ref: 'clientFormTpl'}
            # _form: {$ref: 'form'}

        localize: "template"

        # just a rendering in bootApp... hack, must be redesigned - way must be improved
        ready:
            "show": {$ref:'clientEditView'}
            # "getValues": {}
        connect:
            'show': 'bootApp.showView'

    dropDownTpl:
        # { $ref: 'first!.dropdown', at: { $ref: 'clientFormTpl' } }
        clone: 
            $ref: 'first!.dropdown'

    dropDownView:
        create: "modules/clientdata/dropDownView"

        properties:
            template: {$ref: 'dropDownTpl'}
        ready:
            "logProp": "template"

    # herpers
    # form: 
    #     module: 'cola/dom/form'