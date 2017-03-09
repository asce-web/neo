var Page = require('sitepage').Page
var Color = require('csscolor').Color
var ConfPage = require('./ConfPage.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A conference site.
   * A site hosting a series of conferences,
   * with a name, url, taglinne,
   * logo, supporter levels and supporters, exhibitors, and contact information.
   * Construct a ConfSite object, given a name and url.
   * @constructor
   * @extends Page
   * @param {string} name name of this site
   * @param {string} url url of the landing page for this site
   * @param {string} tagline the tagline, or slogan, of this site
   */
  function ConfSite(name, url, tagline) {
    var self = this
    Page.call(self, { name: name, url: url })
    Page.prototype.description.call(self, tagline)
    self._logo             = ''
    self._colors           = {}
    self._conferences      = {}
    self._supporter_levels = []
    self._supporter_lists  = {}
    self._supporters       = []
    self._exhibitors       = []
    self._conf_curr_key   = null
    self._conf_prev_key   = null
    self._conf_next_key   = null
  }
  ConfSite.prototype = Object.create(Page.prototype)
  ConfSite.prototype.constructor = ConfSite

  // ACCESSOR FUNCTIONS
  /**
   * Overwrite superclass description() method.
   * This method only gets the description, it does not set it.
   * @override
   * @param  {*} arg any argument
   * @return {string} the description of this site
   */
  ConfSite.prototype.description = function description(arg) {
    return Page.prototype.description.call(this)
  }
  /**
   * Get the tagline of this site.
   * The tagline is very brief slogan, and is fixed for the entire series of conferences.
   * Equivalent to calling `Page.prototype.description()`.
   * @return {string} the tagline of this site
   */
  ConfSite.prototype.tagline = function tagline() {
    return this.description() || ''
  }

  /**
   * Set or get the logo of this site.
   * @param  {string=} logo url of the logo file
   * @return {(ConfSite|string)} this site || url of the logo
   */
  ConfSite.prototype.logo = function logo(logo) {
    if (arguments.length) {
      this._logo = logo
      return this
    } else return this._logo
  }

  /**
   * Set or get the colors for this site.
   * @param {Color=} $primary   a Color object for the primary color
   * @param {Color=} $secondary a Color object for the secondary color
   * @return {(ConfSite|Object)} this || a CSS style object containg custom properties and color string values
   */
  ConfSite.prototype.colors = function colors($primary, $secondary) {
    var self = this
    if (arguments.length) {
      this._colors = ConfSite.colorStyles($primary, $secondary)
      return this
    } else return this._colors
  }

  /**
   * Add a conference to this site.
   * @param {string} conf_label key for accessing the conference, usually a year
   * @param {Conference} $conference the conference to add
   * @return {ConfSite} this site
   */
  ConfSite.prototype.addConference = function addConference(conf_label, $conference) {
    this._conferences[conf_label] = $conference
    return this
  }
  /**
   * Retrieve a conference of this site.
   * @param  {string} conf_label key for accessing the conference, usually a year
   * @return {Conference} the specified conference
   */
  ConfSite.prototype.getConference = function getConference(conf_label) {
    return this._conferences[conf_label]
  }
  /**
   * This method does nothing.
   * @param  {string} conf_label key for accessing the conference, usually a year
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeConference = function removeConference(conf_label) {
    console.error('Sorry, you do not have this ability.\
    Instead, add a new conference overwriting the one you wish to delete.')
    return this
  }
  /**
   * Return an object representing all conferences of this site.
   * FIXME this should return a deep clone, not a shallow clone
   * @return {Object} shallow clone of this site’s conferences object
   */
  ConfSite.prototype.getConferencesAll = function getConferencesAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._conferences)
  }

  /**
   * Set or get the current conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The current conference is the conference that is being promoted this cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the current conference
   */
  ConfSite.prototype.currentConference = function currentConference(conf_label) {
    if (arguments.length) {
      this._conf_curr_key = conf_label
      return this
    } else {
      return this.getConference(this._conf_curr_key)
    }
  }
  /**
   * Set or get the previous conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The previous conference is the conference that was promoted last cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the previous conference
   */
  ConfSite.prototype.prevConference = function prevConference(conf_label) {
    if (arguments.length) {
      this._conf_prev_key = conf_label
      return this
    } else return this.getConference(this._conf_prev_key)
  }
  /**
   * Set or get the next conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The next conference is the conference that will be promoted next cycle.
   * @param  {string=} conf_label key for accessing the conference
   * @return {(ConfSite|Conference)} this site || the next conference
   */
  ConfSite.prototype.nextConference = function nextConference(conf_label) {
    if (arguments.length) {
      this._conf_next_key = conf_label
      return this
    } else return this.getConference(this._conf_next_key)
  }

  /**
   * Add a supporter level to this site.
   * @param {SupporterLevel} $supporterLevel the supporter level to add
   * @return {ConfSite} this site
   */
  ConfSite.prototype.addSupporterLevel = function addSupporterLevel($supporterLevel) {
    this._supporter_levels.push($supporterLevel)
    return this
  }
  /**
   * Retrieve a supporter level of this site.
   * @param  {string} name the name of the supporter level
   * @return {?SupporterLevel} the specified supporter level
   */
  ConfSite.prototype.getSupporterLevel = function getSupporterLevel(name) {
    return this._supporter_levels.find(function ($supporterLevel) { return $supporterLevel.name() === name }) || null
  }
  /**
   * Remove a supporter level from this site.
   * @param  {string} name the name of the supporter level
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeSupporterLevel = function removeSupporterLevel(name) {
    Util.spliceFromArray(this._supporter_levels, this.getSupporterLevel(name))
    return this
  }
  /**
   * Retrieve all supporter levels of this site.
   * @return {Array<SupporterLevel>} a shallow array of all supporter levels of this site
   */
  ConfSite.prototype.getSupporterLevelsAll = function getSupporterLevelsAll() {
    return this._supporter_levels.slice()
  }

  /**
   * Add a named subarray of supporter levels to this site.
   * @param {string} type the name of the subarray
   * @param {Array<string>} supporter_level_names an array of pre-existing SupporterLevel names
   * @return {ConfSite} this site
   */
  ConfSite.prototype.addSupporterLevelList = function addSupporterLevelList(type, supporter_level_names) {
    this._supporter_lists[type] = supporter_level_names
    return this
  }
  /**
   * Get a named subarray of supporter levels of this site.
   * @param  {string} type the name of the subarray
   * @return {Array<SupporterLevel>} the array of SupporterLevel objects belonging to the type
   */
  ConfSite.prototype.getSupporterLevelList = function getSupporterLevelList(type) {
    var self = this
    return (self._supporter_lists[type] || []).map(function (el) { return self.getSupporterLevel(el) })
  }

  /**
   * Add a supporter to this site.
   * @param {Supporter} $supporter the supporter to add
   * @return {ConfSite} this site
   */
  ConfSite.prototype.addSupporter = function addSupporter($supporter) {
    this._supporters.push($supporter)
    return this
  }
  /**
   * Retrieve a supporter of this site.
   * @param  {string} name the name of the supporter
   * @return {?Supporter} the specified supporter
   */
  ConfSite.prototype.getSupporter = function getSupporter(name) {
    return this._supporters.find(function ($supporter) { return $supporter.name() === name }) || null
  }
  /**
   * Remove a supporter of this site.
   * @param  {string} name the name of the supporter
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeSupporter = function removeSupporter(name) {
    Util.spliceFromArray(this._supporters, this.getSupporter(name))
    return this
  }
  /**
   * Retrieve all supporters of this site.
   * @return {Array<Supporter>} a shallow array of all supporters of this site
   */
  ConfSite.prototype.getSupportersAll = function getSupportersAll() {
    return this._supporters.slice()
  }

  /**
   * Add an exhibitor to this site.
   * @param {Exhibitor} $exhibitor the exhibitor to add
   * @return {ConfSite} this site
   */
  ConfSite.prototype.addExhibitor = function addExhibitor($exhibitor) {
    this._exhibitors.push($exhibitor)
    return this
  }
  /**
   * Retrieve an exhibitor of this site.
   * @param  {string} name the name of the exhibitor
   * @return {?Exhibitor} the specified exhibitor
   */
  ConfSite.prototype.getExhibitor = function getExhibitor(name) {
    return this._exhibitors.find(function ($exhibitor) { return $exhibitor.name() === name }) || null
  }
  /**
   * Remove an exhibitor of this site.
   * @param  {string} name the name of the exhibitor
   * @return {ConfSite} this site
   */
  ConfSite.prototype.removeExhibitor = function removeExhibitor(name) {
    Util.spliceFromArray(this._exhibitors, this.getSupporter(name))
    return this
  }
  /**
   * Retrieve all exhibitors of this site.
   * @return {Array<Exhibitor>} a shallow array of all exhibitors of this site
   */
  ConfSite.prototype.getExhibitorsAll = function getExhibitorsAll() {
    return this._exhibitors.slice()
  }

  // METHODS
  /**
   * Initialize this site: add the proper pages.
   * This method should only be called once; it resets pages every time called.
   * @return {ConfSite} this site
   */
  ConfSite.prototype.init = function init() {
    var self = this
    function pageTitle() { return this.name() + ' | ' + self.name() }
    return self
      .removeAll() //- NOTE IMPORTANT
      .add(new ConfPage('Home', 'index.html')
        .title(self.name())
        .description(self.tagline())
        .setIcon('home')
      )
      .add(new ConfPage('Registration', 'registration.html')
        .title(pageTitle)
        .description(`Register for ${self.name()} here.`)
        .setIcon('shopping_cart')
      )
      .add(new ConfPage('Program', 'program.html')
        .title(pageTitle)
        .description(`Program and agenda of ${self.name()}.`)
        .setIcon('event')
      )
      .add(new ConfPage('Location', 'location.html')
        .title(pageTitle)
        .description(`Location and where to stay for ${self.name()}.`)
        .setIcon('flight')
      )
      .add(new ConfPage('Speakers', 'speakers.html')
        .title(pageTitle)
        .description(`Current and prospective speakers at ${self.name()}.`)
        .setIcon('account_box')
      )
      .add(new ConfPage('Sponsor', 'sponsor.html')
        .title(pageTitle)
        .description(`Sponsors of ${self.name()}.`)
        .setIcon('people')
      )
      .add(new ConfPage('Exhibit', 'exhibit.html')
        .title(pageTitle)
        .description(`Exhibitors at ${self.name()}.`)
        .setIcon('work')
      )
      .add(new ConfPage('About', 'about.html')
        .title(pageTitle)
        .description(`About ${self.name()}.`)
        .setIcon('info_outline')
      )
      .add(new ConfPage('Contact', 'contact.html')
        .title(pageTitle)
        .description(`Contact us for questions and comments about ${self.name()}.`)
        .setIcon('email')
      )
  }

  // STATIC MEMBERS

  /**
   * Generate a color palette and return a style object with custom properties.
   * @param  {Color} $primary   the primary color for the site
   * @param  {Color} $secondary the secondary color for the site
   * @return {Object} a style object containg custom properties and color string values
   */
  ConfSite.colorStyles = function colorStyles($primary, $secondary) {
    var   primary_s2  =   $primary.darken(2/3, true)
    var   primary_s1  =   $primary.darken(1/3, true)
    var   primary_t1  =   $primary.darken(1/3, true).lighten(1/3, false) // one-third to white
    var   primary_t2  =   $primary.darken(2/3, true).lighten(2/3, false) // two-thirds to white
    var secondary_s2  = $secondary.darken(2/3, true)
    var secondary_s1  = $secondary.darken(1/3, true)
    var secondary_t1  = $secondary.darken(1/3, true).lighten(1/3, false) // one-third to white
    var secondary_t2  = $secondary.darken(2/3, true).lighten(2/3, false) // two-thirds to white

    var _g1 = $primary.mix($secondary, 1/4).desaturate(7/8, true)
    var _g2 = $secondary.mix($primary, 1/4).desaturate(7/8, true)

    var gray_dk_s2 = _g1.lighten( 1/12 - _g1.hslLum(), false)
    var gray_dk_s1 = _g1.lighten( 2/12 - _g1.hslLum(), false)
    var gray_dk    = _g1.lighten( 3/12 - _g1.hslLum(), false)
    var gray_dk_t1 = _g1.lighten( 4/12 - _g1.hslLum(), false)
    var gray_dk_t2 = _g1.lighten( 5/12 - _g1.hslLum(), false)
    var gray_lt_s2 = _g2.lighten( 7/12 - _g2.hslLum(), false)
    var gray_lt_s1 = _g2.lighten( 8/12 - _g2.hslLum(), false)
    var gray_lt    = _g2.lighten( 9/12 - _g2.hslLum(), false)
    var gray_lt_t1 = _g2.lighten(10/12 - _g2.hslLum(), false)
    var gray_lt_t2 = _g2.lighten(11/12 - _g2.hslLum(), false)

    return {
      '--color-primary'  :   $primary.toString('hex')
    , '--color-secondary': $secondary.toString('hex')
    , '--color-gray_dk'  :    gray_dk.toString('hex')
    , '--color-gray_lt'  :    gray_lt.toString('hex')

    , '--color-primary-shade2'  :   primary_s2.toString('hex')
    , '--color-primary-shade1'  :   primary_s1.toString('hex')
    , '--color-primary-tint1'   :   primary_t1.toString('hex')
    , '--color-primary-tint2'   :   primary_t2.toString('hex')

    , '--color-secondary-shade2': secondary_s2.toString('hex')
    , '--color-secondary-shade1': secondary_s1.toString('hex')
    , '--color-secondary-tint1' : secondary_t1.toString('hex')
    , '--color-secondary-tint2' : secondary_t2.toString('hex')

    , '--color-gray_dk-shade2'  :   gray_dk_s2.toString('hex')
    , '--color-gray_dk-shade1'  :   gray_dk_s1.toString('hex')
    , '--color-gray_dk-tint1'   :   gray_dk_t1.toString('hex')
    , '--color-gray_dk-tint2'   :   gray_dk_t2.toString('hex')

    , '--color-gray_lt-shade2'  :   gray_lt_s2.toString('hex')
    , '--color-gray_lt-shade1'  :   gray_lt_s1.toString('hex')
    , '--color-gray_lt-tint1'   :   gray_lt_t1.toString('hex')
    , '--color-gray_lt-tint2'   :   gray_lt_t2.toString('hex')
    }
  }

  return ConfSite
})()
