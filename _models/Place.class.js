var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A place.
   * Mostly used for hotel & venue locations.
   * Constructs a Place object.
   * @constructor
   * @param {string} name the name of the place
   * @param {Object} $placeinfo an object containing the following:
   * @param {string} $placeinfo.street_address the street and number, eg: '1801 Alexander Bell Drive'
   * @param {string} $placeinfo.address_locality the city name, eg: 'Reston'
   * @param {string} $placeinfo.address_region   the state code *[1], eg: 'VA'
   * @param {string} $placeinfo.postal_code      the zip code, eg: '22901-4382'
   * @param {string} $placeinfo.country          the country code *[1], eg: 'US'
   * @param {string} $placeinfo.telephone        the telephone number (no spaces), eg: '+1-800-548-2723'
   * @param {string} $placeinfo.url              the URL of homepage, eg: 'http://www.asce.org/'
   * *[1] zip, state, and country codes should match the ISO-3166 standard format. see https://en.wikipedia.org/wiki/ISO_3166
   */
  function Place(name, $placeinfo) {
    var self = this
    $placeinfo = $placeinfo || {} // NOTE constructor overloading
    self._NAME = name
    self._STREET_ADDRESS   = $placeinfo.street_address
    self._ADDRESS_LOCALITY = $placeinfo.address_locality
    self._ADDRESS_REGION   = $placeinfo.address_region
    self._POSTAL_CODE      = $placeinfo.postal_code
    self._ADDRESS_COUNTRY  = $placeinfo.address_country
    self._TELEPHONE        = $placeinfo.telephone
    self._URL              = $placeinfo.url
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this place.
   * @return {string} the name of this place
   */
  Place.prototype.name = function name() {
    return this._NAME
  }
  /**
   * Get the street address of this place.
   * @return {string} the street address of this place
   */
  Place.prototype.streetAddress = function streetAddress() {
    return this._STREET_ADDRESS
  }
  /**
   * Get the address locality (city/town) of this place.
   * @return {string} the address locality (city/town) of this place
   */
  Place.prototype.addressLocality = function addressLocality() {
    return this._ADDRESS_LOCALITY
  }
  /**
   * Get the address region (state/province) of this place.
   * @return {string} the address region (state/province) of this place
   */
  Place.prototype.addressRegion = function addressRegion() {
    return this._ADDRESS_REGION
  }
  /**
   * Get the postal (zip) code of this place.
   * @return {string} the postal (zip) code of this place
   */
  Place.prototype.postalCode = function postalCode() {
    return this._POSTAL_CODE
  }
  /**
   * Get the country of this place.
   * @return {string} the country of this place
   */
  Place.prototype.addressCountry = function addressCountry() {
    return this._ADDRESS_COUNTRY
  }
  /**
   * Get the telephone number for this place.
   * @return {string} the telephone number for this place
   */
  Place.prototype.telephone = function telephone() {
    return this._TELEPHONE
  }
  /**
   * Get the URL for the homepage of this place.
   * @return {string} the URL for the homepage of this place
   */
  Place.prototype.url = function url() {
    return this._URL
  }

  return Place
})()
