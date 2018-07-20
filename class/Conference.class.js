const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View = require('extrajs-view')

const Person             = require('./Person.class.js')

const xHero           = require('../tpl/x-hero.tpl.js')
const xOtheryear      = require('../tpl/x-otheryear.tpl.js')
const xProgram        = require('../tpl/x-program.tpl.js')
const xDateblock      = require('../tpl/x-dateblock.tpl.js')
const xExhibitor = require('../tpl/x-exhibitor.tpl.js')
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
   *                                            Other entries: optional; other venues; type {@link http://schema.org/Accommodation}.
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
   * @param {Array<!Object>=} jsondata.$social a list of social media links for this conference; type {@link http://schema.org/URL}
   * @param {string}          jsondata.$social.name the name or identifier of the social media service (used for icons)
   * @param {string}          jsondata.$social.url the URL of the conference’s social media profile or page
   * @param {string=}         jsondata.$social.description short alternative text for non-visual media
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
   * @type {sdo.PostalAddress}
   */
  get promoLoc() {
    return this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" }
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
   * @returns {Array<sdo.AggregateOffer>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return (this._DATA.offers || []).slice()
  }

  /**
   * @summary The current registration period.
   * @description The current registration period is the registration period that is active at this time.
   * If none has been set, the first registration period is returned.
   * @type {sdo.AggregateOffer}
   */
  get currentRegistrationPeriod() {
    let default_ = {
      "@type": "AggregateOffer",
      "name" : "default",
    }
    return (this._DATA.$currentRegistrationPeriod) ?
      this.getRegistrationPeriodsAll().find((pd) => pd.name === this._DATA.$currentRegistrationPeriod) || default_ :
      this._DATA.offers && this._DATA.offers[0] || default_
  }

  /**
   * @summary Retrieve all passes of this conference.
   * @returns {Array<!Object>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return (this._DATA.$passes || []).slice()
  }

  /**
   * @summary Retrieve all venues of this conference.
   * @returns {Array<sdo.Accommodation>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    return (this._DATA.location || []).slice(1)
  }

  /**
   * @summary Retrieve all speakers of this conference.
   * @returns {Array<sdo.Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return (this._DATA.performer || []).slice()
  }

  /**
   * @summary Retrieve all organizers of this conference.
   * @returns {Array<sdo.Person>} a shallow array of all organizers of this conference
   */
  getOrganizersAll() {
    return (this._DATA.organizer || []).slice()
  }

  /**
   * @summary Return an object representing all social network profiles of this conference.
   * @returns {Array<!Object>} all this conference’s social media networks
   */
  getSocialAll() {
    return (this._DATA.$social || []).slice()
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
          location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
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
          location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
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
        return new xjs.DocumentFragment(xProgram.render(
          (this._DATA.subEvent || []).filter((s) => (starred) ? s.$starred : true),
          null,
          { id, starred }
        )).innerHTML()
      })
      /**
       * Return a list of `<section.c-SupporterBlock>` components containing this conference’s supporters
       * that have the specified levels.
       * @summary Call `Conference#view.supporterLevels()` to render this display.
       * @function Conference.VIEW.supporterLevels
       * @param   {(Array<string>|sdo.ItemList)} queue the list of supporter levels to display, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the supporter levels
       * @param   {boolean=} small should logo sizing be overridden to small?
       * @returns {string} HTML output
       */
      .addDisplay(function supporterLevels(queue, small = false) {
        const xListSupporterLevel = xjs.HTMLOListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ol')).addClass('o-List')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item')
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-supporter-level.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ol')).populate(data.map((name, index) => ({ name, index })), function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xSupporterLevel.render({
                  name: d.name,
                  classname: (o.small) ? 'c-SupporterBlock--sml' : (d.index + 1  <  data.length / 2) ? 'c-SupporterBlock--lrg' : 'c-SupporterBlock--med', // TODO make small the default size
                  supporters: (this.sponsor || []).filter((supporter) => supporter.$level === d.name),
                })
              )
            }, this, { small: opts.small })
          })
        let items = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        return new xjs.DocumentFragment(xListSupporterLevel.render(items, this._DATA, { small })).innerHTML()
      })
      /**
       * Return a list of `<div>` elements marking up this conference’s exhibitors.
       * @summary Call `Conference#view.exhibitorList()` to render this display.
       * @function Conference.VIEW.exhibitorList
       * @returns {string} HTML output
       */
      .addDisplay(function exhibitorList() {
        const xListExhibitor = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-exhibitor.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xExhibitor.render(d)
              )
            })
          })
        return new xjs.DocumentFragment(xListExhibitor.render(this._DATA.$exhibitors || [])).innerHTML()
      })
  }
}

module.exports = Conference
