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
  uglify = require('gulp-uglify'),
  sourcemaps = require('gulp-sourcemaps'),

  stylus = require('gulp-stylus'),
  autoprefixer = require('gulp-autoprefixer'),
  cleanCSS = require('gulp-clean-css');

function errorNotify(error){
  notify.onError("Error: <%= error.message %>");
  util.log(util.colors.red('Error'), error.message);
}

/**
 * @task JavsScript concat
 */
gulp.task('javascript', function() {
  console.log('js');
  gulp.src(['./www/js/src/**.js'])
  .pipe(concat('index.js'))
  .on('error', errorNotify)
  .pipe(gulp.dest('./www/js/'))
  .on('error', errorNotify)
  .pipe(rename({suffix: '.min'}))
  .pipe(sourcemaps.init())
  .on('error', errorNotify)
  .pipe(uglify())
  .on('error', errorNotify)
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('./www/js/'))
  .pipe(notify({ message: 'Javascript Concat task complete' }));
});

/**
 * @task JavsScript concat library
 */
gulp.task('javascript-library', function() {
  gulp.src(['./www/js/lib/**.js'])
  .pipe(sourcemaps.init())
  .pipe(concat('lib.js'))
  .pipe(uglify({mangle: false, preserveComments: 'all'}))
  .on('error', errorNotify)
  .pipe(sourcemaps.write('/'))
  .on('error', errorNotify)
  .pipe(gulp.dest('./www/js/'))
  .pipe(notify({ message: 'Javascript Library task complete' }));
});

/**
 * @task JavaScript lint.
 *   Runs JSCS and JSHint on server, client, lib, and gulp files.
 */
gulp.task('lint-core', function () {
  return gulp.src([
    './www/js/src/*.js',
  ])
  .pipe(jshint())
  .pipe(jshint.reporter('default'))
  .pipe(jscs());
});

gulp.task('lint', function () {
  return gulp.src([
    './www/games/**/*.js',
    './www/scenes/**/*.js',
    './www/pages/**/*.js',
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
  .pipe(autoprefixer({browsers: ['last 6 ChromeAndroid versions', 'iOS >= 7.1']}))
  .on('error', errorNotify)
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./www/css'))
  .pipe(rename({suffix: '.min'}))
  .pipe(cleanCSS())
  .on('error', errorNotify)
  .pipe(gulp.dest('./www/css'))
  .pipe(notify({message: 'Style task complete'}));
});

gulp.task('build', ['javascript-library', 'javascript', 'style',]);

/**
 * @task Watch files.
 *   Watches changes on relevant fils and runs proper tasks
 */
gulp.task('watch', function () {
  gulp.watch([
    './www/js/src/*.js',
  ], ['lint-core',]);

  gulp.watch([
    './www/games/**/*.js',
    './www/scenes/**/*.js',
    './www/pages/**/*.js',
  ], ['lint',]);

  gulp.watch([
    './www/css/**/*.styl',
  ], ['style',]);

  gulp.watch([
    './www/js/src/**.js',
  ], ['javascript']);

  gulp.watch([
    './www/js/lib/**.js',
  ], ['javascript-library']);
});

gulp.task('default', ['watch', 'build',]);