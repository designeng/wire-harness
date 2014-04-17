define

    $plugins: [
        'wire/dom'
        'wire/dom/render'
        'wire/on'
        "core/plugin/renderAs"
        'wire/debug'
    ]

    harnessView:
        render:
            template:
                module: 'hbs!modules/harness/playground.html'
            css: 
                module: 'css!modules/harness/structure.css'

        renderAsRoot: true

    controller:
        create: "modules/harness/controller"

        ready:
            "onReady": []