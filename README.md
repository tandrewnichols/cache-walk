[![Build Status](https://travis-ci.org/tandrewnichols/cache-walk.png)](https://travis-ci.org/tandrewnichols/cache-walk) [![downloads](http://img.shields.io/npm/dm/cache-walk.svg)](https://npmjs.org/package/cache-walk) [![npm](http://img.shields.io/npm/v/cache-walk.svg)](https://npmjs.org/package/cache-walk) [![Code Climate](https://codeclimate.com/github/tandrewnichols/cache-walk/badges/gpa.svg)](https://codeclimate.com/github/tandrewnichols/cache-walk) [![Test Coverage](https://codeclimate.com/github/tandrewnichols/cache-walk/badges/coverage.svg)](https://codeclimate.com/github/tandrewnichols/cache-walk) [![dependencies](https://david-dm.org/tandrewnichols/cache-walk.png)](https://david-dm.org/tandrewnichols/cache-walk)

# cache-walk

Walk a require tree for a cached module.

## Installation

`npm install --save cache-walk`

## Summary

Requiring one file typically adds more than one file to the require cache, since that file (probably) requires other files, which potentially require other files. This module let's you walk through the entire require tree of a particular module as it is in the cache.

## Usage

`cache-walk` exports two functions for interacting with a require tree, `.get` and `.walk`. `.get` returns a list of module ids (absolute file paths) while `.walk` calls a function for each module encountered.

#### .get

```js
var foo = require('./foo');
var cache = require('cache-walk');

// requiredModules will contain ./foo
// plus everything required by ./foo and it's children
var requiredModules = cache.get('./foo');
```

#### .walk

```js
var foo = require('./foo');
var cache = require('cache-walk');

// The callback will be called first with the ./foo module id
// and then with everything required by ./foo and it's children
cache.walk('./foo', function(mod) {
  console.log(mod);
});
```

These examples use relative paths, but absolute ones work as well.

## Contributing

Please see [the contribution guidelines](CONTRIBUTING.md).
