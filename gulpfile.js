'use strict';

var gulp = require('gulp'),
    autoprefixer = require('autoprefixer-core'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    notify = require('gulp-notify'),
    cssmin = require('gulp-cssmin'),
    rename = require('gulp-rename'),
    gutil = require('gulp-util'),
    csscomb = require('gulp-csscomb'),
    jscs = require('gulp-jscs');

var css_vendors = 'static/vendors/**/*.css';

var js_vendors = [
    'static/vendors/jquery-2.1.4.min/jquery-2.1.4.min.js',
    'static/vendors/other/*.js'
];

var css_files = [
    'static/css/main.css',
    'static/css/header.css',
    'static/css/footer.css'
];

var js_files = [
    'static/js/scripts.js'
];

function arrayConcat(a, b) {
    return a.concat(b);
}

gulp.task('watch', function() {
    gulp.watch('static/js/*.js', ['js']);
    gulp.watch('static/css/*.css', ['css']);

});

gulp.task('combcss', function() {
    return gulp.src(css_files)
        .pipe(csscomb())
        .pipe(gulp.dest('static/desktop/css/'));
});

gulp.task('combjs', function() {
    return gulp.src(js_files)
        .pipe(jscs())
        .pipe(jscs.reporter())
        .pipe(jscs({fix: true}))
        .pipe(gulp.dest('static/desktop/js/'));
});

gulp.task('css', function () {
    return gulp.src(arrayConcat(css_vendors, css_files))
        .pipe(concat('style.css'))
        .pipe(csscomb())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/desktop/css/'))
        .pipe(notify({ message: 'Finished with css'}));
});

gulp.task('js', function () {
    return gulp.src(arrayConcat(js_vendors, js_files))
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('static/desktop/js/'))
        .pipe(notify({ message: 'Finished with js'}));
});

function errorHandler (error) {
  console.log(error.toString());
  this.emit('end');
}