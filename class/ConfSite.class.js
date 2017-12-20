const Page     = require('sitepage').Page
const HTMLElement  = require('extrajs-dom').HTMLElement
const View     = require('extrajs-view')
const Color    = require('extrajs-color')
const ConfPage = require('./ConfPage.class.js')

/**
 * A conference site.
 * A website hosting a series of conferences,
 * with a name, url, slogan, logo, and color scheme.
 * @extends Page
 */
class ConfSite extends Page {
  /**
   * Construct a new ConfSite object.
   * @param {Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name name of this site
   * @param {string} jsondata.url url of the landing page for this site
   * @param {string=} jsondata.description the slogan (or tagline) of this site
   * @param {Array<string>=} jsondata.keywords keywords for this site
   * @param {string=} jsondata.image url of the logo file
   * @param {Array<string>=} jsondata.colors two color strings: `[primary, secondary]`, in formats supported by `extrajs-color`
   * @param {Object<string>=} jsondata.images a dictionary of image urls
   */
  constructor(jsondata) {
    super({ name: jsondata.name, url: jsondata.url })
    super.description(jsondata.description || '')
    super.keywords(jsondata.keywords || [])

    /**
     * This site’s logo.
     * @private
     * @final
     * @type {string}
     */
    this._LOGO = jsondata.image || ''
    /**
     * @summary This site’s colors.
     * @private
     * @final
     * @type {Array<string>}
     */
    this._COLORS = (jsondata.colors) ? [
      jsondata.colors[0] || '#660000',
      jsondata.colors[1] || '#ff6600',
    ] : ['#660000', '#ff6600'] // default Hokie colors
    /**
     * @summary This site’s images.
     * @private
     * @final
     * @type {Object<?string>}
     */
    this._IMAGES = {
      hero: (jsondata.images && jsondata.images.hero) || null,
      city: (jsondata.images && jsondata.images.city) || null,
      prev: (jsondata.images && jsondata.images.prev) || null,
      next: (jsondata.images && jsondata.images.next) || null,
    }
    /** @private */ this._conferences      = {}
    /** @private */ this._conf_curr_key   = null
    /** @private */ this._conf_prev_key   = null
    /** @private */ this._conf_next_key   = null
  }

  /**
   * @summary Overwrite superclass description() method.
   * @description This method only gets the description, it does not set it.
   * @todo TODO: update this to an ES6 getter once {@link Page#description} is updated.
   * @override
   * @param   {*} arg any argument
   * @returns {string} the description of this site
   */
  description(arg) {
    return super.description()
  }
  /**
   * @summary The slogan of this site.
   * @description The slogan is very brief, and is fixed for the entire series of conferences.
   * @type {string}
   */
  get slogan() {
    return this.description()
  }

  /**
   * @summary The url of this site’s logo.
   * @type {string} url of the logo
   */
  get logo() {
    return this._LOGO
  }

  /**
   * @summary The colors for this site: a CSS object containg custom properties with color string values.
   * @type {Object<string>}
   */
  get colors() {
    return ConfSite.colorStyles(Color.fromString(this._COLORS[0]), Color.fromString(this._COLORS[1]))
  }

  /**
   * @summary The image urls of this site.
   * @type {Object<string>}
   */
  get images() {
    return Object.assign({}, this._IMAGES)
  }

  /**
   * @summary Add a conference to this site.
   * @param   {string} conf_label key for accessing the conference, usually a year
   * @param   {Conference} $conference the conference to add
   * @returns {ConfSite} this site
   */
  addConference(conf_label, $conference) {
    this._conferences[conf_label] = $conference
    return this
  }
  /**
   * @summary Retrieve a conference of this site.
   * @param   {string} conf_label key for accessing the conference, usually a year
   * @returns {Conference} the specified conference
   */
  getConference(conf_label) {
    return this._conferences[conf_label]
  }
  /**
   * @summary Return an object representing all conferences of this site.
   * @description REVIEW: warning: infinite loop possible
   * @returns {Object} shallow clone of this site’s conferences object
   */
  getConferencesAll() {
    return xjs.Object.cloneDeep(this._conferences)
  }

  /**
   * Set or get the current conference of this site.
   * If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The current conference is the conference that is being promoted this cycle.
   * @param   {string=} conf_label key for accessing the conference
   * @returns {(ConfSite|Conference)} this site || the current conference
   */
  currentConference(conf_label) {
    if (arguments.length) {
      this._conf_curr_key = conf_label
      return this
    } else {
      return this.getConference(this._conf_curr_key)
    }
  }
  /**
   * @summary Set or get the previous conference of this site.
   * @description If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The previous conference is the conference that was promoted last cycle.
   * @param   {string=} conf_label key for accessing the conference
   * @returns {(ConfSite|Conference)} this site || the previous conference
   */
  prevConference(conf_label) {
    if (arguments.length) {
      this._conf_prev_key = conf_label
      return this
    } else return this.getConference(this._conf_prev_key)
  }
  /**
   * @summary Set or get the next conference of this site.
   * @description If setting, provide the argument key for accessing the added conference.
   * If getting, provide no argument.
   * The next conference is the conference that will be promoted next cycle.
   * @param   {string=} conf_label key for accessing the conference
   * @returns {(ConfSite|Conference)} this site || the next conference
   */
  nextConference(conf_label) {
    if (arguments.length) {
      this._conf_next_key = conf_label
      return this
    } else return this.getConference(this._conf_next_key)
  }

