var shelljs = require('shelljs'),
  fs = require('fs'),
  path = require('path'),
  _ = require('underscore'),
  rw = require('rw'),
  underscoreTemplateSettings = {};


module.exports = {

  configure: function(templateSettings) {
    underscoreTemplateSettings = templateSettings;
  },

  process: function (target, output) {

    output = output || '/dev/stdout'

    rw.writeSync(output, concat(readFiles(getTemplatePaths())), 'utf8', function (err) {
      if (err) {
        console.log(err);
      }
    });

    function getTemplatePaths() {
      paths = shelljs.find(target).filter(function (file) {
        return file.match(/(\.us|\.html)$/);
      }).map(function (file) {
        return file.substr(target.length);
      });
      return paths;
    }

    function readFiles(paths) {
      return paths.map(function (file) {
        var source = _.template(fs.readFileSync(path.join(target,file), 'utf8'), null, underscoreTemplateSettings).source;
        var declaration = 'templates["' + file.split('.')[0] + '"] = ' + source;
        return {
          'path': file,
          declaration: declaration
        };
      });
    }

    function concat(templates) {
      return templates.reduce(function(previousValue, currentValue, index, array){
        return previousValue + '\n' + currentValue.declaration;
      }, "var templates = {};");
    }

  }

}
