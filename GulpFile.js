'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    shell = require('gulp-shell'),
    watch = require('gulp-watch'),
    mochaPhantomJS = require('gulp-mocha-phantomjs'),
    webserver = require('gulp-webserver'),
    fs = require('fs');

let docFiles = function() {
      let files = fs.readdirSync('./src');
      files.forEach(function(file, idx) {
        files[idx] = `src/${file}`;
      });

      return (files.join(' '));
    }(),

    swallowError = function(error) {
        console.log(error.toString());
        this.emit('end');
    },

    paths = {
      docco: ['dist/collector.js', `${docFiles}`],
      scripts: ['src/collector.js', 'src/**/*.js'],
      tests: ['tests/collector/**/*.js', 'tests/**/*.js', '!tests/test.js']
    };

gulp.task('serve', function() {
  gulp.src('./')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      fallback: 'index.html'
    }));
});

gulp.task('deploy', ['scripts', 'uglify', 'test', 'docs']);
gulp.task('test', ['clean-tests', 'build-tests', 'run-tests']);
gulp.task('docs', shell.task(`node_modules/.bin/docco --layout ./docco-template-api ${paths.docco[1]}`));

gulp.task('watch', function() {
  gulp.start('serve');
  watch(paths.docco, function() { gulp.start('docs'); });
  watch(paths.scripts, function() { gulp.start('scripts'); });
  watch(paths.tests, function() { gulp.start('test'); });
});

/**
 * SCRIPTS
 */
gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`collector.js`))
    .pipe(babel())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'));
});

gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`collector.${PKG.version}.min.js`))
    .pipe(babel())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'));
});

/**
 * TESTS
 */
gulp.task('clean-tests', function() {
  return gulp.src('tests/test.js', {read: false})
    .pipe(clean());
});

gulp.task('build-tests', ['clean-tests'], function() {
  return gulp.src(paths.tests)
    .pipe(concat('test.js'))
    .pipe(babel())
    .on('error', swallowError)
    .pipe(gulp.dest('tests/'));
});

gulp.task('run-tests', ['clean-tests', 'build-tests'], function () {
    return gulp.src('tests/index.html')
    .pipe(mochaPhantomJS());
});
