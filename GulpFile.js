'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    docco = require('gulp-docco'),
    mochaPhantomJS = require('gulp-mocha-phantomjs');

let paths = {
  docco: 'dist/collector.js',
  scripts: ['src/collector.js', 'src/**/*.js'],
  tests: ['tests/base-test.js', 'tests/**/*.js']
};

let swallowError = function(error) {
    console.log(error.toString());
    this.emit('end');
};


gulp.task('deploy', ['scripts', 'uglify', 'docco']);
gulp.task('test', ['clean-tests', 'build-tests', 'run-tests']);
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'test', 'docco']);
});

gulp.task('docco', ['scripts'], function () {
  return gulp.src(paths.docco)
    .pipe(docco())
    .pipe(gulp.dest('./docs'));
});

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}.js`))
    .pipe(babel())
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

gulp.task('run-tests', ['clean-tests', 'clean-tests'], function () {
    return gulp.src('tests/runner.html')
    .pipe(mochaPhantomJS());
});

gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}-${PKG.version}.min.js`))
    .pipe(babel())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'));
});
