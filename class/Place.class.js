const Element = require('extrajs-dom').Element
const View    = require('extrajs-view')

/**
 * A place.
 * Mostly used for hotel & venue locations.
 */
class Place {
  /**
   * Construct a new Place object.
   * NOTE: zip, state, and country codes should match the {@link https://en.wikipedia.org/wiki/ISO_3166|ISO-3166 standard format}.
   * @param {string} name the name of the place
   * @param {Object=} $placeinfo an object containing the following:
   * @param {string} $placeinfo.street_address the street and number, eg: '1801 Alexander Bell Drive'
   * @param {string} $placeinfo.address_locality the city name, eg: 'Reston'
   * @param {string} $placeinfo.address_region   the state code*, eg: 'VA'
   * @param {string} $placeinfo.postal_code      the zip code*, eg: '22901-4382'
   * @param {string} $placeinfo.country          the country code*, eg: 'US'
   * @param {string} $placeinfo.telephone        the telephone number (no spaces), eg: '+1-800-548-2723'
   * @param {string} $placeinfo.url              the URL of homepage, eg: 'http://www.asce.org/'
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
   * @summary Get the name of this place.
   * @type {string}
   */
  get name() {
    return this._NAME
  }
  /**
   * @summary Get the street address of this place.
   * @type {string}
   */
  get streetAddress() {
    return this._STREET_ADDRESS
  }
  /**
   * @summary Get the address locality (city/town) of this place.
   * @type {string}
   */
  get addressLocality() {
    return this._ADDRESS_LOCALITY
  }
  /**
   * @summary Get the address region (state/province) of this place.
   * @type {string}
   */
  get addressRegion() {
    return this._ADDRESS_REGION
  }
  /**
   * @summary Get the postal (zip) code of this place.
   * @type {string}
   */
  get postalCode() {
    return this._POSTAL_CODE
  }
  /**
   * @summary Get the country of this place.
   * @type {string}
   */
  get addressCountry() {
    return this._ADDRESS_COUNTRY
  }
  /**
   * @summary Get the telephone number for this place.
   * @type {string}
   */
  get telephone() {
    return this._TELEPHONE
  }
  /**
   * @summary Get the URL for the homepage of this place.
   * @type {string}
   */
  get url() {
    return this._URL
  }


  /**
   * @summary Render this place in HTML.
   * @see Place.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Place#view.venue()` - a venue address
     * @namespace Place.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a DOM snippet marking up this place’s address.
       * @summary Call `Place#view.venue()` to render this display.
       * @function Place.VIEW.venue
       * @returns {string} HTML output
       */
      .addDisplay(function venue() {
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
          (this.telephone) ? new Element('a').attr('href',`tel:${this.telephone}`).attr('itemprop','telephone').addContent(this.telephone) : null
        )
      })
  }
}

module.exports = Place
