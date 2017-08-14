var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watch = require('gulp-watch');
var async = require('async');
var consolidate = require('gulp-consolidate');
var runTimestamp = Math.round(Date.now()/1000);



gulp.task('copy-font', function() {
  return gulp.src(['./app/font/*'])
    .pipe(gulp.dest('./public/font'))
})

gulp.task('copy-imgs', function() {
  return gulp.src(['./app/images/*'])
    .pipe(gulp.dest('./public/images'))
})

gulp.task('sass', function() {
    gulp.src('./app/scss/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/css/'));
});
gulp.task('copy-imgs', function() {
      return gulp.src('./app/images/**/*')
          .pipe(gulp.dest('./public/images'))
  })
gulp.task('js', function() {
   browserify('./app/js/main.js')
   .bundle()
   .on('error', function(e){
     gutil.log(e);
   })
   .pipe(source('bundle.js'))
   .pipe(gulp.dest('./public/js'));
});

gulp.task('watch', function() {
    gulp.watch('./app/scss/*.scss', ['sass'])
    gulp.watch('./app/js/*.js', ['js'])
});
gulp.task('build',['copy-imgs','copy-font' , 'sass', 'js']);
gulp.task('default', ['watch', 'build']);
