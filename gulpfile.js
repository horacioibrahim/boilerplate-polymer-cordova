var gulp = require('gulp');
var browserSync = require('browser-sync');
var vulcanize = require('gulp-vulcanize');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var image = require('gulp-image');

// watch files for changes and reload
gulp.task('serve', function(){
   browserSync({
      server: {
          baseDir: 'www'
      } 
   });
   gulp.watch(['*.html', '**/*.html', 'js/*.js', 'css/*.css'], {cwd: 'www'}, browserSync.reload);
});

// concatenate custom elements 
gulp.task('vulcanize', function(){
  return gulp.src('www/app.html')
  .pipe(vulcanize({
      stripComments: true,
      inlineCss: true
  }))
  .pipe(gulp.dest('dist'))
});

gulp.task('compress', function() {
  return gulp.src('www/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('minify-css', function() {
  return gulp.src('www/css/*.css')
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('image', function(){
   gulp.src('./www/img/*') 
   .pipe(image())
   .pipe(gulp.dest('./dist/img'));
});

gulp.task('dist', ['vulcanize', 'compress', 'minify-css', 'image']);
