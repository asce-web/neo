const Ajv          = require('ajv')
const gulp         = require('gulp')
const autoprefixer = require('gulp-autoprefixer')
const clean_css    = require('gulp-clean-css')
const less         = require('gulp-less')
const pug          = require('gulp-pug')
const sourcemaps   = require('gulp-sourcemaps')
const typedoc      = require('gulp-typedoc')
const typescript   = require('gulp-typescript')
const kss          = require('kss')
// require('typedoc')    // DO NOT REMOVE … peerDependency of `gulp-typedoc`
// require('typescript') // DO NOT REMOVE … peerDependency of `gulp-typescript`

const sdo_jsd = require('schemaorg-jsd')
const {requireOtherAsync} = require('schemaorg-jsd/lib/requireOther.js')

const tsconfig      = require('./tsconfig.json')
const typedocconfig = require('./config/typedoc.json')


/** @private */
async function _proto_validate(jsondata) {
  // TODO in production, you only have to call:
  // sdo_jsd.sdoValidate(jsondata, 'WebSite')
  // sdo_jsd.sdoValidate(jsondata, 'Product')
  const [META_SCHEMATA, SCHEMATA, NEO_SCHEMA] = await Promise.all([
    sdo_jsd.getMetaSchemata(),
    sdo_jsd.getSchemata(),
    requireOtherAsync('./neo.jsd') // This schema is for development only. TODO Remove when ready for production.
  ])
  let ajv = new Ajv().addMetaSchema(META_SCHEMATA).addSchema(SCHEMATA)
  let is_data_valid = ajv.validate(NEO_SCHEMA, jsondata)
  if (!is_data_valid) {
    ajv.errors.forEach((e) => console.error(e))
    throw new TypeError(ajv.errors[0].message)
  }
  return true
}


function dist_ts() {
	return gulp.src('./src/**/*.ts')
		.pipe(typescript(tsconfig.compilerOptions))
		.pipe(gulp.dest('./dist/'))
}

function dist_css() {
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
}

const dist = gulp.parallel(dist_ts, dist_css)

function proto_index() {
	// TODO - hard code this markup
  return gulp.src('./index.pug')
    .pipe(pug({
      basedir: './',
    }))
    .pipe(gulp.dest('./'))
}

async function proto_default_validate() {
  return _proto_validate(await requireOtherAsync('./proto/default/database.jsonld'))
}

async function proto_default_markup() {
	const ConfSite = require('./dist/class/ConfSite.class.js').default
	const ConfPage = require('./dist/class/ConfPage.class.js').default
  return gulp.src('./proto/default/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        xjs: require('extrajs-dom'),
        Util: require('./dist/class/Util.class.js').default,
        site: new ConfSite(await requireOtherAsync('./proto/default/database.jsonld')).init(),
        page: new ConfPage(),
      },
    }))
    .pipe(gulp.dest('./proto/default/'))
}

const proto_default = gulp.series(proto_default_validate, proto_default_markup)

async function proto_sample_validate() {
  return _proto_validate(await requireOtherAsync('./proto/asce-event.org/database.jsonld'))
}

async function proto_sample_markup() {
	const ConfSite = require('./dist/class/ConfSite.class.js').default
	const ConfPage = require('./dist/class/ConfPage.class.js').default
  return gulp.src('./proto/asce-event.org/{index,registration,program,location,speakers,sponsor,exhibit,about,contact}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Util  : require('./dist/class/Util.class.js').default,
        Person: require('./dist/class/Person.class.js').default,
        site: await (async function () {
          // TODO move all this data inside the database
          const returned = new ConfSite(await requireOtherAsync('./proto/asce-event.org/database.jsonld')).init()
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
}

function proto_sample_style() {
  return gulp.src('./proto/asce-event.org/css/site.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./proto/asce-event.org/css/'))
}

const proto_sample = gulp.parallel(
	gulp.series(proto_sample_validate, proto_sample_markup),
	proto_sample_style
)

const proto = gulp.parallel(proto_index, proto_default, proto_sample)

const test = proto

function docs_api() {
	return gulp.src('./src/**/*.ts')
		.pipe(typedoc(typedocconfig))
}

// HOW-TO: https://github.com/kss-node/kss-node/issues/161#issuecomment-222292620
async function docs_kss() {
  return kss(require('./config-kss.json'))
}

function docs_my_markup() {
  return gulp.src('./docs/{index,principles,base,obj,comp,org,help,atom}.pug')
    .pipe(pug({
      basedir: './',
      locals: {
        Xmeter  : require('xmeter'),
        Color   : require('extrajs-color'),
        ConfSite,
        ConfPage,
        Person  : require('./class/Person.class.js'),
        Docs    : require('./docs/_models/Docs.class.js'),
      },
    }))
    .pipe(gulp.dest('./docs/'))
}

function docs_my_style() {
  return gulp.src('./docs/css/docs.less')
    .pipe(less())
    .pipe(autoprefixer({
      grid: true,
      cascade: false,
    }))
    .pipe(gulp.dest('./docs/css/'))
}

const docs_my = gulp.parallel(docs_my_markup, docs_my_style)

const docs = gulp.parallel(docs_api, docs_kss/*, docs_my*/)

const build = gulp.parallel(
	gulp.series(dist, test),
	docs
)

module.exports = {
	dist_ts,
	dist_css,
	dist,
	proto_index,
	proto_default_validate,
	proto_default_markup,
	proto_default,
	proto_sample_validate,
	proto_sample_markup,
	proto_sample_style,
	proto_sample,
	proto,
	test,
	docs_api,
	docs_kss,
	docs_my_markup,
	docs_my_style,
	docs_my,
	docs,
	build,
}
