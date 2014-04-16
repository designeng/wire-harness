define [
    "marionette"
], (Marionette) ->
	class TableBodyControl extends Marionette.Layout

        # template: "<tr><td data-name='one'>...</td><td data-name='two'>...</td></tr>"

		initialize: ->
			console.log "tableBodyControl inited"

		onRender: ->
			console.log " tableBodyControl rendered"