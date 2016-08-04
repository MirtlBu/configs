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

var css_vendors = [
    'static/vendors/FancySelect/fancySelect.css',
    'static/vendors/slick/slick.css',
    'static/vendors/jquery-ui-1.12.0.custom/jquery-ui.min.css',
];

var js_vendors = [
    'static/vendors/jquery-2.1.4.min/jquery-2.1.4.min.js',
    'static/vendors/jquery-ui-1.12.0.custom/jquery-ui.min.js',
    'static/vendors/FancySelect/fancySelect.js',
    'static/vendors/slick/slick.min.js',
    'static/vendors/webcamjs/webcam.min.js',
];

var css_files = [
    'static/desktop/css/form.css',
    'static/desktop/css/table.css',
    'static/desktop/css/select.css',
    'static/desktop/css/pagination.css',
    'static/desktop/css/bookmark.css',
    'static/desktop/css/header.css',
    'static/desktop/css/footer.css',
    'static/desktop/css/main-exchange.css',
    'static/desktop/css/main-features.css',
    'static/desktop/css/main-description.css',
    'static/desktop/css/main-reviews.css',
    'static/desktop/css/main-news.css',
    'static/desktop/css/step2.css',
    'static/desktop/css/step3.css',
    'static/desktop/css/order_completed.css',
    'static/desktop/css/order_processing.css',
    'static/desktop/css/sign_up.css',
    'static/desktop/css/log_in.css',
    'static/desktop/css/rates.css',
    'static/desktop/css/contacts.css',
    'static/desktop/css/personal.css',
    'static/desktop/css/faq.css',
    'static/desktop/css/news.css',
    'static/desktop/css/reviews.css',
    'static/desktop/css/start.css',
    'static/desktop/css/verification.css',
    'static/desktop/css/converting.css',
    'static/desktop/css/textpage.css',
    'static/desktop/css/dev-style.css',
    'static/desktop/css/320.css'
];

var js_files = [
    'static/desktop/js/dev-script.js'
];

function arrayConcat(a, b) {
    return a.concat(b);
}

gulp.task('watch', function() {
    gulp.watch('static/desktop/js/*.js', ['js']);
    gulp.watch('static/desktop/css/*.css', ['css']);

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