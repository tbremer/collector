'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    paths = {
      scripts: ['src/collector.js','src/**/*.js'],
    };

gulp.task('scripts', function () {
  return gulp.src(paths.scripts)
    .pipe(concat(`${PKG.name}-${PKG.version}.js`))
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

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['scripts']);
});

gulp.task('deploy', ['scripts', 'uglify']);


function swallowError(error) {
  //If you want details of the error in the console
    console.log(error.toString());

    this.emit('end');
}
