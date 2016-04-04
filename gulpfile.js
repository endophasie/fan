'use strict';
var gulp = require('gulp');

// Styles

gulp.task('styles', function () {
    var postcss = require('gulp-postcss');
    var processors = [
            require('postcss-import'),
            require('postcss-mixins'),
            require('postcss-simple-vars'),
            require('postcss-nested'),
            require('postcss-clearfix'),
            require('postcss-focus'),
            require('postcss-assets'),
            require('postcss-color-alpha'),
            require('postcss-color-function'),
            require('postcss-calc'),
            require('postcss-size'),
            require('postcss-easings'),
            require('postcss-custom-media'),
            require('postcss-media-minmax'),
            require('postcss-will-change'),
            require('postcss-inline-comment'),
            require('autoprefixer', { browsers: ['last 2 versions'] })];
    var cssnano = require('cssnano');
    var rename = require('gulp-rename');

    return gulp.src('assets/css/style.css')
            .pipe(postcss(processors))
            .pipe(gulp.dest('build/css/'))
            .pipe(postcss([cssnano({discardComments: {removeAll: true}})]))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/css/'))
});

// Scripts

gulp.task('scripts', function () {
    var rename = require('gulp-rename');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');

    return gulp.src('assets/script/*.js')
            .pipe(concat('scripts.js'))
            .pipe(uglify())
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest('build/script/'));
});

// Images

gulp.task('imgmin', function () {
    var imagemin = require('gulp-imagemin');
    var png = require('imagemin-pngquant');
    var jpeg = require('imagemin-jpegtran');
    var svg = require('imagemin-svgo');

    return gulp.src('assets/img/**/*')
            .pipe(imagemin({
                progressive: true,
                use: [jpeg(), png(), svg()]
            }))
            .pipe(gulp.dest('build/img/.'))
});

gulp.task('watch', ['styles', 'scripts'], function() {
    gulp.watch(['assets/css/*.css'], ['styles']);
    gulp.watch(['assets/script/*.js'], ['scripts']);
    gulp.watch(['assets/img/*'], ['imgmin']);
});

gulp.task('default', ['styles', 'scripts', 'imgmin']);
