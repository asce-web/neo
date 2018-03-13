const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const Util = require('./Util.class.js')


/**
 * An interval of dates in which registration prices are set.
 */
class RegistrationPeriod {
  /**
   * Construct a new RegistrationPeriod object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name of the registration period (e.g., 'Early Bird')
   * @param {string=} jsondata.availabilityStarts the date on which this registration period starts
   * @param {string=} jsondata.availabilityEnds the date on which this registration period ends
   * @param {string=} jsondata.$icon the icon keyword of this registration period
   */
  constructor(jsondata) {
    /**
     * All the data for this registration period.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }
}

module.exports = RegistrationPeriod
