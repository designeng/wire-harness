define ->
    routeMap = 
        "!/":
            "header" : ["header"]
            "content": ["flightSearchHistory"]
            "footer" : ["footer"]

        "!/footer":
            "header" : []
            "content": []
            "footer" : ["footer"]

        "!/header":
            "header": ["header"]
            "content": []
            "footer": []

        "!/flight-stats":
            "header"    : ["header"]
            "content"   : [
                "flightSearchHistory"
                "flightSearchHeader"
                "flightStats"
                "flightStatsFilter"
                "flightStatsResult"
            ]
            "footer"    : ["footerInner"]

        "!/flight-stats/result":
            "header": ["header"]
            "content": ["flightStats", "flightStatsResult"]
            "footer": []

        "!/new":
            "header"    : []
            "content"   : ["flightStats"]
            "footer"    : []

        "!/sorted-table":
            "header"    : []
            "content"   : ["sortedTable"]
            "footer"    : []

        "!/sorted-table/filters":
            "header"    : ["header"]
            "content"   : ["sortedTableFilter"]
            "footer"    : ["footer"]

        "!/popup-dev"   :
            "header"    : []
            "content"   : ["popupDev","popupDevContent"]
            "footer"    : ["footer"]