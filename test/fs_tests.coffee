shell = require 'shelljs'

describe 'find', ->
  it 'should return the set of us files', ->
    paths = shell.find(__dirname).filter((file) ->
      file.match(/\.us$/)
    ).map((path) ->
      path.substr __dirname.length + 1
    )
    console.log paths
