/**
 * Entities that have a somewhat fixed, physical extension.
 * @todo TODO move this class to `require('extrajs-geo')`
 * @see https://schema.org/Place
 */
class Place {
  /**
   * Construct a new Place object.
   * @param {!Object} jsondata a JSON object
   * @param {string} jsondata.name the name of this place
   * @param {string=} jsondata.description the description of this place
   * @param {string=} jsondata.url the url of this place
   * @param {string=} jsondata.image the image url for this place
   * @param {string=} jsondata.telephone the telephone number of this place
   * @param {!Object=} jsondata.address an object of type {@link http://schema.org/PostalAddress}
   * @param {string=} jsondata.address.streetAddress
   * @param {string=} jsondata.address.addressLocality
   * @param {string=} jsondata.address.addressRegion
   * @param {string=} jsondata.address.postalCode
   * @param {string=} jsondata.address.addressCountry
   * @param {string=} jsondata.address.addressCountry
   */
  constructor(jsondata) {
    /**
     * All the data for this place.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary The name of this place.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }
  /**
   * @summary The description of this place.
   * @type {string}
   */
  get description() {
    return this._DATA.description || ''
  }
  /**
   * @summary The url of this venue.
   * @type {string}
   */
  get url() {
    return this._DATA.url || ''
  }
  /**
   * @summary The image url of this venue.
   * @type {string}
   */
  get image() {
    return this._DATA.image || ''
  }
  /**
   * @summary The telephone number of this place.
   * @type {string}
   */
  get telephone() {
    return this._DATA.telephone || ''
  }

  /**
   * @summary The street address of this place.
   * @type {string}
   */
  get streetAddress() {
    return this._DATA.address.streetAddress || ''
  }
  /**
   * @summary The address locality (city/town) of this place.
   * @type {string}
   */
  get addressLocality() {
    return this._DATA.address.addressLocality || ''
  }
  /**
   * @summary The address region (state/province) of this place.
   * @type {string}
   */
  get addressRegion() {
    return this._DATA.address.addressRegion || ''
  }
  /**
   * @summary The postal (zip) code of this place.
   * @type {string}
   */
  get postalCode() {
    return this._DATA.address.postalCode || ''
  }
  /**
   * @summary The country of this place.
   * @type {string}
   */
  get addressCountry() {
    return this._DATA.address.addressCountry || ''
  }
}

module.exports = Place
