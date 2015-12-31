var gulp = require('gulp');
var codeclimate = require('gulp-codeclimate-reporter');

gulp.task('codeclimate', function() {
  if (process.version.indexOf('v4') > -1) {
    gulp.src('coverage/lcov.info', { read: false })
      .pipe(codeclimate({
        token: '32e635bd5054c1a0b45b4ef76d70227baf99e140f1e95bc5d28ffc12b5a80445'
      }));
  }
});

