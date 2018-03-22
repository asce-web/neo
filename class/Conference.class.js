const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View = require('extrajs-view')

const RegistrationPeriod = require('./RegistrationPeriod.class.js')
const Pass               = require('./Pass.class.js')
const DateRange          = require('./DateRange.class.js')
const PostalAddress      = require('./PostalAddress.class.js')
const Venue              = require('./Venue.class.js')
const Person             = require('./Person.class.js')
const Supporter          = require('./Supporter.class.js')
const Exhibitor          = require('./Exhibitor.class.js')

const xHero           = require('../tpl/x-hero.tpl.js')
const xOtheryear      = require('../tpl/x-otheryear.tpl.js')
const xProgram        = require('../tpl/x-program.tpl.js')
const xDateblock      = require('../tpl/x-dateblock.tpl.js')
const xSupporterLevel = require('../tpl/x-supporter-level.tpl.js')


/**
 * A conference event.
 * It may have a name, theme, dates, (promoted) location,
 * passes, sessions, venues, speakers,
 * supporter levels and supporters, exhibitors, contact information,
 * important dates, organizers, and other properties.
 */
class Conference {
  /**
   * @summary Construct a Conference object.
   * @description The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name of this conference
   * @param {string} jsondata.url the url of this conference
   * @param {string=} jsondata.description the theme of this conference
   * @param {string=} jsondata.image the hero image for this conference
   * @param {string=} jsondata.startDate the starting date of this conference, in ISO string format
   * @param {string=} jsondata.endDate the ending date of this conference, in ISO string format
   * @param {Array<!Object>=} jsondata.location a list of locations of this conference: at least 1 entry.
   *                                            First entry: required; the promoted location; type {@link http://schema.org/PostalAddress};
   *                                            provide `image` property for location image.
   *                                            Other entries: optional; other venues; type {@link http://schema.org/Place}.
   * @param {Array<sdo.AggregateOffer>=} jsondata.offers a list of registration periods
   * @param {string=} jsondata.$currentRegistrationPeriod the name of an existing offer active at this time
   * @param {Array<!Object>=} jsondata.$passes a list of Pass-like JSON objects
   * @param {Array<!Object>=} jsondata.subEvent a list of sessions; types {@link http://schema.org/Event}
   * @param {Array<!Object>=} jsondata.potentialAction a list of sessions; types {@link http://schema.org/Action}
   * @param {Array<sdo.Person>=} jsondata.performer a list of speakers at the conference
   * @param {Array<!Object>=} jsondata.sponsor a list of supporters including non-sponsoring organizations; type {@link http://schema.org/Organization}
   * @param {Array<!Object>=} jsondata.$exhibitors a list of exhibitors; type {@link http://schema.org/Organization}
   * @param {Array<!Object>=} jsondata.organizer a list of organizers; type {@link http://schema.org/Person}
   *                                             An organizer is a chairperson, steering committee member,
   *                                             or other person who is responsible for organizing the conference.
   * @param {Array<!Object>=} jsondata.sameAs a list of social media links for this conference; type {@link http://schema.org/URL}
   * @param {string} jsondata.sameAs.name the name or identifier of the social media service (used for icons)
   * @param {string} jsondata.sameAs.url the URL of the conference’s social media profile or page
   * @param {string=} jsondata.sameAs.description short alternative text for non-visual media
   */
  constructor(jsondata) {
    /**
     * All the data for this conference.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata

    /** @private */ this._supporter_levels = []
    /** @private */ this._supporter_lists  = {}
    /** @private */ this._social          = {}
  }

  /**
   * @summary The name of this conference.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The URL of this conference.
   * @type {string}
   */
  get url() {
    return this._DATA.url
  }

  /**
   * @summary The theme of this conference.
   * @description The theme is a one-sentence or one-phrase motif,
   * and may be changed from year to year (from conference to conference).
   * @type {string}
   */
  get theme() {
    return this._DATA.description || ''
  }

  /**
   * @summary The hero image of this conference.
   * @type {string}
   */
  get heroImage() {
    return this._DATA.image || ''
  }

  /**
   * @summary The starting date of this conference.
   * @type {Date}
   */
  get startDate() {
    return new Date(this._DATA.startDate || null)
  }

  /**
   * @summary The ending date of this conference.
   * @type {Date}
   */
  get endDate() {
    return new Date(this._DATA.endDate || null)
  }

