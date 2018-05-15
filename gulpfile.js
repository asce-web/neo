const Ajv          = require('ajv')
const gulp         = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const jsdoc        = require('gulp-jsdoc3')
const less         = require('gulp-less')
const pug          = require('gulp-pug')
const sourcemaps   = require('gulp-sourcemaps')
const jsdom        = require('jsdom')
const kss          = require('kss')

const xjs = require('extrajs-dom')
const sdo_jsd = require('schemaorg-jsd')
const {requireOtherAsync} = require('schemaorg-jsd/lib/requireOther.js')

const ConfSite   = require('./class/ConfSite.class.js')
const ConfPage   = require('./class/ConfPage.class.js')


// HOW-TO: https://github.com/mlucool/gulp-jsdoc3#usage
gulp.task('docs-api', async function () {
  return gulp.src(['README.md', 'class/*.js'], {read:false})
    .pipe(jsdoc(require('./config-jsdoc.json')))
})

// HOW-TO: https://github.com/kss-node/kss-node/issues/161#issuecomment-222292620
gulp.task('docs-kss', async function () {
  return kss(require('./config-kss.json'))
})

gulp.task('docs-my-markup', async function () {
  return gulp.src('./docs/{index,principles,base,obj,comp,org,help,atom}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Xmeter  : require('xmeter'),
        Color   : require('extrajs-color'),
        ConfSite: require('./class/ConfSite.class.js'),
        ConfPage: require('./class/ConfPage.class.js'),
        Person  : require('./class/Person.class.js'),
        Docs    : require('./docs/_models/Docs.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
})

gulp.task('docs-my-style', async function () {
  return gulp.src('./docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./docs/css/'))
})

gulp.task('docs-my', ['docs-my-markup', 'docs-my-style'])

gulp.task('docs', ['docs-api', 'docs-kss', 'docs-my'])

gulp.task('proto-index', async function () {
  return gulp.src('./index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
})

gulp.task('proto-default', async function () {
  return gulp.src('./proto/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        xjs: require('extrajs-dom'),
        Util: require('./class/Util.class.js'),
        site: new ConfSite(await requireOtherAsync('./proto/default/database.jsonld')).init(),
        page: new ConfPage(),
      },
    }))
    .pipe(gulp.dest('./proto/default/'))
})

async function proto_sample_validate(jsondata) {
  // TODO in production, you only have to call:
  // sdo_jsd.sdoValidate(jsondata, 'WebSite')
  // sdo_jsd.sdoValidate(jsondata, 'Product')
  const [META_SCHEMATA, SCHEMATA, NEO_SCHEMA] = await Promise.all([
    sdo_jsd.getMetaSchemata(),
    sdo_jsd.getSchemata(),
    requireOtherAsync('./neo.jsd')
  ])
  let ajv = new Ajv().addMetaSchema(META_SCHEMATA).addSchema(SCHEMATA)
  let is_data_valid = ajv.validate(NEO_SCHEMA, jsondata) // This schema is for development only. TODO Remove when ready for production.
  if (!is_data_valid) {
    let e = new TypeError(ajv.errors.map((e) => e.message).join('\n'))
    e.details = ajv.errors
    console.error(e)
    throw e
  }
  return true
}

gulp.task('proto-sample-markup', async function () {
  let database = await requireOtherAsync('./proto/asce-event.org/database.jsonld')
  await proto_sample_validate(database);
  return gulp.src('./proto/asce-event.org/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util: require('./class/Util.class.js'),
        Person: require('./class/Person.class.js'),
        site: (function () {
          // TODO move all this data inside the database
          const returned = new ConfSite(database).init()
          function pageTitle() { return this.name() + ' | ' + returned.name() }
          returned.find('registration.html')
            .add(new ConfPage('Why Attend', '#0')
              .title(pageTitle)
              .description(`Why you should attend ${returned.currentConference.name}.`)
            )
            .add(new ConfPage('Volunteer', '#0')
              .title(pageTitle)
              .description(`Volunteer at ${returned.currentConference.name}.`)
            )
          returned.find('program.html')
            .add(new ConfPage('Short Courses', '#0')
              .title(pageTitle)
              .description(`Short Courses for ${returned.currentConference.name}.`)
            )
            .add(new ConfPage('Technical Tours', '#0')
              .title(pageTitle)
              .description(`Technical Tours for ${returned.currentConference.name}.`)
            )
            .add(new ConfPage('Optional Tours', '#0')
              .title(pageTitle)
              .description(`Optional Tours for ${returned.currentConference.name}.`)
            )
          returned.find('speakers.html')
            .add(new ConfPage('Distinguished Lecturers', '#0')
              .title(pageTitle)
              .description(`Distinguished lecturers at ${returned.currentConference.name}.`)
            )
          returned.find('sponsor.html')
            .add(new ConfPage('Partnering Orgs', '#0')
              .title(pageTitle)
              .description(`Partnering Organizations at ${returned.currentConference.name}.`)
            )
            .add(new ConfPage('Cooperating Orgs', '#0')
              .title(pageTitle)
              .description(`Cooperating Organizations at ${returned.currentConference.name}.`)
            )
          returned.find('exhibit.html')
            .add(new ConfPage('Exhibitor List', '#0')
              .title(pageTitle)
              .description(`Listing of all Exhibitors at ${returned.currentConference.name}.`)
            )
          return returned
        })()
      },
    }))
    .pipe(gulp.dest('./proto/asce-event.org/'))
})

gulp.task('proto-sample-style', async function () {
  return gulp.src('./proto/asce-event.org/css/site.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./proto/asce-event.org/css/'))
})

gulp.task('proto-sample', ['proto-sample-markup', 'proto-sample-style'])

gulp.task('proto', ['proto-index', 'proto-default', 'proto-sample'])

gulp.task('dist', async function () {
  return gulp.src('./css/src/neo.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
    }))
    .pipe(clean_css({
      level: {
        2: {
          overrideProperties: false, // need fallbacks for `initial` and `unset`
          restructureRules: true, // combines selectors having the same rule (akin to `&:extend()`)
        },
      },
    }))
    .pipe(sourcemaps.write('./')) // write to an external .map file
    .pipe(gulp.dest('./css'))
})

gulp.task('build', ['docs', 'proto', 'dist'])
