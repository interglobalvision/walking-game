/**
 * @file
 * Portable Gulp tool that checks a Meteor installation for js syntax errors.
 */
/* globals require */

var gulp = require('gulp'),
  util = require('gulp-util'),
  plumber = require('gulp-plumber'),
  rename = require('gulp-rename'),
  notify = require('gulp-notify'),
  util = require('gulp-util'),
  concat = require('gulp-concat'),

  jshint = require('gulp-jshint'),
  jscs = require('gulp-jscs'),

  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>");
  util.log(util.colors.red('Error'), error.message);
}
/**
 * @task JavaScript lint.
 *   Runs JSCS and JSHint on server, client, lib, and gulp files.
 */
gulp.task('lintjs', function () {
  return gulp.src([
    './www/games/**/*.js',
    './www/scenes/**/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jscs());
});

/**
 * @task Stylus compile
 *   Compiles .styl files into .css 
 *   Minifies .css into a single .min.css file
 */
gulp.task('style', function() {
  return gulp.src('./www/css/**.styl')
  .pipe(plumber())
  .pipe(stylus())
  .on('error', errorNotify)
  .pipe(autoprefixer())
  .on('error', errorNotify)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./www/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .on('error', errorNotify)
  .pipe(gulp.dest('./www/css'))
  .pipe(notify({message: 'Style task complete'}));
});

/**
 * @task JavaScript/JSON watch.
 *   Watches changes on relevant fils and runs proper tasks
 */
gulp.task('watch', function () {
  gulp.watch([
    './www/games/**/*.js',
    './www/scenes/**/*.js',
  ], ['lintjs',]);

  gulp.watch([
    './www/css/**/*.styl',
  ], ['style',]);
});

gulp.task('default', ['watch',]);
