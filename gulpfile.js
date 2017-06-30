'use strict';

var gulp = require('gulp'),
  config = require('./build.conf.js'),
  plugins = require('gulp-load-plugins')();

var ciMode = false;

gulp.task('clean', function () {
  return gulp
    .src(config.buildFolder, {read: false})
    .pipe(plugins.clean());
});

gulp.task('scripts', function () {

  return gulp.src(config.srcJs)

    // jshint
    .pipe(plugins.jshint())
    .pipe(plugins.jshint.reporter('jshint-stylish'))
    .pipe(plugins.if(ciMode, plugins.jshint.reporter('fail')))

    // package
    .pipe(plugins.concat(config.buildJsFilename))
    .pipe(plugins.header(config.closureStart))
    .pipe(plugins.footer(config.closureEnd))
    .pipe(plugins.header(config.banner))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())

    // minify
    .pipe(plugins.uglify())
    .pipe(plugins.rename({ extname: '.min.js' }))
    .pipe(gulp.dest(config.buildFolder))
    .pipe(plugins.filesize())
    .on('error', plugins.util.log);

});

gulp.task('watch', function () {
  return gulp.watch(config.srcJs, ['scripts']);
});

gulp.task('ci', function () {
  ciMode = true;
  return gulp.start(['clean', 'scripts', 'test']);
});

gulp.task('default', ['scripts']);