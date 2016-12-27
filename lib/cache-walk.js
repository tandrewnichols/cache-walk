const isRelative = require('is-relative');
const stackTrace = require('stack-trace');
const path = require('path');

const getFileName = file => {
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


exports.get = file => {
  file = getFileName(file);
  if (require.cache[file]) {
    var list = [];
    var recurse = cacheObj => {
      list.push(cacheObj.id);
      cacheObj.children.forEach(recurse);
    };
    recurse(require.cache[file]);
    return list;
  } else {
    return [];
  }
};

exports.walk = (file, fn) => {
  file = getFileName(file);
  if (require.cache[file]) {
    var recurse = cacheObj => {
      fn(cacheObj.id);
      cacheObj.children.forEach(recurse);
    };
    recurse(require.cache[file]);
  }
};

exports['delete'] = exports.del = file => {
  var list = exports.get(file);
  list.forEach(id => delete require.cache[id]);
};
