const xjs     = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const Util    = require('./Util.class.js')

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

  /**
   * @summary The name of this registration period.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The start date of this registration period.
   * @type {Date}
   */
  get startDate() {
    return new Date(this._DATA.availabilityStarts || null)
  }

  /**
   * @summary The end date of this registration period.
   * @type {Date}
   */
  get endDate() {
    return new Date(this._DATA.availabilityEnds || null)
  }

  /**
   * @summary Get the icon of this registration period.
   * @param   {boolean=} fallback if true, get the unicode code point
   * @returns {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    // REVIEW: if icons are the same suite-wide, this can be removed.
    let icon = Util.ICON_DATA.find((item) => item.content===this._DATA.$icon)
    return (icon) ? Util.iconToString(icon, fallback) : ''
  }
}

module.exports = RegistrationPeriod
