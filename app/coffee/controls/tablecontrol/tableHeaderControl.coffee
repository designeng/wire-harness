define [
    "marionette"
], (Marionette) ->
	class TableHeaderControl extends Marionette.Layout

		template: "<tr><td>HEADER</td></tr>"

		initialize: ->
			console.log "tableHeaderControl inited"

		onRender: ->
			console.log "tableHeaderControl rendered"