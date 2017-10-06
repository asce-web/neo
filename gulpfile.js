const kss          = require('kss')
const gulp         = require('gulp')
const jsdoc        = require('gulp-jsdoc3')
const pug          = require('gulp-pug')
const less         = require('gulp-less')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const sourcemaps   = require('gulp-sourcemaps')



// HOW-TO: https://github.com/mlucool/gulp-jsdoc3#usage
gulp.task('docs:api', function () {
  return gulp.src(['README.md', 'class/*.js'], {read:false})
    .pipe(jsdoc(require('./config-jsdoc.json')))
})
// HOW-TO: https://github.com/kss-node/kss-node/issues/161#issuecomment-222292620
gulp.task('docs:kss', function () {
  return kss(require('./config-kss.json'))
})
gulp.task('pug:docs', function () {
  return gulp.src(__dirname + '/docs/{index,principles,base,obj,comp,org,help,atom}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Color   : require('extrajs-color'),
        ConfSite: require('./class/ConfSite.class.js'),
        ConfPage: require('./class/ConfPage.class.js'),
        Person  : require('./class/Person.class.js'),
        Place   : require('./class/Place.class.js'),
        Docs    : require('./docs/_models/Docs.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
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

gulp.task('build:docs', ['docs:api', 'docs:kss', 'pug:docs', 'lessc:docs'])



gulp.task('pug:index', function () {
  return gulp.src(__dirname + '/index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
})
gulp.task('pug:default', function () {
  const Color      = require('extrajs-color')
  const ConfSite   = require('./class/ConfSite.class.js')
  const ConfPage   = require('./class/ConfPage.class.js')
  const Conference = require('./class/Conference.class.js')
  return gulp.src(__dirname + '/proto/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Element   : require('extrajs-dom').Element,
        Util      : require('./class/Util.class.js'),
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
        xjs    : require('extrajs'),
        Element   : require('extrajs-dom').Element,
        Util   : require('./class/Util.class.js'),
        site   : require('./proto/asce-event.org/data.js'),
      },
    }))
    .pipe(gulp.dest('./proto/asce-event.org/'))
})
gulp.task('pug:sites', ['pug:index', 'pug:default', 'pug:sample'])



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
gulp.task('lessc:sample', function () {
  return gulp.src(__dirname + '/proto/asce-event.org/css/site.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./proto/asce-event.org/css/'))
})
gulp.task('lessc:sites', ['lessc:core', 'lessc:sample'])



gulp.task('build:sites', ['pug:sites', 'lessc:sites'])



gulp.task('build', ['build:docs', 'build:sites'])
