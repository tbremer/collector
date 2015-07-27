'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    docco = require('gulp-docco');

let paths = {
  docco: 'dist/collector.js',
  scripts: ['src/collector.js', 'src/**/*.js'],
  tests: ['tests/base-test.js', 'tests/**/*.js']
};

gulp.task('deploy', ['scripts', 'uglify', 'docco']);
gulp.task('docco', ['scripts'], function () {
  return gulp.src(paths.docco)
    .pipe(docco())
    .pipe(gulp.dest('./docs'))
});
gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}.js`))
    .pipe(babel())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'))
});
gulp.task('tests', function() {
  return gulp.src(paths.tests)
    .pipe(concat('test.js'))
    .pipe(gulp.dest('tests/'))
});
gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}-${PKG.version}.min.js`))
    .pipe(babel())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'));
})
gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'docco']);
});



function swallowError(error) {
  //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}
