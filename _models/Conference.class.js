var Element = require('helpers-js').Element
var Util = require('./Util.class.js')

module.exports = class Conference {
  /**
   * A conference event.
   * It may have a name, theme, dates, (promoted) location,
   * passes, sessions, venues, speakers,
   * supporter levels and supporters, exhibitors, contact information,
   * important dates, organizers, and other properties.
   * Construct a Conference object.
   * The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $confinfo an object with the following immutable properties:
   * @param {string} $confinfo.name the name of this conference
   * @param {string} $confinfo.url the url of this conference
   * @param {string} $confinfo.theme the theme, or slogan, of this conference
   * @param {Date} $confinfo.start_date the starting date of this conference
   * @param {Date} $confinfo.end_date the ending date of this conference
   * @param {Object} $confinfo.promo_loc the promoted location of this conference
   * @param {string} $confinfo.promo_loc.text the promoted location displayed/abbreviated text (eg, "Portland, OR")
   * @param {string=} $confinfo.promo_loc.alt the accessible text of the location (eg, "Portland, Oregon")
   */
  constructor($confinfo = {}) {
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
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the URL of this conference.
   * @return {string} the URL of this conference
   */
  get url() {
    return this._URL
  }

  /**
   * Get the theme of this conference.
   * The theme is a one-sentence or one-phrase slogan,
   * and may be changed from year to year (from conference to conference).
   * @return {string} the theme of this conference
   */
  get theme() {
    return this._THEME || ''
  }

  /**
   * Get the start date of this conference.
   * @return {Date} the start date of this conference
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this conference.
   * @return {Date} the end date of this conference
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * Get the promoted location of this conference.
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @return {{text:string, alt:string}} the promoted location for this conference
   */
  get promoLoc() {
    return this._PROMO_LOC || {}
  }

  /**
   * Add a registration period to this conference.
   * @param {RegistrationPeriod} $registrationPeriod the registration period to add
   */
  addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  /**
   * Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @return {?RegistrationPeriod} the specified registration period
   */
  getRegistrationPeriod(name) {
    return this._reg_periods.find(($registrationPeriod) => $registrationPeriod.name===name) || null
  }
  /**
   * Retrieve all registration periods of this conference.
   * @return {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  /**
   * Set or get the current registration period.
   * The current registration period is the registration period that is active at this time.
   * @param  {string=} reg_period_name the name of the registration period to set current
   * @return {(Conference|RegistrationPeriod)} this conference || the set current registration period
   */
  currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else return this._reg_periods[this._regpd_curr_index]
  }

  /**
   * Add a pass to this conference.
   * @param {Pass} $pass the pass to add
   */
  addPass($pass) {
    this._passes.push($pass)
    return this
  }
  /**
   * Retrieve a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {?Pass} the specified pass
   */
  getPass(name) {
    return this._passes.find(($pass) => $pass.name===name) || null
  }
  /**
   * Retrieve all passes of this conference.
   * @return {Array<Pass>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return this._passes.slice()
  }

  /**
   * Add a session to this conference.
   * @param {Session} $session the session to add
   */
  addSession($session) {
    this._sessions.push($session)
    return this
  }
  /**
   * Retrieve a session of this conference.
   * @param  {string} name the name of the session
   * @return {?Session} the specified session
   */
  getSession(name) {
    return this._sessions.find(($session) => $session.name===name) || null
  }
  /**
   * Retrieve all sessions of this conference.
   * @return {Array<Session>} a shallow array of all sessions of this conference
   */
  getSessionsAll() {
    return this._sessions.slice()
  }

  /**
   * Add a venue to this conference.
   * @param {string} venue_label key for accessing the venue
   * @param {Place} $place the venue to add
   */
  addVenue(venue_label, $place) {
    this._venues[venue_label] = $place
    return this
  }
  /**
   * Retrieve a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Place} the specified venue
   */
  getVenue(venue_label) {
    return this._venues[venue_label]
  }
  /**
   * Retrieve all venues of this conference.
   * @return {Object<Place>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  /**
   * Set or get the official conference venue for this conference.
   * The official conference venue is the venue at which this conference is held.
   * @param  {string} venue_label the key for accessing the venue
   * @return {(Conference|Place)} this conference || the set conference venue
   */
  officialVenue(venue_label) {
    if (arguments.length) {
      this._venue_conf_key = venue_label
      return this
    } else return this.getVenue(this._venue_conf_key)
  }

  /**
   * Add a speaker to this conference.
   * @param {Person} $person the speaker to add
   */
  addSpeaker($person) {
    this._speakers.push($person)
    return this
  }
  /**
   * Retrieve a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {?Person} the specified speaker
   */
  getSpeaker(id) {
    return this._speakers.find(($person) => $person.id===id) || null
  }
  /**
   * Retrieve all speakers of this conference.
   * @return {Array<Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return this._speakers.slice()
  }

  /**
   * Add a supporter level to this conference.
   * @param {SupporterLevel} $supporterLevel the supporter level to add
   * @return {Conference} this conference
   */
  addSupporterLevel($supporterLevel) {
    this._supporter_levels.push($supporterLevel)
    return this
  }
  /**
   * Retrieve a supporter level of this conference.
   * @param  {string} name the name of the supporter level
   * @return {?SupporterLevel} the specified supporter level
   */
  getSupporterLevel(name) {
    return this._supporter_levels.find(($supporterLevel) => $supporterLevel.name===name) || null
  }
  /**
   * Retrieve all supporter levels of this conference.
   * @return {Array<SupporterLevel>} a shallow array of all supporter levels of this conference
   */
  getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  /**
   * Add a named subarray of supporter levels to this conference.
   * @param {string} type the name of the subarray
   * @param {Array<string>} supporter_level_names an array of pre-existing SupporterLevel names
   * @return {Conference} this conference
   */
  addSupporterLevelQueue(type, supporter_level_names) {
    this._supporter_lists[type] = supporter_level_names
    return this
  }
  /**
   * Get a named subarray of supporter levels of this conference.
   * @param  {string} type the name of the subarray
   * @return {Array<SupporterLevel>} the array of SupporterLevel objects belonging to the type
   */
  getSupporterLevelQueue(type) {
    return (this._supporter_lists[type] || []).map((el) => this.getSupporterLevel(el))
  }

  /**
   * Add a supporter to this conference.
   * @param {Supporter} $supporter the supporter to add
   * @return {Conference} this conference
   */
  addSupporter($supporter) {
    this._supporters.push($supporter)
    return this
  }
  /**
   * Retrieve a supporter of this conference.
   * @param  {string} name the name of the supporter
   * @return {?Supporter} the specified supporter
   */
  getSupporter(name) {
    return this._supporters.find(($supporter) => $supporter.name===name) || null
  }
  /**
   * Retrieve all supporters of this conference.
   * @return {Array<Supporter>} a shallow array of all supporters of this conference
   */
  getSupportersAll() {
    return this._supporters.slice()
  }

  /**
   * Add an exhibitor to this conference.
   * @param {Exhibitor} $exhibitor the exhibitor to add
   * @return {Conference} this conference
   */
  addExhibitor($exhibitor) {
    this._exhibitors.push($exhibitor)
    return this
  }
  /**
   * Retrieve an exhibitor of this conference.
   * @param  {string} name the name of the exhibitor
   * @return {?Exhibitor} the specified exhibitor
   */
  getExhibitor(name) {
    return this._exhibitors.find(($exhibitor) => $exhibitor.name===name) || null
  }
  /**
   * Retrieve all exhibitors of this conference.
   * @return {Array<Exhibitor>} a shallow array of all exhibitors of this conference
   */
  getExhibitorsAll() {
    return this._exhibitors.slice()
  }

  /**
   * Add an important date to this conference.
   * @param {ImportantDate} $importantDate the important date to add
   */
  addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  /**
   * Retrieve an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {?ImportantDate} the specified important date
   */
  getImportantDate(name) {
    return this._important_dates.find(($importantDate) => $importantDate.name===name) || null
  }
  /**
   * Retrieve all important dates of this conference.
   * @return {Array<ImportantDate>} a shallow array of all important dates of this conference
   */
  getImportantDatesAll() {
    return this._important_dates.slice()
  }

  /**
   * Add an organizer of this conference.
   * An organizer is a chairperson, steering committee member, or other person who is
   * responsible for organizing the conference.
   * @param {Person} $person the organizer to add
   */
  addOrganizer($person) {
    this._organizers.push($person)
    return this
  }
  /**
   * Retrieve an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {?Person} the specified organizer
   */
  getOrganizer(id) {
    return this._organizers.find(($person) => $person.id===id) || null
  }
  /**
   * Retrieve all organizers of this conference.
   * @return {Array<Person>} a shallow array of all organizers of this conference
   */
  getOrganizersAll() {
    return this._organizers.slice()
  }

  /**
   * Add a social network profile to this conference.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this conference’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Conference} this conference
   */
  addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this conference.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Return an object representing all social network profiles of this conference.
   * @return {Object} shallow clone of this conference’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
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
   * NOTE: TYPE DEFINITION
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "SessionGroup",
   *   "description": "a group of sessions, all of which share the same date (excluding time of day)",
   *   "type": "object",
   *   "additionalProperties": false,
   *   "required": ["datestr", "sessions"],
   *   "properties": {
   *     "datestr" : { "type": "string", "description": "string (in 'YYYY-MM-DD' format) representing the date by which the sessions are grouped" },
   *     "sessions": {
   *       "type": "array",
   *       "description": "an array of Sessions whose members all have the same date",
   *       "items": { "type": "Session" }
   *     }
   *   }
   * }
   * @typedef {Object} SessionGroup
   * @property {string} datestr string (in 'YYYY-MM-DD' format) representing the date by which the sessions are grouped
   * @property {Array<Session>} sessions an array of Sessions whose members all have the same date
   */
  /**
   * Categorize all the sessions of this conference by date and return the grouping.
   * Sessions with the same date (excluding time of day) are grouped together.
   * @see Session
   * @param  {boolean=} starred if true, only consider sessions that are starred
   * @return {Array<SessionGroup>} an array grouping the sessions together
   */
  groupSessions(starred) {
    let all_sessions = this.getSessionsAll().filter(($session) => (starred) ? $session.isStarred() : true)
    let $groupings = []
    function equalDays(date1, date2) {
      return date1.toISOString().slice(0,10) === date2.toISOString().slice(0,10)
    }
    all_sessions.forEach(function ($session) {
      if (!$groupings.find(($sessionGroup) => equalDays($sessionGroup.dateday, $session.startDate))) {
        $groupings.push({
          dateday : $session.startDate,
          sessions: all_sessions.filter((_event) => equalDays(_event.startDate, $session.startDate)),
        })
      }
    })
    return $groupings
  }


  /**
   * Markup this conference in HTML.
   * @param  {Conference.Display=} display one of the output displays
   * @param  {Object=} options display-specific options (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = Conference.Display.HERO, options = {}) {
    /**
     * Mark up the promoted location of this conference.
     * @param  {Object} obj a `Conference#promoLoc()` object
     * @return {string} the markup for the location
     */
    function promoLoc(obj) {
      if (obj.alt) return new Element('abbr').attr('title',obj.alt).addContent(obj.text).html()
      else return obj.text
    }
    switch (display) {
      /**
       * Return a Hero organism.
       * @param  {string=} block custom HTML to insert at the end
       * @return {string} <header> element containing hero image
       */
      case Conference.Display.HERO: return (function (block = '') {
        return new Element('header').class('o-Runner o-Runner--pageHeader c-Banner c-Banner--hero c-ConfHed')
          .addElements([
            new Element('div').class('o-Constrain')
              .addElements([
                new Element('h1').class('c-PageTitle c-ConfHed__Name')
                  .attr('itemprop','name')
                  .addContent(this.name),
                new Element('meta').attr('content',this.url).attr('itemprop','url'),
                new Element('p').class('o-Flex c-ConfHed__Detail')
                  .addElements([
                    new Element('span').class('o-Flex__Item c-ConfHed__Detail__Place h-Block')
                      .attr('itemprop','location')
                      .addContent(promoLoc(this.promoLoc)),
                    new Element('span').class('o-Flex__Item c-ConfHed__Detail__Dates h-Block')
                      .addElements([
                        new Element('time')
                          .attr('datetime',this.startDate.toISOString())
                          .attr('itemprop','startDate')
                          .addContent(Util.Date.format(this.startDate, 'M j')),
                        new Element('span').addContent(`&ndash;`),
                        new Element('time')
                          .attr('datetime',this.endDate.toISOString())
                          .attr('itemprop','endDate')
                          .addContent(Util.Date.format(this.endDate, 'M j')),
                      ]),
                  ]),
                new Element('p').class('c-ConfHed__Theme h-Hidden-nM')
                  .attr('itemprop','description')
                  .addContent(this.theme || `&nbsp;`), // (`\xa0` === `&nbsp;`)
              ])
              .addContent(block),
          ])
          .html()
      }).call(this, options.block)
      /**
       * Return an Other Year organism.
       * @param  {string}  year exactly one of `'prev'` or `'next'`
       * @param  {string=} blurb custom HTML to advertise the prev/next year
       * @param  {string=} block custom HTML to insert at the end
       * @return {string} <aside> element containing prev/next year image
       */
      case Conference.Display.OTHER_YEAR: return (function (year, blurb = '', block = '') {
        return new Element('aside').class('o-Runner o-Runner--highlight c-Banner c-Banner--blur c-ConfHed')
          .addClass(`c-Banner--${year}`)
          .attr({
            itemscope: '',
            itemtype : 'http://schema.org/Event',
          })
          .addElements([
            new Element('div').class('o-Constrain')
              .addElements([
                new Element('h1').class('c-ConfHed__Name')
                  .attr('itemprop','name')
                  .addContent(this.name),
                new Element('meta').attr('content',this.startDate.toISOString()).attr('itemprop','startDate'),
                new Element('p').class('c-ConfHed__Detail')
                  .attr('itemprop','location')
                  .addContent(promoLoc(this.promoLoc)),
                new Element('p').class('h-Hidden-nM').addContent(blurb),
              ])
              .addContent(block),
          ])
          .html()
      }).call(this, options.year, options.blurb, options.block)
      default:
        return this.view(Conference.Display.HERO)
    }
  }



  /**
   * Enum for conference site displays.
   * @enum {string}
   */
  static get Display() {
    return {
      /** Hero organism. */       HERO: 'hero',
      /** Other Year organism. */ OTHER_YEAR: 'otherYear',
    }
  }
}