  /**
   * @summary Get the promoted location of this conference.
   * @description The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @type {PostalAddress}
   */
  get promoLoc() {
    return new PostalAddress(this._DATA.location && this._DATA.location[0] || {})
  }

  /**
   * @summary The location image of this conference.
   * @type {string}
   */
  get promoLocImage() {
    return this._DATA.location && this._DATA.location[0] && this._DATA.location[0].image || ''
  }

  /**
   * @summary Retrieve all registration periods of this conference.
   * @returns {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return (this._DATA.offers || []).slice()
  }

  /**
   * @summary The current registration period.
   * @description The current registration period is the registration period that is active at this time.
   * If none has been set, the first registration period is returned.
   * @type {RegistrationPeriod}
   */
  get currentRegistrationPeriod() {
    return (this._DATA.$currentRegistrationPeriod) ?
      this.getRegistrationPeriodsAll().find((pd) => pd.name === this._DATA.$currentRegistrationPeriod) || null :
      new RegistrationPeriod((this._DATA.offers && this._DATA.offers[0]) || {
        "@type": "AggregateOffer",
        "name" : "default",
      })
  }

  /**
   * @summary Retrieve all passes of this conference.
   * @returns {Array<!Object>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return (this._DATA.$passes || []).slice()
  }

  /**
   * @summary Retrieve a venue of this conference.
   * @param   {string} venue_label the label of the venue to access
   * @returns {?Venue} the specified venue
   */
  getVenue(venue_label) {
    let venue = (this._DATA.location || []).find(($place) => $place.description===venue_label)
    return (venue) ? new Venue(venue) : null
  }
  /**
   * @summary Retrieve all venues of this conference.
   * @returns {Array<Venue>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    return (this._DATA.location || []).slice(1).map(($place) => new Venue($place))
  }

  /**
   * @summary Retrieve all speakers of this conference.
   * @returns {Array<sdo.Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return (this._DATA.performer || []).slice()
  }

  /**
   * @summary Retrieve a supporter of this conference.
   * @param   {string} name the name of the supporter
   * @returns {?Supporter} the specified supporter
   */
  getSupporter(name) {
    let supporter = (this._DATA.sponsor || []).find(($org) => $org.name===name)
    return (supporter) ? new Supporter(supporter) : null
    // return this.getSupportersAll().find(($supporter) => $supporter.name === name) || null // TODO use this pattern instead
  }
  /**
   * @summary Retrieve all supporters of this conference.
   * @todo TODO turn this into a getter
   * @returns {Array<Supporter>} a shallow array of all supporters of this conference
   */
  getSupportersAll() {
    return (this._DATA.sponsor || []).map(($org) => new Supporter($org))
  }

  /**
   * @summary Retrieve an exhibitor of this conference.
   * @param   {string} name the name of the exhibitor
   * @returns {?Exhibitor} the specified exhibitor
   */
  getExhibitor(name) {
    let exhibitor = (this._DATA.$exhibitors || []).find(($org) => $org.name===name)
    return (exhibitor) ? new Exhibitor(exhibitor) : null
    // return this.getExhibitorsAll().find(($exhibitor) => $exhibitor.name===name) || null // TODO use this pattern instead
  }
  /**
   * @summary Retrieve all exhibitors of this conference.
   * @todo TODO turn this into a getter
   * @returns {Array<Exhibitor>} a shallow array of all exhibitors of this conference
   */
  getExhibitorsAll() {
    return (this._DATA.$exhibitors || []).map(($org) => new Exhibitor($org))
  }

  /**
   * @summary Retrieve an organizer of this conference.
   * @param   {string} id the name of the organizer
   * @returns {?Person} the specified organizer
   */
  getOrganizer(id) {
    let organizer = (this._DATA.organizer || []).find(($person) => $person.identifier===id)
    return (organizer) ? new Person(organizer) : null
    // return this.getOrganizersAll().find(($organizer) => $organizer.id===id) || null // TODO use this pattern instead
  }
  /**
   * @summary Retrieve all organizers of this conference.
   * @todo TODO turn this into a getter
   * @returns {Array<Person>} a shallow array of all organizers of this conference
   */
  getOrganizersAll() {
    return (this._DATA.organizer || []).map(($person) => new Person($person))
  }

  /**
   * @summary Return an object representing all social network profiles of this conference.
   * @returns {Array<!Object>} all this conference’s social media networks
   */
  getSocialAll() {
    return (this._DATA.sameAs || []).slice()
  }

