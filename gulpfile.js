var gulp = require('gulp')
var pug = require('gulp-pug')
var less = require('gulp-less')
var autoprefixer = require('gulp-autoprefixer')
var clean_css = require('gulp-clean-css')
var sourcemaps = require('gulp-sourcemaps')

gulp.task('pug:index', function () {
  return gulp.src('index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('pug:docs', function () {
  return gulp.src('docs/{index,principles,base,obj,comp,org,help,atom}.pug')
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

gulp.task('pug:all', ['pug:index', 'pug:docs'])

gulp.task('lessc:core', function () {
  return gulp.src('src/neo.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./'))
    .pipe(sourcemaps.init())
    .pipe(clean_css())
    .pipe(sourcemaps.write('./')) // write to an external .map file
    .pipe(gulp.dest('./'))
})

gulp.task('lessc:docs', function () {
  return gulp.src('./docs/styles/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./docs/styles/'))
})

gulp.task('lessc:all', ['lessc:core', 'lessc:docs'])

gulp.task('build', ['pug:all', 'lessc:all'])
