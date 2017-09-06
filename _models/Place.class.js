var Element = require('helpers-js').Element
var Util = require('./Util.class.js')

module.exports = class Place {
  /**
   * A place.
   * Mostly used for hotel & venue locations.
   * Constructs a Place object.
   * @constructor
   * @param {string} name the name of the place
   * @param {Object=} $placeinfo an object containing the following:
   * @param {string} $placeinfo.street_address the street and number, eg: '1801 Alexander Bell Drive'
   * @param {string} $placeinfo.address_locality the city name, eg: 'Reston'
   * @param {string} $placeinfo.address_region   the state code *[1], eg: 'VA'
   * @param {string} $placeinfo.postal_code      the zip code, eg: '22901-4382'
   * @param {string} $placeinfo.country          the country code *[1], eg: 'US'
   * @param {string} $placeinfo.telephone        the telephone number (no spaces), eg: '+1-800-548-2723'
   * @param {string} $placeinfo.url              the URL of homepage, eg: 'http://www.asce.org/'
   * *[1] zip, state, and country codes should match the ISO-3166 standard format. see https://en.wikipedia.org/wiki/ISO_3166
   */
  constructor(name, $placeinfo = {}) {
    /** @private @final */ this._NAME = name
    /** @private @final */ this._STREET_ADDRESS   = $placeinfo.street_address
    /** @private @final */ this._ADDRESS_LOCALITY = $placeinfo.address_locality
    /** @private @final */ this._ADDRESS_REGION   = $placeinfo.address_region
    /** @private @final */ this._POSTAL_CODE      = $placeinfo.postal_code
    /** @private @final */ this._ADDRESS_COUNTRY  = $placeinfo.address_country
    /** @private @final */ this._TELEPHONE        = $placeinfo.telephone
    /** @private @final */ this._URL              = $placeinfo.url
  }

  /**
   * Get the name of this place.
   * @return {string} the name of this place
   */
  get name() {
    return this._NAME
  }
  /**
   * Get the street address of this place.
   * @return {string} the street address of this place
   */
  get streetAddress() {
    return this._STREET_ADDRESS
  }
  /**
   * Get the address locality (city/town) of this place.
   * @return {string} the address locality (city/town) of this place
   */
  get addressLocality() {
    return this._ADDRESS_LOCALITY
  }
  /**
   * Get the address region (state/province) of this place.
   * @return {string} the address region (state/province) of this place
   */
  get addressRegion() {
    return this._ADDRESS_REGION
  }
  /**
   * Get the postal (zip) code of this place.
   * @return {string} the postal (zip) code of this place
   */
  get postalCode() {
    return this._POSTAL_CODE
  }
  /**
   * Get the country of this place.
   * @return {string} the country of this place
   */
  get addressCountry() {
    return this._ADDRESS_COUNTRY
  }
  /**
   * Get the telephone number for this place.
   * @return {string} the telephone number for this place
   */
  get telephone() {
    return this._TELEPHONE
  }
  /**
   * Get the URL for the homepage of this place.
   * @return {string} the URL for the homepage of this place
   */
  get url() {
    return this._URL
  }


  /**
   * Markup this place in HTML.
   * @param  {Place.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = Place.Display.VENUE, ...args) {
    let returned = {
      /**
       * Return a view for a venue.
       * @return {string} single DOM snippet representing this place
       */
      [Place.Display.VENUE]: function () {
        let name = new Element('b').class('h-Clearfix').attr('itemprop','name').addContent(this.name)
        if (this.url) {
          name = new Element('a').attr({
            href: this.url,
            itemprop: 'url',
          }).addElements([name])
        }
        return Element.concat(
          name,
          new Element('span')
            .attr({
              itemprop : 'address',
              itemscope: '',
              itemtype : 'https://schema.org/PostalAddress',
            })
            .addElements([
              new Element('span').class('h-Clearfix').attrStr('itemprop="streetAddress"').addContent(this.streetAddress),
              new Element('span').attrStr('itemprop="addressLocality"').addContent(this.addressLocality),
            ])
            .addContent(`, `)
            .addElements([
              new Element('span').attrStr('itemprop="addressRegion"').addContent(this.addressRegion),
            ])
            .addContent(` `)
            .addElements([
              new Element('span').class('h-Clearfix').attrStr('itemprop="postalCode"').addContent(this.postalCode),
              (this.addressCountry) ? new Element('span').class('h-Clearfix').attrStr('itemprop="addressCountry"').addContent(this.addressCountry) : null,
            ]),
          (this.telephone) ? new Element('a').attr('href',`tel:${this.telephone}`).attr('itemprop','telephone').addContent(this.telephone) : new Element('span') // TODO make null on helpers-js@0.4.1
        )
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }



  /**
   * Enum for session displays.
   * @enum {string}
   */
  static get Display() {
    return {
      /** A venue. */ VENUE: 'venue',
    }
  }
}