  /**
   * @summary Initialize this site: add the proper pages.
   * @description This method should only be called once; it resets pages every time called.
   * @returns {ConfSite} this site
   */
  init() {
    var self = this
    function pageTitle() { return this.name() + ' | ' + self.name() }
    return self
      .removeAll() //- NOTE IMPORTANT
      .add(new ConfPage('Home', 'index.html')
        .title(self.name())
        .description(self.slogan)
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


  /**
   * @summary Render this conference site in HTML.
   * @see ConfSite.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `ConfSite#view.siteTitle()` - SiteTitle component
     * @namespace ConfSite.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return an `<a.c-SiteTitle>` component marking up this conference site’s info.
       * @summary Call `ConfSite#view.siteTitle()` to render this display.
       * @function ConfSite.VIEW.siteTitle
       * @returns {string} HTML output
       */
      .addDisplay(function siteTitle() {
        return new HTMLElement('a').class('c-SiteTitle c-LinkCamo h-Block')
          .attr('data-instanceof','ConfSite')
          .attr('href',this.url())
          .addContent([
            new HTMLElement('img').class('c-SiteTitle__Logo').attr('src',this.logo).attr('alt','Home'),
            new HTMLElement('h1').class('c-SiteTitle__Name').addContent(this.name()),
            new HTMLElement('p').class('c-SiteTitle__Slogan').addContent(this.slogan),
          ])
          .html()
      })
  }



  /**
   * @summary Generate a color palette and return a style object with custom properties.
   * @param   {Color} $primary   the primary color for the site
   * @param   {Color} $secondary the secondary color for the site
   * @returns {Object<string>} a CSS object containg custom properties with color string values
   */
  static colorStyles($primary, $secondary) {
    let   primary_s2  =   $primary.darken(2/3, true)
    let   primary_s1  =   $primary.darken(1/3, true)
    let   primary_t1  =   $primary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let   primary_t2  =   $primary.darken(2/3, true).lighten(2/3, false) // two-thirds to white
    let secondary_s2  = $secondary.darken(2/3, true)
    let secondary_s1  = $secondary.darken(1/3, true)
    let secondary_t1  = $secondary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let secondary_t2  = $secondary.darken(2/3, true).lighten(2/3, false) // two-thirds to white

    let _g1 = $primary.mix($secondary, 1/4).desaturate(7/8, true)
    let _g2 = $secondary.mix($primary, 1/4).desaturate(7/8, true)

    let gray_dk_s2 = _g1.lighten( 1/12 - _g1.hslLum, false)
    let gray_dk_s1 = _g1.lighten( 2/12 - _g1.hslLum, false)
    let gray_dk    = _g1.lighten( 3/12 - _g1.hslLum, false)
    let gray_dk_t1 = _g1.lighten( 4/12 - _g1.hslLum, false)
    let gray_dk_t2 = _g1.lighten( 5/12 - _g1.hslLum, false)
    let gray_lt_s2 = _g2.lighten( 7/12 - _g2.hslLum, false)
    let gray_lt_s1 = _g2.lighten( 8/12 - _g2.hslLum, false)
    let gray_lt    = _g2.lighten( 9/12 - _g2.hslLum, false)
    let gray_lt_t1 = _g2.lighten(10/12 - _g2.hslLum, false)
    let gray_lt_t2 = _g2.lighten(11/12 - _g2.hslLum, false)

    return {
      '--color-primary'  :   $primary.toString('hex'),
      '--color-secondary': $secondary.toString('hex'),
      '--color-gray_dk'  :    gray_dk.toString('hex'),
      '--color-gray_lt'  :    gray_lt.toString('hex'),

      '--color-primary-shade2'  :   primary_s2.toString('hex'),
      '--color-primary-shade1'  :   primary_s1.toString('hex'),
      '--color-primary-tint1'   :   primary_t1.toString('hex'),
      '--color-primary-tint2'   :   primary_t2.toString('hex'),

      '--color-secondary-shade2': secondary_s2.toString('hex'),
      '--color-secondary-shade1': secondary_s1.toString('hex'),
      '--color-secondary-tint1' : secondary_t1.toString('hex'),
      '--color-secondary-tint2' : secondary_t2.toString('hex'),

      '--color-gray_dk-shade2'  :   gray_dk_s2.toString('hex'),
      '--color-gray_dk-shade1'  :   gray_dk_s1.toString('hex'),
      '--color-gray_dk-tint1'   :   gray_dk_t1.toString('hex'),
      '--color-gray_dk-tint2'   :   gray_dk_t2.toString('hex'),

      '--color-gray_lt-shade2'  :   gray_lt_s2.toString('hex'),
      '--color-gray_lt-shade1'  :   gray_lt_s1.toString('hex'),
      '--color-gray_lt-tint1'   :   gray_lt_t1.toString('hex'),
      '--color-gray_lt-tint2'   :   gray_lt_t2.toString('hex'),
    }
  }
}

module.exports = ConfSite
