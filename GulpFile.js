'use strict';

let gulp = require('gulp'),
    PKG = require('./package.json'),
    babel = require('gulp-babel'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    shell = require('gulp-shell'),
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
    paths = {
      docco: ['dist/collector.js', `${docFiles}`],
      scripts: ['src/collector.js', 'src/**/*.js'],
      tests: ['tests/collector/**/*.js', 'tests/**/*.js', '!tests/test.js']
    };

let swallowError = function(error) {
    console.log(error.toString());
    this.emit('end');
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
gulp.task('watch', function() {
  gulp.watch([paths.scripts], ['scripts', 'test', 'docs']);
  gulp.watch([paths.tests], ['test']);
});

gulp.task('watch-doc', function() {
  gulp.watch([paths.scripts], ['scripts', 'test', 'docs']);
  gulp.watch('docco-template-api/**/*', ['docs']);
});


gulp.task('docs', shell.task(`node_modules/.bin/docco --layout ./docco-template-api ${paths.docco[1]}`));

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
    return gulp.src('tests/index.html')
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
