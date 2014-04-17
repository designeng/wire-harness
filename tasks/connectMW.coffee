path = require "path"
walk = require "fs-walk"
grunt = require "grunt"

ConnectMW = {}
ConnectMW.options = 
    harness: "service/harness"
    _baseDir: "app/coffee"

templatePathes = (path) ->
    grunt.file.read path

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

ConnectMW.getAllHarness = (req, res, next) ->

    if (req.url).match new RegExp(ConnectMW.options.harness)

        result = ""
        files = []

        walk.walkSync __dirname + '/../app/coffee', (basedir, filename, stat) ->

            if (grunt.file.isFile basedir + "/" + filename) and (filename in ["harness.html", "Harness.html"])

                baseDirChunk = basedir.split(ConnectMW.options._baseDir)[1]
                url = baseDirChunk + "/" + filename
                result += "<li data-url='" + url + "'>" + url + "</li>\n"

        res.write result
        res.end()

    else
        next()

module.exports = ConnectMW