'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    docco = require('gulp-docco'),
    paths = {
      scripts: ['src/collector.js','src/**/*.js'],
      docco: 'dist/collector.js'
    };

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}.js`))
    .pipe(babel())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'))
});

gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}-${PKG.version}.min.js`))
    .pipe(babel())
    .pipe(uglify())
    .on('error', swallowError)
    .pipe(gulp.dest('dist/'));
})

gulp.task('docco', ['scripts'], function () {
  return gulp.src(paths.docco)
    .pipe(docco())
    .pipe(gulp.dest('./docs'))
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts', 'docco']);
});

gulp.task('deploy', ['scripts', 'uglify', 'docco']);


function swallowError(error) {
  //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}
