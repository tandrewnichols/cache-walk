const isRelative = require('is-relative');
const stackTrace = require('stack-trace');
const path = require('path');

const getFileName = file => {
  if (isRelative(file)) {
    let stack = stackTrace.get();
    for (let i = 0; i < stack.length; i++) {
      let filename = stack[i].getFileName();
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
    let list = [];
    let recurse = cacheObj => {
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
    let recurse = cacheObj => {
      fn(cacheObj.id);
      cacheObj.children.forEach(recurse);
    };
    recurse(require.cache[file]);
  }
};

exports['delete'] = exports.del = file => {
  let list = exports.get(file);
  list.forEach(id => delete require.cache[id]);
};
