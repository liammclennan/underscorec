var shelljs = require('shelljs'),
  fs = require('fs'),
  path = require('path'),
  _ = require('underscore');

module.exports = {

  process: function (target, output) {
    fs.writeFileSync(output, concat(readFiles(getTemplatePaths())), 'utf8', function (err) {
      if (err) {
        console.log(err);
      }
    });

    function getTemplatePaths() {
      paths = shelljs.find(target).filter(function (file) {
        return file.match(/\.us$/);
      }).map(function (file) {
        return file.substr(target.length);
      });
      return paths;
    }

    function readFiles(paths) {
      return paths.map(function (file) {
        var source = _.template(fs.readFileSync(path.join(target,file), 'utf8')).source;
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