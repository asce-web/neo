var Page = require('sitepage').Page
var Color = require('csscolor').Color
var Element = require('helpers-js').Element
var ConfPage = require('./ConfPage.class.js')

module.exports = class ConfSite extends Page {
  /**
   * A conference site.
   * A site hosting a series of conferences,
   * with a name, url, slogan, logo, and color scheme.
   * Construct a ConfSite object, given a name and url.
   * @constructor
   * @extends Page
   * @param {string} name name of this site
   * @param {string} url url of the landing page for this site
   * @param {string} slogan the tagline, or slogan, of this site
   */
  constructor(name, url, slogan) {
    super({ name: name, url: url })
    super.description(slogan)
    /** @private */ this._logo             = ''
    /** @private */ this._colors           = {}
    /** @private */ this._images           = {}
    /** @private */ this._conferences      = {}
    /** @private */ this._conf_curr_key   = null
    /** @private */ this._conf_prev_key   = null
    /** @private */ this._conf_next_key   = null
  }

  /**
   * Overwrite superclass description() method.
   * This method only gets the description, it does not set it.
   * TODO: update this to an ES6 getter once {@link Page#description()} is updated.
   * @override
   * @param  {*} arg any argument
   * @return {string} the description of this site
   */
  description(arg) {
    return super.description()
  }
  /**
   * Get the slogan of this site.
   * The slogan is very brief, and is fixed for the entire series of conferences.
   * @return {string} the slogan of this site
   */
  get slogan() {
    return this.description() || ''
  }

  /**
   * Set or get the logo of this site.
   * @param  {string=} logo url of the logo file
   * @return {(ConfSite|string)} this site || url of the logo
   */
  logo(logo) {
    if (arguments.length) {
      this._logo = logo
      return this
    } else return this._logo
  }

  /**
   * Set or get the colors for this site.
   * @param {Color=} $primary   a Color object for the primary color
   * @param {Color=} $secondary a Color object for the secondary color
   * @return {(ConfSite|Object<string>)} this || a CSS object containg custom properties with color string values
   */
  colors($primary, $secondary) {
    if (arguments.length) {
      this._colors = ConfSite.colorStyles($primary, $secondary)
      return this
    } else return this._colors
  }

  /**
   * Set or get the images of this site.
   * @param  {Object<string>} $imgs a dictionary of image urls
   * @return {(ConfSite|Object<string>)} this || an object containing image urls
   */
  images($imgs) {
    if (arguments.length) {
      ['hero', 'city', 'prev', 'next'].forEach(function (key) {
        this._images[key] = $imgs[key] || ''
      }, this)
      return this
    } else return this._images
  }

  /**
   * Add a conference to this site.
   * @param {string} conf_label key for accessing the conference, usually a year
   * @param {Conference} $conference the conference to add
   * @return {ConfSite} this site
   */
  addConference(conf_label, $conference) {
    this._conferences[conf_label] = $conference
    return this
  }
  /**
   * Retrieve a conference of this site.
   * @param  {string} conf_label key for accessing the conference, usually a year
   * @return {Conference} the specified conference
   */
  getConference(conf_label) {
    return this._conferences[conf_label]
  }
  /**
   * Return an object representing all conferences of this site.
   * FIXME this should return a deep clone, not a shallow clone
   * @return {Object} shallow clone of this site’s conferences object
   */
  getConferencesAll() {
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
  currentConference(conf_label) {
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
  prevConference(conf_label) {
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
  nextConference(conf_label) {
    if (arguments.length) {
      this._conf_next_key = conf_label
      return this
    } else return this.getConference(this._conf_next_key)
  }

  /**
   * Initialize this site: add the proper pages.
   * This method should only be called once; it resets pages every time called.
   * @return {ConfSite} this site
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
   * Markup this conference site in HTML.
   * @param  {ConfSite.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = ConfSite.Display.SITE_TITLE, ...args) {
    let returned = {
      /**
       * Return a SiteTitle component.
       * @return {string} site title link in header
       */
      [ConfSite.Display.SITE_TITLE]: function () {
        return new Element('a').class('c-SiteTitle c-LinkCamo h-Block')
          .attr('data-instanceof','ConfSite')
          .attr('href',this.url())
          .addElements([
            new Element('img').class('c-SiteTitle__Logo').attr('src',this.logo()).attr('alt','Home'),
            new Element('h1').class('c-SiteTitle__Name').addContent(this.name()),
            new Element('p').class('c-SiteTitle__Slogan').addContent(this.slogan),
          ])
          .html()
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }

  /**
   * Generate a color palette and return a style object with custom properties.
   * @param  {Color} $primary   the primary color for the site
   * @param  {Color} $secondary the secondary color for the site
   * @return {Object<string>} a CSS object containg custom properties with color string values
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

    let gray_dk_s2 = _g1.lighten( 1/12 - _g1.hslLum(), false)
    let gray_dk_s1 = _g1.lighten( 2/12 - _g1.hslLum(), false)
    let gray_dk    = _g1.lighten( 3/12 - _g1.hslLum(), false)
    let gray_dk_t1 = _g1.lighten( 4/12 - _g1.hslLum(), false)
    let gray_dk_t2 = _g1.lighten( 5/12 - _g1.hslLum(), false)
    let gray_lt_s2 = _g2.lighten( 7/12 - _g2.hslLum(), false)
    let gray_lt_s1 = _g2.lighten( 8/12 - _g2.hslLum(), false)
    let gray_lt    = _g2.lighten( 9/12 - _g2.hslLum(), false)
    let gray_lt_t1 = _g2.lighten(10/12 - _g2.hslLum(), false)
    let gray_lt_t2 = _g2.lighten(11/12 - _g2.hslLum(), false)

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

  /**
   * Enum for conference site formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** SiteTitle component. */ SITE_TITLE: 'siteTitle',
    }
  }
}
