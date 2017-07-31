var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var clean_css = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('pug:index', function () {
  return gulp.src(__dirname + '/index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('pug:docs', function () {
  return gulp.src(__dirname + '/docs/{index,principles,base,obj,comp,org,help,atom}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Color             : require('csscolor').Color,
        Docs              : require('./docs/_models/Docs.class.js'),
        Util              : require('./_models/Util.class.js'),
        ConfSite          : require('./_models/ConfSite.class.js'),
        ConfPage          : require('./_models/ConfPage.class.js'),
        Conference        : require('./_models/Conference.class.js'),
        SupporterLevel    : require('./_models/SupporterLevel.class.js'),
        Supporter         : require('./_models/Supporter.class.js'),
        Person            : require('./_models/Person.class.js'),
        Place             : require('./_models/Place.class.js'),
        RegistrationPeriod: require('./_models/RegistrationPeriod.class.js'),
        Pass              : require('./_models/Pass.class.js'),
        Session           : require('./_models/Session.class.js'),
        ImportantDate     : require('./_models/ImportantDate.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('pug:default', function () {
  var Color = require('csscolor').Color
  var ConfSite   = require('./_models/ConfSite.class.js'),
  var ConfPage   = require('./_models/ConfPage.class.js'),
  var Conference = require('./_models/Conference.class.js'),
  return gulp.src(__dirname + '/proto/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util: require('./_models/Util.class.js'),
        site: new ConfSite()
          .colors(Color.fromString('#660000'), Color.fromString('#ff6600')) // default Hokie colors
          .init()
          .addConference('default', new Conference({
            start_date: new Date(),
            end_date  : new Date(),
          }))
          .currentConference('default')
          .prevConference('default')
          .nextConference('default'),
        page: new ConfPage(),
      },
    }))
    .pipe(gulp.dest('./proto/default/'))
})

gulp.task('pug:sample', function () {
  return gulp.src(__dirname + '/proto/asce-event.org/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util: require('./_models/Util.class.js'),
        Person: require('./_models/Person.class.js'),
        site: require('./proto/asce-event.org/data.js'),
      },
    }))
    .pipe(gulp.dest('./proto/asce-event.org/'))
})

gulp.task('pug:all', ['pug:index', 'pug:docs', 'pug:default', 'pug:sample'])

gulp.task('lessc:core', function () {
  return gulp.src(__dirname + '/css/src/neo.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./css/'))
    .pipe(sourcemaps.init())
    .pipe(clean_css())
    .pipe(sourcemaps.write('./')) // write to an external .map file
    .pipe(gulp.dest('./css'))
})

gulp.task('lessc:docs', function () {
  return gulp.src(__dirname + '/docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('lessc:sample', function () {
  return gulp.src(__dirname + '/proto/asce-event.org/css/site.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./proto/asce-event.org/css/'))
})

gulp.task('lessc:all', ['lessc:core', 'lessc:docs', 'lessc:sample'])

gulp.task('build', ['pug:all', 'lessc:all'])
