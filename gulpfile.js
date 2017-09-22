var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var clean_css = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')
// const xjs     =
// const Element =
//
// var ConfSite           = require('./_models/ConfSite.class.js')
// var ConfPage           = require('./_models/ConfPage.class.js')
// var SupporterLevel     = require('./_models/SupporterLevel.class.js')
// var Supporter          = require('./_models/Supporter.class.js')
// var Person             = require('./_models/Person.class.js')
// var Place              = require('./_models/Place.class.js')
// var RegistrationPeriod = require('./_models/RegistrationPeriod.class.js')
// var Pass               = require('./_models/Pass.class.js')

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
        Color   : require('extrajs-color'),
        ConfSite: require('./_models/ConfSite.class.js'),
        ConfPage: require('./_models/ConfPage.class.js'),
        Person  : require('./_models/Person.class.js'),
        Place   : require('./_models/Place.class.js'),
        Docs    : require('./docs/_models/Docs.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('pug:default', function () {
  const Color      = require('extrajs-color')
  const ConfSite   = require('./_models/ConfSite.class.js')
  const ConfPage   = require('./_models/ConfPage.class.js')
  const Conference = require('./_models/Conference.class.js')
  return gulp.src(__dirname + '/proto/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Element   : require('extrajs-element'),
        Util      : require('./_models/Util.class.js'),
        site      : new ConfSite('Civil Engineering Congress', '/sites/default/', 'ConferenceSuite')
          .colors(Color.fromString('#660000'), Color.fromString('#ff6600')) // default Hokie colors
          .init()
          .addConference('default', new Conference({
            name      : 'Civil Engineering Congress 2016',
            url       : 'http://2016.cecongress.org/',
            start_date: new Date(),
            end_date  : new Date(),
            promo_loc : { text : 'Reston, VA' },
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
        xjs    : require('extrajs').Util,
        Element: require('extrajs-element'),
        Util   : require('./_models/Util.class.js'),
        site   : require('./proto/asce-event.org/data.js'),
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
