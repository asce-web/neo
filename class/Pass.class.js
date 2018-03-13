const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const Util = require('./Util.class.js')


/**
 * A set of prices for registration.
 */
class Pass {
  /**
   * Construct a new Pass object.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name or type of the pass
   * @param {string=} jsondata.description a short description of this pass
   * @param {string=} jsondata.$fineprint further details of this pass
   * @param {Array<string>=} jsondata.$attendeeTypes types of attendees that can purchase this pass
   *                                                 (usually based on membership)
   */
  constructor(jsondata) {
    /**
     * All the data for this pass.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary Get the name of this pass.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The description of this pass.
   * @type {string}
   */
  get description() {
    return this._DATA.description || ''
  }

  /**
   * @summary The fine print of this pass.
   * @type {string}
   */
  get fineprint() {
    return xjs.String.stringify(this._DATA.$fineprint)
  }

  /**
   * @summary Retrieve an attendee type of this pass.
   * @param   {string} name the name of the attendee type to get
   * @returns {?Pass.AtendeeType} the specified attendee type
   */
  getAttendeeType(name) {
    return (this._DATA.$attendeeTypes.includes(name)) ? new Pass.AttendeeType(name) : null
  }
  /**
   * @summary Retreive all attendee types of this pass.
   * @returns {Array<Pass.AttendeeType>} a shallow array of all attendee types of this pass
   */
  getAttendeeTypesAll() {
    return this._DATA.$attendeeTypes.map((name) => new Pass.AttendeeType(name))
  }


  /**
   * @summary Options for formatting pass prices.
   * @type {Intl.NumberFormat}
   */
  static get PRICE_OPTIONS() {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
      maximumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
    })
  }
}



/**
 * An Attendee Type ("Member", "Non-Member", etc) of a pass.
 */
Pass.AttendeeType = class AttendeeType {
  /**
   * Construct a new AttendeeType object.
   * @param {string} name the name of the attendee type
   */
  constructor(name) {
    /**
     * All the data for this attendee type.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = { name: name }
  }
  /**
   * @summary The name of this attendee type.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }
}

module.exports = Pass
