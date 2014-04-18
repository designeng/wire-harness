define

    $plugins: [
        'wire/dom'
        'wire/dom/render'
        'wire/on'
        "core/plugin/renderAs"
        'wire/debug'
    ]

    harnessSideBar:
        render:
            template:
                module: 'text!modules/harness/sidebar.html'
            css: 
                module: 'css!modules/harness/sidebarStructure.css'

        renderAsChild:
            afterRender: {$ref: 'controller.afterChildLoad'}

    harnessPlayground:
        render:
            template:
                module: 'text!modules/harness/playground.html'
            css: 
                module: 'css!modules/harness/structure.css'

        renderAsRoot:
            afterRender: {$ref: 'controller.loadHarness'}

    controller:
        create: 
            module: "modules/harness/controller"
        properties:
            global: window
            harnessUrl: "js/controls/tablecontrol/test/harness.html"
            harnessPlayground: 'harnessPlayground'


        ready:
            "onReady": []