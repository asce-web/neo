const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const View    = require('extrajs-view')
const Util    = require('./Util.class.js')

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
   * @param {Object} $confinfo an object with the following immutable properties:
   * @param {string} $confinfo.name the name of this conference
   * @param {string} $confinfo.url the url of this conference
   * @param {string=} $confinfo.theme the theme, or slogan, of this conference
   * @param {Date} $confinfo.start_date the starting date of this conference
   * @param {Date} $confinfo.end_date the ending date of this conference
   * @param {Object} $confinfo.promo_loc the promoted location of this conference
   * @param {string} $confinfo.promo_loc.text the promoted location displayed/abbreviated text (eg, "Portland, OR")
   * @param {string=} $confinfo.promo_loc.alt the accessible text of the location (eg, "Portland, Oregon")
   */
  constructor($confinfo) {
    /** @private @final */ this._NAME      = $confinfo.name
    /** @private @final */ this._URL       = $confinfo.url
    /** @private @final */ this._THEME     = $confinfo.theme
    /** @private @final */ this._START     = $confinfo.start_date
    /** @private @final */ this._END       = $confinfo.end_date
    /** @private @final */ this._PROMO_LOC = $confinfo.promo_loc
    /** @private */ this._reg_periods     = []
    /** @private */ this._passes          = []
    /** @private */ this._sessions        = []
    /** @private */ this._venues          = {}
    /** @private */ this._speakers        = []
    /** @private */ this._supporter_levels = []
    /** @private */ this._supporter_lists  = {}
    /** @private */ this._supporters       = []
    /** @private */ this._exhibitors       = []
    /** @private */ this._important_dates = []
    /** @private */ this._organizers      = []
    /** @private */ this._social          = {}
    /** @private */ this._regpd_curr_index = NaN
    /** @private */ this._venue_conf_key   = ''
  }

  /**
   * @summary Get the name of this conference.
   * @type {string}
   */
  get name() {
    return this._NAME
  }

  /**
   * @summary Get the URL of this conference.
   * @type {string}
   */
  get url() {
    return this._URL
  }

  /**
   * @summary Get the theme of this conference.
   * @description The theme is a one-sentence or one-phrase slogan,
   * and may be changed from year to year (from conference to conference).
   * @type {string}
   */
  get theme() {
    return this._THEME || ''
  }

  /**
   * @summary Get the start date of this conference.
   * @type {Date}
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * @summary Get the end date of this conference.
   * @type {Date}
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * @summary Get the promoted location of this conference.
   * @description The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @type {{text:string, alt:string}}
   */
  get promoLoc() {
    return this._PROMO_LOC || {}
  }

  /**
   * @summary Add a registration period to this conference.
   * @param {RegistrationPeriod} $registrationPeriod the registration period to add
   */
  addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  /**
   * @summary Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @returns {?RegistrationPeriod} the specified registration period
   */
  getRegistrationPeriod(name) {
    return this._reg_periods.find(($registrationPeriod) => $registrationPeriod.name===name) || null
  }
  /**
   * @summary Retrieve all registration periods of this conference.
   * @returns {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  /**
   * @summary Set or get the current registration period.
   * @description The current registration period is the registration period that is active at this time.
   * @param   {string=} reg_period_name the name of the registration period to set current
   * @returns {(Conference|RegistrationPeriod)} this conference || the set current registration period
   */
  currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else return this._reg_periods[this._regpd_curr_index]
  }

  /**
   * @summary Add a pass to this conference.
   * @param {Pass} $pass the pass to add
   */
  addPass($pass) {
    this._passes.push($pass)
    return this
  }
  /**
   * @summary Retrieve a pass of this conference.
   * @param   {string} name the name of the pass
   * @returns {?Pass} the specified pass
   */
  getPass(name) {
    return this._passes.find(($pass) => $pass.name===name) || null
  }
  /**
   * @summary Retrieve all passes of this conference.
   * @returns {Array<Pass>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return this._passes.slice()
  }

  /**
   * @summary Add a session to this conference.
   * @param {DateRange} $session the session to add
   */
  addSession($session) {
    this._sessions.push($session)
    return this
  }
  /**
   * @summary Retrieve a session of this conference.
   * @param   {string} name the name of the session
   * @returns {?DateRange} the specified session
   */
  getSession(name) {
    return this._sessions.find(($session) => $session.name===name) || null
  }
  /**
   * @summary Retrieve all sessions of this conference.
   * @returns {Array<DateRange>} a shallow array of all sessions of this conference
   */
  getSessionsAll() {
    return this._sessions.slice()
  }

  /**
   * @summary Add a venue to this conference.
   * @param {string} venue_label key for accessing the venue
   * @param {Place} $place the venue to add
   */
  addVenue(venue_label, $place) {
    this._venues[venue_label] = $place
    return this
  }
  /**
   * @summary Retrieve a venue of this conference.
   * @param   {string} venue_label the key for accessing the venue
   * @returns {Place} the specified venue
   */
  getVenue(venue_label) {
    return this._venues[venue_label]
  }
  /**
   * @summary Retrieve all venues of this conference.
   * @returns {Object<Place>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  /**
   * @summary Set or get the official conference venue for this conference.
   * @description The official conference venue is the venue at which this conference is held.
   * @param   {string} venue_label the key for accessing the venue
   * @returns {(Conference|Place)} this conference || the set conference venue
   */
  officialVenue(venue_label) {
    if (arguments.length) {
      this._venue_conf_key = venue_label
      return this
    } else return this.getVenue(this._venue_conf_key)
  }

  /**
   * @summary Add a speaker to this conference.
   * @param {Person} $person the speaker to add
   */
  addSpeaker($person) {
    this._speakers.push($person)
    return this
  }
  /**
   * @summary Retrieve a speaker of this conference.
   * @param   {string} id the id of the speaker
   * @returns {?Person} the specified speaker
   */
  getSpeaker(id) {
    return this._speakers.find(($person) => $person.id===id) || null
  }
  /**
   * @summary Retrieve all speakers of this conference.
   * @returns {Array<Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return this._speakers.slice()
  }

  /**
   * @summary Add a supporter level to this conference.
   * @param   {SupporterLevel} $supporterLevel the supporter level to add
   * @returns {Conference} this conference
   */
  addSupporterLevel($supporterLevel) {
    this._supporter_levels.push($supporterLevel)
    return this
  }
  /**
   * @summary Retrieve a supporter level of this conference.
   * @param   {string} name the name of the supporter level
   * @returns {?SupporterLevel} the specified supporter level
   */
  getSupporterLevel(name) {
    return this._supporter_levels.find(($supporterLevel) => $supporterLevel.name===name) || null
  }
  /**
   * @summary Retrieve all supporter levels of this conference.
   * @returns {Array<SupporterLevel>} a shallow array of all supporter levels of this conference
   */
  getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  /**
   * @summary Add a named subarray of supporter levels to this conference.
   * @param   {string} type the name of the subarray
   * @param   {Array<string>} supporter_level_names an array of pre-existing SupporterLevel names
   * @returns {Conference} this conference
   */
  addSupporterLevelQueue(type, supporter_level_names) {
    this._supporter_lists[type] = supporter_level_names
    return this
  }
  /**
   * @summary Get a named subarray of supporter levels of this conference.
   * @param   {string} type the name of the subarray
   * @returns {Array<SupporterLevel>} the array of SupporterLevel objects belonging to the type
   */
  getSupporterLevelQueue(type) {
    return (this._supporter_lists[type] || []).map((el) => this.getSupporterLevel(el))
  }

  /**
   * @summary Add a supporter to this conference.
   * @param   {Supporter} $supporter the supporter to add
   * @returns {Conference} this conference
   */
  addSupporter($supporter) {
    this._supporters.push($supporter)
    return this
  }
  /**
   * @summary Retrieve a supporter of this conference.
   * @param   {string} name the name of the supporter
   * @returns {?Supporter} the specified supporter
   */
  getSupporter(name) {
    return this._supporters.find(($supporter) => $supporter.name===name) || null
  }
  /**
   * @summary Retrieve all supporters of this conference.
   * @returns {Array<Supporter>} a shallow array of all supporters of this conference
   */
  getSupportersAll() {
    return this._supporters.slice()
  }

  /**
   * @summary Add an exhibitor to this conference.
   * @param   {Exhibitor} $exhibitor the exhibitor to add
   * @returns {Conference} this conference
   */
  addExhibitor($exhibitor) {
    this._exhibitors.push($exhibitor)
    return this
  }
  /**
   * @summary Retrieve an exhibitor of this conference.
   * @param   {string} name the name of the exhibitor
   * @returns {?Exhibitor} the specified exhibitor
   */
  getExhibitor(name) {
    return this._exhibitors.find(($exhibitor) => $exhibitor.name===name) || null
  }
  /**
   * @summary Retrieve all exhibitors of this conference.
   * @returns {Array<Exhibitor>} a shallow array of all exhibitors of this conference
   */
  getExhibitorsAll() {
    return this._exhibitors.slice()
  }

  /**
   * @summary Add an important date to this conference.
   * @param {DateRange} $importantDate the important date to add
   */
  addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  /**
   * @summary Retrieve an important date of this conference.
   * @param   {string} name the name of the important date
   * @returns {?DateRange} the specified important date
   */
  getImportantDate(name) {
    return this._important_dates.find(($importantDate) => $importantDate.name===name) || null
  }
  /**
   * @summary Retrieve all important dates of this conference.
   * @returns {Array<DateRange>} a shallow array of all important dates of this conference
   */
  getImportantDatesAll() {
    return this._important_dates.slice()
  }

  /**
   * @summary Add an organizer of this conference.
   * An organizer is a chairperson, steering committee member, or other person who is
   * responsible for organizing the conference.
   * @param {Person} $person the organizer to add
   */
  addOrganizer($person) {
    this._organizers.push($person)
    return this
  }
  /**
   * @summary Retrieve an organizer of this conference.
   * @param   {string} id the name of the organizer
   * @returns {?Person} the specified organizer
   */
  getOrganizer(id) {
    return this._organizers.find(($person) => $person.id===id) || null
  }
  /**
   * @summary Retrieve all organizers of this conference.
   * @returns {Array<Person>} a shallow array of all organizers of this conference
   */
  getOrganizersAll() {
    return this._organizers.slice()
  }

  /**
   * @summary Add a social network profile to this conference.
   * @param   {string} network_name the name of the social network
   * @param   {string} url the URL of this conference’s profile on the network
   * @param   {string=} text optional advisory text
   * @returns {Conference} this conference
   */
  addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * @summary Retrieve a social network profile of this conference.
   * @param   {string} network_name the name of the social network
   * @returns {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * @summary Return an object representing all social network profiles of this conference.
   * @returns {Object} shallow clone of this conference’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social)
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
     * Mark up the promoted location of this conference.
     * @private
     * @param  {Object} obj an object returned by `Conference#promoLoc()`
     * @returns {string} the markup for the location
     */
    function promoLoc(obj) {
      if (obj.alt) return new Element('abbr').attr('title',obj.alt).addContent(obj.text).html()
      else return obj.text
    }
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Conference#view.hero()`      - Hero Organism
     * - `Conference#view.otherYear()` - Other Year Organism
     * - `Conference#view.registrationLegend()` - Legend (list) of registration periods
     * - `Conference#view.program()`   - Program Tabs Organism
     * @namespace Conference.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a `<header>` element with hero image marking up this conference’s main info.
       * @summary Call `Conference#view.hero()` to render this display.
       * @function Conference.VIEW.hero
       * @param  {string=} block custom HTML to insert at the end
       * @returns {string} HTML output
       */
      .addDisplay(function hero(block = '') {
        return new Element('header').class('o-Runner o-Runner--pageHeader c-Banner c-Banner--hero c-ConfHed')
          .attr('data-instanceof','Conference')
          .addContent([
            new Element('div').class('o-Constrain')
              .addContent([
                new Element('h1').class('c-PageTitle c-ConfHed__Name')
                  .attr('itemprop','name')
                  .addContent(this.name),
                new Element('meta').attr('content',this.url).attr('itemprop','url'),
                new Element('p').class('o-Flex c-ConfHed__Detail')
                  .addContent([
                    new Element('span').class('o-Flex__Item c-ConfHed__Detail__Place h-Block')
                      .attr('itemprop','location')
                      .addContent(promoLoc(this.promoLoc)),
                    new Element('span').class('o-Flex__Item c-ConfHed__Detail__Dates h-Block')
                      .addContent([
                        new Element('time')
                          .attr('datetime',this.startDate.toISOString())
                          .attr('itemprop','startDate')
                          .addContent(xjs.Date.format(this.startDate, 'M j')),
                        `&ndash;`,
                        new Element('time')
                          .attr('datetime',this.endDate.toISOString())
                          .attr('itemprop','endDate')
                          .addContent(xjs.Date.format(this.endDate, 'M j')),
                      ]),
                  ]),
                new Element('p').class('c-ConfHed__Theme h-Hidden-nM')
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
       * @param   {string}  year exactly one of `'prev'` or `'next'`
       * @param   {string=} blurb custom HTML to advertise the prev/next year
       * @param   {string=} block custom HTML to insert at the end
       * @returns {string} HTML output
       */
      .addDisplay(function otherYear(year, blurb = '', block = '') {
        return new Element('aside').class('o-Runner o-Runner--highlight c-Banner c-Banner--blur c-ConfHed')
          .addClass(`c-Banner--${year}`)
          .attr({
            'data-instanceof': 'Conference',
            itemscope: '',
            itemtype : 'http://schema.org/Event',
          })
          .addContent([
            new Element('div').class('o-Constrain').addContent([
              new Element('h1').class('c-ConfHed__Name')
                .attr('itemprop','name')
                .addContent(this.name),
              new Element('meta').attr('content',this.startDate.toISOString()).attr('itemprop','startDate'),
              new Element('p').class('c-ConfHed__Detail')
                .attr('itemprop','location')
                .addContent(promoLoc(this.promoLoc)),
              new Element('p').class('h-Hidden-nM').addContent(blurb),
              block
            ])
          ])
          .html()
      })
      /**
       * Return a `<ul.c-Alert>` component containing the legend of registration periods for this conference.
       * @summary Call `Conference#view.registrationLegend()` to render this display.
       * @function Conference.VIEW.registrationLegend
       * @returns {string} HTML output
       */
      .addDisplay(function registrationLegend() {
        return new Element('ul').class('o-List o-Flex o-Flex--even c-Alert _regLegend').addContent(
          this.getRegistrationPeriodsAll().map((registration_period) => registration_period.view.legend())
        ).html()
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
         * @param   {boolean=} starred if true, only consider sessions that are starred
         * @returns {Array<{dateobj:Date, sessions:Array<DateRange>}>} an array grouping the sessions together
         */
        function groupSessions(starred = false) {
          let all_sessions = this.getSessionsAll().filter((s) => (starred) ? s.isStarred() : true)
          let returned = []
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
        return new Element('fieldset').class('o-Tablist o-Tablist--program').attr('role','tablist')
          .addContent([
            new Element('legend').class('h-Hidden').addContent(`Footer Tabs`),
            new Element('dl').class('o-Flex').id(id).addContent(
              groupSessions.call(this, starred).map((g, index) => Element.concat([
                new Element('dt').class('o-Flex__Item o-Tablist__Tab').attr('role','tab').addContent(
                  new Element('label').class('h-Block').addContent([
                    new Element('input').class('o-Tablist__Check h-Hidden').attr({
                      type   : 'radio',
                      name   : id,
                      value  : g.dateobj.toISOString(),
                      checked: (index===0) ? '' : null,
                    }),
                    new Element('time').class('c-ProgramHn h-Block')
                      .attr('datetime',g.dateobj.toISOString())
                      .addContent([
                        `${xjs.Date.DAY_NAMES[g.dateobj.getUTCDay()]},`,
                        new Element('br'),
                        xjs.Date.format(g.dateobj, 'M j'),
                      ]),
                  ])
                ),
                new Element('dd').class('o-Flex__Item o-Tablist__Panel').attr('role','tabpanel').addContent(
                  Util.view(g.sessions).timeBlock()
                ),
              ]))
            ),
          ])
          .html()
      })
  }
}

module.exports = Conference
