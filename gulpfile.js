const gulp = require('gulp');
const sequence = require('gulp-sequence');
require('file-manifest').generate('./gulp', { match: ['*.js', '!config.js'] });
gulp.task('travis', sequence(['lint', 'cover'], 'codeclimate'));
gulp.task('test', ['cover']);
gulp.task('default', ['lint', 'test']);