  // setPrice(reg_period, pass, membership, price) {
  //   reg_period = reg_period.name || reg_period
  //   pass        = pass.name        || pass
  //   membership  = membership.name  || membership
  //   this.registration = this.registration || {}
  //   this.registration[reg_period][pass][membership] = price
  //   return this
  // }


  /**
   * @summary Render this conference in HTML.
   * @see Conference.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Conference#view.hero()`      - Hero Organism
     * - `Conference#view.otherYear()` - Other Year Organism
     * - `Conference#view.program()`   - Program Tabs Organism
     * - `Conference#view.supporterLevels()` - multiple SupporterBlock Components
     * @namespace Conference.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a `<header>` element with hero image marking up this conference’s main info.
       * @summary Call `Conference#view.hero()` to render this display.
       * @function Conference.VIEW.hero
       * @returns {string} HTML output
       */
      .addDisplay(function hero() {
        return new xjs.DocumentFragment(xHero.render({
          ...this._DATA,
          location: this._DATA.location[0],
        })).innerHTML()
      })
      /**
       * Return an `<aside>` element with other year backdrop marking up this conference’s main info.
       * @summary Call `Conference#view.otherYear()` to render this display.
       * @function Conference.VIEW.otherYear
       * @returns {string} HTML output
       */
      .addDisplay(function otherYear() {
        return new xjs.DocumentFragment(xOtheryear.render({
          ...this._DATA,
          location: this._DATA.location[0],
        })).innerHTML()
      })
      /**
       * Return a `xDateblock` component marking up this conference’s important dates.
       * @summary Call `Conference#view.importantDates()` to render this display.
       * @function Conference.VIEW.importantDates
       * @param   {boolean=} starred `true` if you want only starred dates to display
       * @returns {string} HTML output
       */
      .addDisplay(function importantDates(starred = false) {
        return new xjs.DocumentFragment(xDateblock.render(
          (this._DATA.potentialAction || []).filter((d) => (starred) ? d.$starred : true)
        )).innerHTML()
      })
      /**
       * Return an `<.o-Tablist[role="tablist"]>` marking up this conference’s program sessions.
       * Each tab contains a Program Heading Component
       * and its panel contains a Time Block Component for that date.
       * @summary Call `Conference#view.program()` to render this display.
       * @function Conference.VIEW.program
       * @param   {string} id unique id for form elements
       * @param   {boolean=} starred `true` if you want only starred sessions to display
       * @returns {string} HTML output
       */
      .addDisplay(function program(id, starred = false) {
        return new xjs.DocumentFragment(xProgram.render({
          id,
          sessions: (this._DATA.subEvent || []).filter((s) => (starred) ? s.$starred : true),
          starred,
        })).innerHTML()
      })
      /**
       * Return a list of `<section.c-SupporterBlock>` components containing this conference’s supporters
       * that have the specified levels.
       * @summary Call `Conference#view.supporterLevels()` to render this display.
       * @function Conference.VIEW.supporterLevels
       * @param   {(Array<string>|sdo.ItemList)} queue the list of supporter levels to display, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the supporter levels
       * @param   {boolean=} small if `true`, overrides logo sizing to small
       * @returns {string} HTML output
       */
      .addDisplay(function supporterLevels(queue, small = false) {
        const jsdom = require('jsdom')
        const template = jsdom.JSDOM.fragment(`
          <template>
            <ol class="o-List">
              <template>
                <li class="o-List__Item">
                  <link rel="import" data-import="template" href="../tpl/x-supporter-level.tpl.html"/>
                </li>
              </template>
            </ol>
          </template>
        `).querySelector('template')
        new xjs.DocumentFragment(template.content.querySelector('template').content).importLinks(__dirname)
        const xLevelList = new xjs.HTMLTemplateElement(template).setRenderer(function (frag, data) {
          new xjs.HTMLOListElement(frag.querySelector('ol')).populate(data.map((item, index) => ({ item, index })), function (f, d) {
            new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
              xSupporterLevel.render({
                name: d.item,
                classname: (small) ? 'c-SupporterBlock--sml' : (d.index + 1  <  data.length / 2) ? 'c-SupporterBlock--lrg' : 'c-SupporterBlock--med', // TODO make small the default size
                supporters: this.getSupportersAll().filter((supporter) => supporter._DATA.$level === d.item),
              })
            )
          }, this)
        })
        let supporterlevels = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        return new xjs.DocumentFragment(xLevelList.render(supporterlevels, this)).innerHTML()
      })
  }
}

module.exports = Conference
