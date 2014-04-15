var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    karma = require('karma').server,
    karmaRunner = require('karma').runner;


gulp.task('default', ['jshint', 'test-once']);


gulp.task('jshint', function() {
  gulp.src(['./**/*.js', '!node_modules/**/*.js', '!tests/vendor/*.js'])
  .pipe(jshint())
  .pipe(jshint.reporter());
});


gulp.task('test-once', function() {
  karma.start({
    configFile: __dirname + '/tests/config.js',
    singleRun: true,
    browsers: ['PhantomJS']
  }, function(exitCode) {
    console.log('Karma has exited with ' + exitCode);
    process.exit(exitCode);
  });
});
