const Page     = require('sitepage').Page
const HTMLElement  = require('extrajs-dom').HTMLElement
const View     = require('extrajs-view')
const Color    = require('extrajs-color')
const Conference = require('./Conference.class.js')
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
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name name of this site
   * @param {string} jsondata.url url of the landing page for this site
   * @param {string=} jsondata.description the slogan (or tagline) of this site
   * @param {Array<string>=} jsondata.keywords keywords for this site
   * @param {string=} jsondata.image url of the logo file
   * @param {Array<string>=} jsondata.$colors two color strings: `[primary, secondary]`, in formats supported by `extrajs-color`
   * @param {Object<string>=} jsondata.$images a dictionary of image urls
   * @param {!Object<!Object>} jsondata.conferences a dictionary of conferences; types {@link http://schema.org/Event}
   * @param {string} jsondata.currentConference  the key of an existing conference; used as the current  conference in this series
   * @param {string} jsondata.previousConference the key of an existing conference; used as the previous conference in this series
   * @param {string} jsondata.nextConference     the key of an existing conference; used as the next     conference in this series
   * @param {Array<!Object>=} jsondata.$queues a list containing types {@link http://schema.org/ItemList}, which list any number and type of things
   * @param {Array<!Object>=} jsondata.sameAs a list of social media links for this site; type {@link http://schema.org/URL}
   * @param {string} jsondata.sameAs.name the name or identifier of the social media service (used for icons)
   * @param {string} jsondata.sameAs.url the URL of the site’s social media profile or page
   * @param {string=} jsondata.sameAs.description short alternative text for non-visual media
   */
  constructor(jsondata) {
    super({ name: jsondata.name, url: jsondata.url })
    super.description(jsondata.description || '')
    super.keywords(jsondata.keywords || [])

    /**
     * All the data for this site.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata

    /** @private TEMP: finish */
    /**
     * TEMP: list of Conference objects
     * @todo TODO: remove when all data is imported into JSON
     * @private
     * @final
     * @type {!Object<Conference>}
     */
    this._conferences = (function () {
      const returned = {}
      for (let key in this._DATA.conferences) {
        returned[key] = new Conference(this._DATA.conferences[key])
      }
      return returned
    }).call(this)
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
    return this._DATA.image || ''
  }

  /**
   * @summary The colors for this site: a CSS object containg custom properties with color string values.
   * @type {Object<string>}
   */
  get colors() {
    let colors = (this._DATA.$colors) ? [
      this._DATA.$colors[0] || '#660000',
      this._DATA.$colors[1] || '#ff6600',
    ] : ['#660000', '#ff6600'] // default Hokie colors
    return ConfSite.colorStyles(Color.fromString(colors[0]), Color.fromString(colors[1]))
  }

  /**
   * @summary The image urls of this site.
   * @type {Object<?string>}
   */
  get images() {
    return {
      hero: (this._DATA.$images && this._DATA.$images.hero) || null,
      city: (this._DATA.$images && this._DATA.$images.city) || null,
      prev: (this._DATA.$images && this._DATA.$images.prev) || null,
      next: (this._DATA.$images && this._DATA.$images.next) || null,
    }
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
   * The current conference of this site.
   * @description The current conference is the conference that is being promoted this cycle.
   * @type {Conference} the current conference
   */
  get currentConference() {
    return this.getConference(this._DATA.currentConference)
  }
  /**
   * @summary The previous conference of this site.
   * @description The previous conference is the conference that was promoted last cycle.
   * @type {Conference} the previous conference
   */
  get prevConference() {
    return this.getConference(this._DATA.previousConference)
  }
  /**
   * @summary The next conference of this site.
   * @description The next conference is the conference that will be promoted next cycle.
   * @type {Conference} the next conference
   */
  get nextConference() {
    return this.getConference(this._DATA.nextConference)
  }

  /**
   * @summary Retrieve a queue added to this site.
   * @param   {string} name the name of the queue
   * @returns {?Object} an {@link http://schema.org/ItemList} type
   */
  getQueue(name) {
    return this.getQueuesAll().find((list) => list.name===name) || null
  }
  /**
   * @summary Return all queues on this site.
   * @todo TODO turn this into a getter
   * @returns {Array<!Object>} all this site’s queues
   */
  getQueuesAll() {
    return (this._DATA.$queues || []).map((list) => list)
  }

  /**
   * @summary Retrieve a social network profile of this site.
   * @param   {string} name the name of the social network
   * @returns {?Object} an object representing the social network profile
   */
  getSocial(name) {
    return this.getSocialAll().find((url) => url.name===name) || null
  }
  /**
   * @summary Return all social network profiles of this site.
   * @todo TODO turn this into a getter
   * @returns {Array<!Object>} all this site’s social media networks
   */
  getSocialAll() {
    return (this._DATA.sameAs || []).map((url) => url)
  }


  /**
   * @summary Initialize this site: add the proper pages.
   * @description This method should only be called once; it resets pages every time called.
   * @returns {ConfSite} this site
   */
  init() {
    var self = this
    function pageTitle() { return this.name() + ' | ' + self.name() }
    return this
      .removeAll() //- NOTE IMPORTANT
      .add(new ConfPage('Home', 'index.html')
        .title(this.name())
        .description(this.slogan)
        .setIcon('home')
      )
      .add(new ConfPage('Registration', 'registration.html')
        .title(pageTitle)
        .description(`Register for ${this.name()} here.`)
        .setIcon('shopping_cart')
      )
      .add(new ConfPage('Program', 'program.html')
        .title(pageTitle)
        .description(`Program and agenda of ${this.name()}.`)
        .setIcon('event')
      )
      .add(new ConfPage('Location', 'location.html')
        .title(pageTitle)
        .description(`Location and where to stay for ${this.name()}.`)
        .setIcon('flight')
      )
      .add(new ConfPage('Speakers', 'speakers.html')
        .title(pageTitle)
        .description(`Current and prospective speakers at ${this.name()}.`)
        .setIcon('account_box')
      )
      .add(new ConfPage('Sponsor', 'sponsor.html')
        .title(pageTitle)
        .description(`Sponsors of ${this.name()}.`)
        .setIcon('people')
      )
      .add(new ConfPage('Exhibit', 'exhibit.html')
        .title(pageTitle)
        .description(`Exhibitors at ${this.name()}.`)
        .setIcon('work')
      )
      .add(new ConfPage('About', 'about.html')
        .title(pageTitle)
        .description(`About ${this.name()}.`)
        .setIcon('info_outline')
      )
      .add(new ConfPage('Contact', 'contact.html')
        .title(pageTitle)
        .description(`Contact us for questions and comments about ${this.name()}.`)
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
