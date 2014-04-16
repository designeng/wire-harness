define
    $plugins: [
        "wire/debug"
        "wire/connect"
        "listenTo"
        "core/plugin/extender"
        "core/plugin/localizer"
        "core/plugin/mousetrapPlugin"
    ]

    globalEvents:
        create:
            module: "mixins/globalEvents"

    targetToMixin:
        create: 
            module: "controls/testmixins/targetToMixin"
        listenTo:
            globalEvents:
                "html:click": "onHtmlClick"

    switchItemView:
        extend:
            module: "controls/switch/item/switchItemView"
            with:
                itemSelectedClass: "switchItem__selected"
                itemFocusedClass: "switchItem__focused"

    switcher:
        create: 
            module: "controls/switch/switchControl"
            args:
                name: "switch"
        properties:
            # defaultClassName: "mixins/defaultClassName"
            itemView: {$ref: 'switchItemView'}
            inputOptions: ["loc_One", "loc_Two", "loc_Three"]  # @prepareLocalized(@_inputOptions, "object") - must be in outer service - prepare template before injecting            
            showInputs: true

        keys: ["up", "down", "left", "right", "space", "tab"]

        listenTo:
            globalEvents:
                "html:click": "onHtmlClick"

        localize: "template"

        connect: 
            "show": 'bootApp.showView'

        ready:
            "show": {$ref:'switcher'}

        destroy:
            triggerMethod: "close"