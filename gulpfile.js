var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var transform = require('vinyl-transform');

gulp.task('style', function () {
  gulp.src('src/style/main.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest('public/style'));
});

gulp.task('script', function () {
  var browserified = transform(function (filename) {
    var b = browserify(filename);
    return b.bundle();
  });

  gulp.src('./src/script/index.js')
    .pipe($.plumber())
    .pipe(browserified)
    .pipe(gulp.dest('public/script'));
});

gulp.task('nodemon', function () {
  $.nodemon({
    script: 'index.js',
    execMap: {
      js: "node --harmony"
    },
    watch: [
      "index.js",
      "views/",
      "public/",
      "model/",
      "lib/"
    ]
  });
});

gulp.task('default', ['nodemon'], function () {
  $.watch('src/style/**/*.scss', function () {
    gulp.start('style');
  });

  $.watch('src/script/**/*.js', function () {
    gulp.start('script');
  });
});
