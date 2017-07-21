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
   * Output this person’s name and other information as HTML.
   * NOTE: remember to wrap this output with an `[itemscope=""][itemtype="https://schema.org/Place"]`.
   * Also remember to unescape this code, or else you will get `&lt;`s and `&gt;`s.
   * @return {string} a string representing an HTML DOM snippet
   */
  html() {
    let $name = `<b class="h-Clearfix" itemprop="name">${this.name}</b>`
    if (this.url) $name = `<a href="${this.url}" itemprop="url">${$name}</a>`
    return `
      ${$name}
      <span itemprop="address" itemscope="" itemtype="https://schema.org/PostalAddress">
        <span class="h-Clearfix" itemprop="streetAddress">${this.streetAddress}</span>
        <span itemprop="addressLocality">${this.addressLocality}</span>,
        <span itemprop="addressRegion">${this.addressRegion}</span>
        <span class="h-Clearfix" itemprop="postalCode">${this.postalCode}</span>
        ${(this.addressCountry) ? `<span class="h-Clearfix" itemprop="addressCountry">${this.addressCountry}</span>` : ''}
      </span>
      ${(this.telephone) ? `<a href="tel:${this.telephone}" itemprop="telephone">${this.telephone}</a>` : ''}
    `
  }
}
