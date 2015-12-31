var gulp = require('gulp');
var sequence = require('gulp-sequence');
require('file-manifest').generate('./gulp', ['*.js', '!config.js']);
gulp.task('travis', sequence(['lint', 'cover'], 'codeclimate'));
gulp.task('test', ['cover']);
gulp.task('default', ['lint', 'test']);

