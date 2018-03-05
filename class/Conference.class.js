const xjs     = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View    = require('extrajs-view')

const Util    = require('./Util.class.js')
const RegistrationPeriod = require('./RegistrationPeriod.class.js')
const Pass = require('./Pass.class.js')
const DateRange = require('./DateRange.class.js')
const PostalAddress = require('./PostalAddress.class.js')
const Venue = require('./Venue.class.js')
const Person = require('./Person.class.js')
const Supporter = require('./Supporter.class.js')
const Exhibitor = require('./Exhibitor.class.js')

const ElemName = require('../lib/ElemName.js') // TEMP until we remove pug

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
   * @param {Array<!Object>=} jsondata.offers a list of registration periods; types {@link http://schema.org/AggregateOffer}
   * @param {string=} jsondata.$currentRegistrationPeriod the name of an existing offer active at this time
   * @param {Array<!Object>=} jsondata.$passes a list of Pass-like JSON objects
   * @param {Array<!Object>=} jsondata.subEvent a list of sessions; types {@link http://schema.org/Event}
   * @param {Array<!Object>=} jsondata.potentialAction a list of sessions; types {@link http://schema.org/Action}
   * @param {Array<!Object>=} jsondata.performer a list of speakers at the conference; type {@link http://schema.org/Person}
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
   * @summary Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @returns {?RegistrationPeriod} the specified registration period
   */
  getRegistrationPeriod(name) {
    let period = (this._DATA.offers || []).find(($offer) => $offer.name===name)
    return (period) ? new RegistrationPeriod(period) : null
  }
  /**
   * @summary Retrieve all registration periods of this conference.
   * @returns {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return (this._DATA.offers || []).map(($offer) => new RegistrationPeriod($offer))
  }

  /**
   * @summary The current registration period.
   * @description The current registration period is the registration period that is active at this time.
   * If none has been set, the first registration period is returned.
   * @type {RegistrationPeriod}
   */
  get currentRegistrationPeriod() {
    return (this._DATA.$currentRegistrationPeriod) ?
      this.getRegistrationPeriod(this._DATA.$currentRegistrationPeriod) :
      new RegistrationPeriod((this._DATA.offers && this._DATA.offers[0]) || {
        "@type": "AggregateOffer",
        "name" : "default",
      })
  }

  /**
   * @summary Retrieve a pass of this conference.
   * @param   {string} name the name of the pass
   * @returns {?Pass} the specified pass
   */
  getPass(name) {
    let pass = (this._DATA.$passes || []).find(($pass) => $pass.name===name)
    return (pass) ? new Pass(pass) : null
  }
  /**
   * @summary Retrieve all passes of this conference.
   * @returns {Array<Pass>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return (this._DATA.$passes || []).map(($pass) => new Pass($pass))
  }

  /**
   * @summary Retrieve a session of this conference.
   * @param   {string} name the name of the session
   * @returns {?DateRange} the specified session
   */
  getSession(name) {
    let session = (this._DATA.subEvent || []).find(($event) => $event.name===name)
    return (session) ? new DateRange(session) : null
  }
  /**
   * @summary Retrieve all sessions of this conference.
   * @returns {Array<DateRange>} a shallow array of all sessions of this conference
   */
  getSessionsAll() {
    return (this._DATA.subEvent || []).map(($event) => new DateRange($event))
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
   * @summary Retrieve a speaker of this conference.
   * @param   {string} id the id of the speaker
   * @returns {?Person} the specified speaker
   */
  getSpeaker(id) {
    return this.getSpeakersAll().find((person) => person.id===id) || null
  }
  /**
   * @summary Retrieve all speakers of this conference.
   * @todo TODO turn this into a getter
   * @returns {Array<Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return (this._DATA.performer || []).map((person) => new Person(person))
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
   * @summary Retrieve an important date of this conference.
   * @param   {string} name the name of the important date
   * @returns {?DateRange} the specified important date
   */
  getImportantDate(name) {
    let date = (this._DATA.potentialAction || []).find(($action) => $action.name===name)
    return (date) ? new DateRange(date) : null
  }
  /**
   * @summary Retrieve all important dates of this conference.
   * @returns {Array<DateRange>} a shallow array of all important dates of this conference
   */
  getImportantDatesAll() {
    return (this._DATA.potentialAction || []).map(($action) => new DateRange($action))
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
   * @summary Retrieve a social network profile of this conference.
   * @param   {string} name the name of the social network
   * @returns {?Object} an object representing the social network profile
   */
  getSocial(name) {
    return this.getSocialAll().find((url) => url.name===name) || null
  }
  /**
   * @summary Return an object representing all social network profiles of this conference.
   * @todo TODO turn this into a getter
   * @returns {Array<!Object>} all this conference’s social media networks
   */
  getSocialAll() {
    return (this._DATA.sameAs || []).map((url) => url)
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
       * @param   {string=} block custom HTML to insert at the end
       * @returns {string} HTML output
       */
      .addDisplay(function hero(block = '') {
        return ``
        return new HTMLElement('header').class('o-Runner o-Runner--pageHeader c-Banner c-ConfHed')
          .attr('data-instanceof','Conference')
          .style((this.heroImage !== '') ? { '--banner-img': `url('${this.heroImage}')` } : null)
          .addContent([
            new HTMLElement('div').class('h-Constrain')
              .addContent([
                new HTMLElement('h1').class('c-PageTitle c-ConfHed__Name')
                  .attr('itemprop','name')
                  .addContent(this.name),
                new HTMLElement('meta').attr('content',this.url).attr('itemprop','url'),
                new HTMLElement('p').class('o-Flex c-ConfHed__Detail')
                  .addContent([
                    new HTMLElement('span').class('o-Flex__Item c-ConfHed__Detail__Place h-Block')
                      .attr({
                        itemprop : 'location',
                        itemscope: '',
                        itemtype : 'http://schema.org/PostalAddress',
                      })
                      .addContent(Util.view(this.promoLoc).promoLoc()),
                    new HTMLElement('span').class('o-Flex__Item c-ConfHed__Detail__Dates h-Block')
                      .addContent([
                        new HTMLElement('time')
                          .attr('datetime',this.startDate.toISOString())
                          .attr('itemprop','startDate')
                          .addContent(xjs.Date.format(this.startDate, 'M j')),
                        `&ndash;`,
                        new HTMLElement('time')
                          .attr('datetime',this.endDate.toISOString())
                          .attr('itemprop','endDate')
                          .addContent(xjs.Date.format(this.endDate, 'M j')),
                      ]),
                  ]),
                new HTMLElement('p').class('c-ConfHed__Theme h-Hidden-nM')
                  .attr('itemprop','description')
                  .addContent(this.theme || `&nbsp;`), // (`\xa0` === `&nbsp;`)
                block,
              ])
          ])
          .html()
      })
      /**
       * Return an `<aside>` element with other year backdrop marking up this conference’s main info.
       * @summary Call `Conference#view.otherYear()` to render this display.
       * @function Conference.VIEW.otherYear
       * @param   {string=} blurb custom HTML to advertise the prev/next year
       * @param   {string=} block custom HTML to insert at the end
       * @returns {string} HTML output
       */
      .addDisplay(function otherYear(blurb = '', block = '') {
        return ``
        return new HTMLElement('aside').class('o-Runner o-Runner--highlight c-Banner c-Banner--blur c-ConfHed')
          .style((this.heroImage !== '') ? { '--banner-img': `url('${this.heroImage}')` } : null)
          .attr({
            'data-instanceof': 'Conference',
            itemscope: '',
            itemtype : 'http://schema.org/Event',
          })
          .addContent([
            new HTMLElement('div').class('h-Constrain').addContent([
              new HTMLElement('h1').class('c-ConfHed__Name')
                .attr('itemprop','name')
                .addContent(this.name),
              new HTMLElement('meta').attr('content',this.startDate.toISOString()).attr('itemprop','startDate'),
              new HTMLElement('p').class('c-ConfHed__Detail')
                .attr({
                  itemprop : 'location',
                  itemscope: '',
                  itemtype : 'http://schema.org/PostalAddress',
                })
                .addContent(Util.view(this.promoLoc).promoLoc()),
              new HTMLElement('p').class('h-Hidden-nM').addContent(blurb),
              block
            ])
          ])
          .html()
      })
      /**
       * Return a `<fieldset.o-Tablist>` Object marking up this conference’s program sessions.
       * Each tab contains a Program Heading Component
       * and its panel contains a Time Block Component for that date.
       * @summary Call `Conference#view.program()` to render this display.
       * @function Conference.VIEW.program
       * @param   {string} id unique id for form elements
       * @param   {boolean=} starred `true` if you want only starred sessions to display
       * @returns {string} HTML output
       */
      .addDisplay(function program(id, starred = false) {
        /**
         * @summary Categorize all the sessions of this conference by date and return the grouping.
         * @description
         * Returns an array of objects, each with a `dateobj` property: a Date;
         * and a `sessions` property: an array of {@link DateRange} objects,
         * all of which share the same date (excluding time of day).
         * @private
         * @returns {Array<{dateobj:Date, sessions:Array<DateRange>}>} an array grouping the sessions together
         */
        function groupSessions() {
          let all_sessions = this.getSessionsAll()
          const returned = []
          all_sessions.forEach(function (s) {
            if (!returned.find((sess_group) => xjs.Date.sameDate(sess_group.dateobj, s.start))) {
              returned.push({
                dateobj : s.start,
                sessions: all_sessions.filter((t) => xjs.Date.sameDate(t.start, s.start)),
              })
            }
          })
          return returned
        }
        return ElemName('fieldset').class('o-Tablist o-Tablist--program').attr('role','tablist')
          .append(...[
            ElemName('legend').class('h-Hidden').textContent(`Program Tabs`),
            ElemName('dl').class('o-Flex').id(id).innerHTML(
              groupSessions.call(this).map((g, index) => xjs.DocumentFragment.concat(...[
                ElemName('dt').class('o-Flex__Item o-Tablist__Tab').attr('role','tab').append(
                  ElemName('label').class('h-Block').append(...[
                    ElemName('input').class('o-Tablist__Check h-Hidden').attr({
                      type   : 'radio',
                      name   : id,
                      value  : g.dateobj.toISOString(),
                      checked: (index===0) ? '' : null,
                    }),
                    ElemName('time').class('c-ProgramHn h-Block')
                      .attr('datetime',g.dateobj.toISOString())
                      .append(...[
                        `${xjs.Date.DAY_NAMES[g.dateobj.getUTCDay()]},`,
                        ElemName('br'),
                        xjs.Date.format(g.dateobj, 'M j'),
                      ]),
                  ])
                ),
                ElemName('dd').class('o-Flex__Item o-Tablist__Panel').attr('role','tabpanel').innerHTML(
                  Util.view(g.sessions.filter((s) => (starred) ? s.isStarred : true)).timeBlock()
                ),
              ])).join('')
            ),
          ])
          .outerHTML()
      })
      /**
       * Return a `<section.c-SupporterBlock>` component containing this conference’s supporters
       * that have the specified level.
       * @summary Call `Conference#view.supporterLevels()` to render this display.
       * @function Conference.VIEW.supporterLevels
       * @param   {(Array<string>|!Object)} queue the list of supporter levels to display, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the supporter levels
       * @param   {boolean=} small if `true`, overrides logo sizing to small
       * @returns {string} HTML output
       */
      .addDisplay(function supporterLevels(queue, small = false) {
        const supporterlevels = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        // TODO make small the default size
        return xjs.DocumentFragment.concat(...supporterlevels.map((level, index) => `
          <section class="c-SupporterBlock ${(small) ? 'c-SupporterBlock--sml' : (index+1 < supporterlevels.length / 2) ? 'c-SupporterBlock--lrg' : 'c-SupporterBlock--med'}">
            <h1 class="c-SupporterBlock__Hn">${level}</h1>
            <ul class="o-List o-Flex c-SupporterBlock__List">${
              this.getSupportersAll()
                .filter((supporter) => supporter.level===level)
                .map((supporter) => `
                  <li class="o-List__Item o-Flex__Item c-SupporterBlock__List__Item">${supporter.view()}</li>
                `)
                .join('')
            }</ul>
          </section>
        `))
      })
  }
}

module.exports = Conference
