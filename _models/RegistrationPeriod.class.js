var Util = require('./Util.class.js')

module.exports = class RegistrationPeriod {
  /**
   * REVIEW may not need this class
   * An interval of dates in which registration prices are set.
   * Assigned at the conference level.
   * Construct a RegistrationPeriod object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $periodinfo an object with the following immutable properties:
   * @param {string} $periodinfo.name the name of the registration period (e.g., 'Early Bird')
   * @param {Date} $periodinfo.start_date the date on which this registration period starts
   * @param {Date} $periodinfo.end_date the date on which this registration period ends
   */
  constructor($periodinfo = {}) {
    /** @private */ this._NAME  = $periodinfo.name
    /** @private */ this._START = $periodinfo.start_date
    /** @private */ this._END   = $periodinfo.end_date
    /** @private */ this._icon = null
  }

  /**
   * Get the name of this registration period.
   * @return {string} the name of this registration period
   */
  name() {
    return this._NAME
  }

  /**
   * Get the start date of this registration period.
   * @return {Date} the start date of this registration period
   */
  startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this registration period.
   * @return {Date} the end date of this registration period
   */
  endDate() {
    return this._END || new Date()
  }

  /**
   * Set the icon of this registration period.
   * REVIEW: if icons are the same suite-wide, this can be removed.
   * @param {string} key the keyword of the icon to set
   */
  setIcon(key) {
    this._icon = Util.ICON_DATA.find((item) => item.content===key)
    return this
  }
  /**
   * Get the icon of this registration period.
   * REVIEW: if icons are the same suite-wide, this can be removed.
   * @param  {boolean=} fallback if true, get the unicode code point
   * @return {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }
}
