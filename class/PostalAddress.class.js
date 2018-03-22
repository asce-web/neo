/**
 * The mailing address.
 * @see https://schema.org/PostalAddress
 */
class PostalAddress {
  /**
   * Construct a new PostalAddress object.
   * @param {!Object} jsondata a JSON object
   * @param {string=} jsondata.streetAddress the street address
   * @param {string=} jsondata.addressLocality the locality
   * @param {string=} jsondata.addressRegion the region
   * @param {string=} jsondata.postalCode the postal code
   * @param {string=} jsondata.addressCountry the country
   */
  constructor(jsondata) {
    /**
     * All the data for this postal address.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary The street address of this address.
   * @type {string}
   */
  get streetAddress() {
    return this._DATA.streetAddress || ''
  }

  /**
   * @summary The address locality (city/town) of this address.
   * @type {string}
   */
  get addressLocality() {
    return this._DATA.addressLocality || ''
  }

  /**
   * @summary The address region (state/province) of this address.
   * @type {string}
   */
  get addressRegion() {
    return this._DATA.addressRegion || ''
  }

  /**
   * @summary The postal (zip) code of this address.
   * @type {string}
   */
  get postalCode() {
    return this._DATA.postalCode || ''
  }

  /**
   * @summary The country of this address.
   * @type {string}
   */
  get addressCountry() {
    return this._DATA.addressCountry || ''
  }
}

module.exports = PostalAddress
