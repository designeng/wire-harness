path = require "path"
walk = require "fs-walk"
grunt = require "grunt"

ConnectMW = {}
ConnectMW.options = 
    testHarness: "service/testharness"
    harness: "service/harness"
    _baseDir: "app/coffee"

templatePathes = (path) ->
    grunt.file.read path

ConnectMW.folderMount = (connect, point) ->
    return connect.static path.resolve(point)

ConnectMW.getAllHarness = (req, res, next) ->

    if (req.url).match new RegExp(ConnectMW.options.harness)

        count = 0

        body = 
            urls: []

        walk.walkSync __dirname + '/../app/coffee', (basedir, filename, stat) ->

            if (grunt.file.isFile basedir + "/" + filename) and (filename in ["harness.html", "Harness.html"])

                baseDirChunk = basedir.split(ConnectMW.options._baseDir)[1]
                url = baseDirChunk + "/" + filename

                body.urls.push {id: count, url: url}
                count++

        res.setHeader "Content-Type", "application/json; charset=utf-8"
        res.write JSON.stringify body
        res.end()

    else
        next()

module.exports = ConnectMW