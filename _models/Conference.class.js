module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A conference event.
   * It may have a name, theme, dates, (promoted) location, passes, sessions, venues, speakers,
   * important dates, chairs, and other properties.
   * Construct a Conference object.
   * The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object} $confinfo an object with the following immutable properties:
   * @param {string} $confinfo.name the name of this conference
   * @param {string} $confinfo.url the url of this conference
   * @param {string} $confinfo.theme the theme, or slogan, of this conference
   * @param {Date} $confinfo.start_date the starting date of this conference
   * @param {Date} $confinfo.end_date the ending date of this conference
   * @param {Object} $confinfo.promo_loc the promoted location of this conference
   * @param {string} $confinfo.promo_loc.text the promoted location displayed/abbreviated text (eg, "Portland, OR")
   * @param {string=} $confinfo.promo_loc.title the elongated version of the location (eg, "Portland, Oregon")
   * @param {string=} $confinfo.promo_loc.blurb small paragraph about location. escaped plain-text (no HTML)
   */
  function Conference($confinfo) {
    var self = this
    $confinfo = $confinfo || {} // NOTE constructor overloading
    self._NAME      = $confinfo.name
    self._URL       = $confinfo.url
    self._THEME     = $confinfo.theme
    self._START     = $confinfo.start_date
    self._END       = $confinfo.end_date
    self._PROMO_LOC = $confinfo.promo_loc
    self._reg_periods     = []
    self._passes          = []
    self._sessions        = []
    self._venues          = {}
    self._speakers        = []
    self._important_dates = []
    self._organizers      = []
    self._social          = {}
    self._other_year_blurb= ''
    self._regpd_curr_index = NaN
    self._venue_conf_key   = ''
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this conference.
   * @return {string} the name of this conference
   */
  Conference.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the URL of this conference.
   * @return {string} the URL of this conference
   */
  Conference.prototype.url = function url() {
    return this._URL
  }

  /**
   * Get the theme of this conference.
   * The theme is a one-sentence or one-phrase slogan,
   * and may be changed from year to year (from conference to conference).
   * @return {string} the theme of this conference
   */
  Conference.prototype.theme = function theme() {
    return this._THEME || ''
  }

  /**
   * Get the start date of this conference.
   * @return {Date} the start date of this conference
   */
  Conference.prototype.startDate = function startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this conference.
   * @return {Date} the end date of this conference
   */
  Conference.prototype.endDate = function endDate() {
    return this._END || new Date()
  }

  /**
   * Get the promoted location of this conference.
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @return {Object} the promoted location for this conference
   */
  Conference.prototype.promoLoc = function promoLoc() {
    return this._PROMO_LOC || {}
  }

  /**
   * Add a registration period to this conference.
   * @param {RegistrationPeriod} $registrationPeriod the registration period to add
   */
  Conference.prototype.addRegistrationPeriod = function addRegistrationPeriod($registrationPeriod) {
    this._reg_periods.push($registrationPeriod)
    return this
  }
  /**
   * Retrieve a registration period of this conference.
   * @param  {string} name the name of the registration period
   * @return {?RegistrationPeriod} the specified registration period
   */
  Conference.prototype.getRegistrationPeriod = function getRegistrationPeriod(name) {
    return this._reg_periods.find(function ($registrationPeriod) { return $registrationPeriod.name() === name }) || null
  }
  /**
   * Remove a registration period from this conference.
   * @param  {string} name the name of the registration period
   * @return {Conference} this conference
   */
  Conference.prototype.removeRegistrationPeriod = function removeRegistrationPeriod(name) {
    Util.spliceFromArray(this._reg_periods, this.getRegistrationPeriod(name))
    return this
  }
  /**
   * Retrieve all registration periods of this conference.
   * @return {Array<RegistrationPeriod>} a shallow array of all registration periods of this conference.
   */
  Conference.prototype.getRegistrationPeriodsAll = function getRegistrationPeriodsAll() {
    return this._reg_periods.slice()
  }

  /**
   * Set or get the current registration period.
   * The current registration period is the registration period that is active at this time.
   * @param  {string=} reg_period_name the name of the registration period to set current
   * @return {(Conference|RegistrationPeriod)} this conference || the set current registration period
   */
  Conference.prototype.currentRegistrationPeriod = function currentRegistrationPeriod(reg_period_name) {
    if (arguments.length) {
      this._regpd_curr_index = this._reg_periods.indexOf(this.getRegistrationPeriod(reg_period_name))
      return this
    } else return this._reg_periods[this._regpd_curr_index]
  }

  /**
   * Add a pass to this conference.
   * @param {Pass} $pass the pass to add
   */
  Conference.prototype.addPass = function addPass($pass) {
    this._passes.push($pass)
    return this
  }
  /**
   * Retrieve a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {?Pass} the specified pass
   */
  Conference.prototype.getPass = function getPass(name) {
    return this._passes.find(function ($pass) { return $pass.name() === name }) || null
  }
  /**
   * Remove a pass of this conference.
   * @param  {string} name the name of the pass
   * @return {Conference} this conference
   */
  Conference.prototype.removePass = function removePass(name) {
    Util.spliceFromArray(this._passes, this.getPass(name))
    return this
  }
  /**
   * Retrieve all passes of this conference.
   * @return {Array<Pass>} a shallow array of all passes of this conference
   */
  Conference.prototype.getPassesAll = function getPassesAll() {
    return this._passes.slice()
  }

  /**
   * Add a session to this conference.
   * @param {Session} $session the session to add
   */
  Conference.prototype.addSession = function addSession($session) {
    this._sessions.push($session)
    return this
  }
  /**
   * Retrieve a session of this conference.
   * @param  {string} name the name of the session
   * @return {?Session} the specified session
   */
  Conference.prototype.getSession = function getSession(name) {
    return this._sessions.find(function ($session) { return $session.name() === name }) || null
  }
  /**
   * Remove a session of this conference.
   * @param  {string} name the name of the session
   * @return {Conference} this conference
   */
  Conference.prototype.removeSession = function removeSession(name) {
    Util.spliceFromArray(this._sessions, this.getSession(name))
    return this
  }
  /**
   * Retrieve all sessions of this conference.
   * @return {Array<Session>} a shallow array of all sessions of this conference
   */
  Conference.prototype.getSessionsAll = function getSessionsAll() {
    return this._sessions.slice()
  }

  /**
   * Add a venue to this conference.
   * @param {string} venue_label key for accessing the venue
   * @param {Place} $place the venue to add
   */
  Conference.prototype.addVenue = function addVenue(venue_label, $place) {
    this._venues[venue_label] = $place
    return this
  }
  /**
   * Retrieve a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Object} the specified venue
   */
  Conference.prototype.getVenue = function getVenue(venue_label) {
    return this._venues[venue_label]
  }
  /**
   * Remove a venue of this conference.
   * @param  {string} venue_label the key for accessing the venue
   * @return {Conference} this conference
   */
  Conference.prototype.removeVenue = function removeVenue(venue_label) {
    this._venues[venue_label] = null
    return this
  }
  /**
   * Retrieve all venues of this conference.
   * @return {Array<Object>} a shallow array of all venues of this conference
   */
  Conference.prototype.getVenuesAll = function getVenuesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._venues)
  }

  /**
   * Set or get the official conference venue for this conference.
   * The official conference venue is the venue at which this conference is held.
   * @param  {string} venue_label the key for accessing the venue
   * @return {(Conference|Object)} this conference || the set conference venue
   */
  Conference.prototype.conferenceVenue = function conferenceVenue(venue_label) {
    if (arguments.length) {
      this._venue_conf_key = venue_label
      return this
    } else return this.getVenue(this._venue_conf_key)
  }

  /**
   * Add a speaker to this conference.
   * @param {Person} $person the speaker to add
   */
  Conference.prototype.addSpeaker = function addSpeaker($person) {
    this._speakers.push($person)
    return this
  }
  /**
   * Retrieve a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {?Person} the specified speaker
   */
  Conference.prototype.getSpeaker = function getSpeaker(id) {
    return this._speakers.find(function ($person) { return $person.id() === id }) || null
  }
  /**
   * Remove a speaker of this conference.
   * @param  {string} id the id of the speaker
   * @return {Conference} this conference
   */
  Conference.prototype.removeSpeaker = function removeSpeaker(id) {
    Util.spliceFromArray(this._speakers, this.getSpeaker(id))
    return this
  }
  /**
   * Retrieve all speakers of this conference.
   * @return {Array<Person>} a shallow array of all speakers of this conference
   */
  Conference.prototype.getSpeakersAll = function getSpeakersAll() {
    return this._speakers.slice()
  }

  /**
   * Add an important date to this conference.
   * @param {ImportantDate} $importantDate the important date to add
   */
  Conference.prototype.addImportantDate = function addImportantDate($importantDate) {
    this._important_dates.push($importantDate)
    return this
  }
  /**
   * Retrieve an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {?ImportantDate} the specified important date
   */
  Conference.prototype.getImportantDate = function getImportantDate(name) {
    return this._important_dates.find(function ($importantDate) { return $importantDate.name() === name }) || null
  }
  /**
   * Remove an important date of this conference.
   * @param  {string} name the name of the important date
   * @return {Conference} this conference
   */
  Conference.prototype.removeImportantDate = function removeImportantDate(name) {
    Util.spliceFromArray(this._important_dates, this.getImportantDate(name))
    return this
  }
  /**
   * Retrieve all important dates of this conference.
   * @return {Array<ImportantDate>} a shallow array of all important dates of this conference
   */
  Conference.prototype.getImportantDatesAll = function getImportantDatesAll() {
    return this._important_dates.slice()
  }

  /**
   * Add an organizer of this conference.
   * An organizer is a chairperson, steering committee member, or other person who is
   * responsible for organizing the conference.
   * @param {Person} $person the organizer to add
   */
  Conference.prototype.addOrganizer = function addOrganizer($person) {
    this._organizers.push($person)
    return this
  }
  /**
   * Retrieve an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {?Person} the specified organizer
   */
  Conference.prototype.getOrganizer = function getOrganizer(id) {
    return this._organizers.find(function ($person) { return $person.id() === id }) || null
  }
  /**
   * Remove an organizer of this conference.
   * @param  {string} id the name of the organizer
   * @return {Conference} this conference
   */
  Conference.prototype.removeOrganizer = function removeOrganizer(id) {
    Util.spliceFromArray(this._organizers, this.getOrganizer(id))
    return this
  }
  /**
   * Retrieve all organizers of this conference.
   * @return {Array<Person>} a shallow array of all organizers of this conference
   */
  Conference.prototype.getOrganizersAll = function getOrganizersAll() {
    return this._organizers.slice()
  }

  /**
   * Add a social network profile to this conference.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this conference’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Conference} this conference
   */
  Conference.prototype.addSocial = function addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this conference.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  Conference.prototype.getSocial = function getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Remove a social network profile from this conference.
   * @param  {string} network_name the name of the social network
   * @return {Conference} this conference
   */
  Conference.prototype.removeSocial = function removeSocial(network_name) {
    this._social[network_name] = null
    return this
  }
  /**
   * Return an object representing all social network profiles of this conference.
   * @return {Object} shallow clone of this conference’s social object
   */
  Conference.prototype.getSocialAll = function getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  /**
   * Set or get the other year blurb of this conference.
   * The “other year blurb” is used to promote this conference if it happens
   * to be the conference of the previous or next year.
   * The blurb gives reasons to visit the conference page.
   * For example, promote reasons to attend or promote getting PDHs from a past event.
   * @param  {string=} text the other year blurb of this conference
   * @return {(Conference|string)} this conference || the other year blurb of this conference
   */
  Conference.prototype.otherYearBlurb = function otherYearBlurb(text) {
    if (arguments.length) {
      this._other_year_blurb = text
      return this
    } else return this._other_year_blurb
  }

  // METHODS
  Conference.prototype.setPrice = function setPrice(reg_period, pass, membership, price) {
    //- reg_period = reg_period.name || reg_period
    //- pass        = pass.name        || pass
    //- membership  = membership.name  || membership
    //- this.registration = this.registration || {}
    //- this.registration[reg_period][pass][membership] = price
    return this
  }
  /**
   * NOTE: TYPE DEFINITION
   * A group of sessions, all of which share the same date (excluding time of day).
   * Contains two properties:
   * - `datestr` - a string representing the date by which the sessions are grouped
   * - `sessions` - an array of those sessions
   * @typedef {Object} SessionGroup
   * @property {string} datestr - string in 'YYYY-MM-DD' format of all the sessions in the group
   * @property {Array<Session>} sessions - an array whose members all have the same date
   */
  /**
   * Categorize all the sessions of this conference by date and return the grouping.
   * Sessions with the same date (excluding time of day) are grouped together.
   * @see Session
   * @param  {boolean=} starred if true, only consider sessions that are starred
   * @return {Array<SessionGroup>} an array grouping the sessions together
   */
  Conference.prototype.groupSessions = function groupSessions(starred) {
    var all_sessions = this.getSessionsAll().filter(function ($session) {
      return (starred) ? $session.isStarred() : true
    })
    var $groupings = []
    function equalDays(date1, date2) {
      return date1.toISOString().slice(0,10) === date2.toISOString().slice(0,10)
    }
    for (var $session of all_sessions) {
      if (!$groupings.find(function ($sessionGroup) {
        return equalDays($sessionGroup.dateday, $session.startDate())
      })) {
        $groupings.push({
          dateday : $session.startDate()
        , sessions: all_sessions.filter(function (_event) {
            return equalDays(_event.startDate(), $session.startDate())
          })
        })
      }
    }
    return $groupings
  }

  return Conference
})()
