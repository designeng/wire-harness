define
    $plugins: [
        "wire/debug"
        "wire/connect"
        "core/plugin/extender"
    ]

    switchItemView:
        extend:
            module: "controls/switch/item/switchItemView"
            with:
                itemSelectedClass: "one123"
                itemFocusedClass: "two123"

    anotherItemView:
        create: 
            module: "controls/switch/item/switchItemView"
        ready:
            logProp: {}


