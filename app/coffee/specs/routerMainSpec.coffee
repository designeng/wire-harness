# routerMainSpec
define
    $plugins: [
        "wire/debug"
        "core/plugin/bbRouter"
    ]

    appRouter:
        bbRouter: 
            routes:
                "main"  : "childSpec"
                # "sample"   : "editViewSpec"
                "sample"   : "sample-app/main"
                "else"  : "modelToViewInjectionSpec"
