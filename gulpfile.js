const
 gulp = require('gulp'),
 concat = require('gulp-concat'),
 uglify = require('gulp-uglify'),
 uglifycss = require('gulp-uglifycss'),
 nodemon = require('nodemon'),
 browserSync = require('browser-sync')

gulp.task('minify-css', () => {
 gulp.src('public-dev/css/*.css')
   .pipe(concat('application.min.css'))
   .pipe(uglifycss())
   .pipe(gulp.dest('public/css'))
   .pipe(browserSync.stream())
})

gulp.task('minify-js', () => {
 gulp.src('public-dev/js/*.js')
   .pipe(concat('application.min.js'))
   .pipe(uglify())
   .pipe(gulp.dest('public/js'))
})

gulp.task('nodemon', () => {
 nodemon({
   ext: 'js html css',
   env: {'NODE_ENV': 'development'},
   ignore: ['gulpfile.js', 'application.min.js', 'application.min.css']
 })
})

gulp.watch('public-dev/css/*.css', ['minify-css'])
gulp.watch('public-dev/js/*.js', ['minify-js'])

gulp.task('browser-sync', ['nodemon'], () => {
 setTimeout(() => {
   browserSync.init({
     proxy: 'http://localhost:3000',
     files: ['public-dev/**/*.*'],
     port: 7000
   })
 }, 2000)
})
gulp.task('default', ['minify-js', 'minify-css', 'browser-sync'])
