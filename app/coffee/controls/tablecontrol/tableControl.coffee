define [
    "marionette"
], (Marionette) ->
	class TableControl extends Marionette.Layout

		template: "
					<div class='tbody'>...</div>
				"

		regions:
			thead: ".thead"
			tbody: "._tbody"

		initialize: ->
			console.log "TableControl inited"

		show: (target) ->
			console.log "show after init", target
			return target

		onRender: ->
			console.log "@thead", @thead
			console.log "@tbody", @tbody

			# @thead.show @header
			# @tbody.show @body

