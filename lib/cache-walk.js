var isRelative = require('is-relative');
var stackTrace = require('stack-trace');
var path = require('path');

var getFileName = function(file) {
  if (isRelative(file)) {
    var stack = stackTrace.get();
    for (var i = 0; i < stack.length; i++) {
      var filename = stack[i].getFileName();
      if (filename !== __filename) {
        file = path.resolve(path.dirname(filename), file);
        break;
      }
    }
  }
  return require.resolve(file);
};


exports.get = function(file) {
  file = getFileName(file);
  if (require.cache[file]) {
    var list = [];
    var recurse = function(cacheObj) {
      list.push(cacheObj.id);
      cacheObj.children.forEach(recurse);
    };
    recurse(require.cache[file]);
    return list;
  } else {
    return [];
  }
};

exports.walk = function(file, fn) {
  file = getFileName(file); 
  if (require.cache[file]) {
    var recurse = function(cacheObj) {
      fn(cacheObj.id);
      cacheObj.children.forEach(recurse);
    };
    recurse(require.cache[file]);
  }
};

exports['delete'] = function(file) {
  var list = exports.get(file);
  list.forEach(function(id) {
    delete require.cache[id];
  });
};
