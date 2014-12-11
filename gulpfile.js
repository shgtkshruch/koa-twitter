var gulp = require('gulp');
var path = require('path');
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var transform = require('vinyl-transform');
var browserSync = require('browser-sync');

var config = {
  script: './src/script',
  style: './src/style'
};

var jssrc = [];
var scripts = ['index.js', 'config.js'];

scripts.forEach(function (js) {
  jssrc.push(path.join(config.script, js));
});

gulp.task('browserSync', ['nodemon'], function () {
  browserSync({
    watchOptions: {
      debounceDelay: 0
    },
    proxy: 'http://localhost:3000',
    port: 3001,
    notify: false,
    reloadDelay: 0
  });
});

gulp.task('style', function () {

  function isChanged (file) {
    return file.event === 'changed';
  }

  $.watch('src/style/**/*.scss', {name: 'Sass'})
    .pipe($.filter(isChanged))
    .pipe($.plumber())
    .pipe($.sass())
    .pipe(gulp.dest('public/style'))
    .pipe(browserSync.reload({stream: true}));
});


gulp.task('script', function () {

  $.watch('src/script/**/*.js',{name: 'browserify'}, function () {

    var browserified = transform(function (filename) {
      var b = browserify(filename);
      return b.bundle();
    });

    gulp.src(jssrc)
      .pipe($.plumber())
      .pipe(browserified)
      .pipe(gulp.dest('public/script'))
      .pipe(browserSync.reload({stream: true}));
  });
});

gulp.task('template', function () {

  var spawn = require('child_process').spawn;

  $.watch('src/template/*.hbs', {name: 'handlebars'}, function () {
    var hbs = spawn('npm', ['run', 'hbs']);

    hbs.stdout.on('data', function (data) {
      console.log('handlebars: ' + data);
    });

    hbs.stderr.on('data', function (data) {
      console.log('handlebars: ' + data);
    });
  });
});

gulp.task('nodemon', function (cb) {
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
  }).on('start', function () {
    cb();
  });
});

gulp.task('default', ['browserSync'], function () {

  gulp.start('style');
  gulp.start('script');
  gulp.start('template');
});
