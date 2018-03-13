const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}


/**
 * A range of dates.
 * Has start and end dates, name, and optional url.
 * Can be used for sessions, important dates, etc.
 */
class DateRange {
  /**
   * Construct a new DateRange object.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name of this date range
   * @param {string=} jsondata.startDate if this date range is an Event  type, the start date, in ISO string format
   * @param {string=} jsondata.endDate   if this date range is an Event  type, the end   date, in ISO string format
   * @param {string=} jsondata.startTime if this date range is an Action type, the start time, in ISO string format
   * @param {string=} jsondata.endTime   if this date range is an Action type, the end   time, in ISO string format
   * @param {string=} jsondata.url the url of this date range
   * @param {boolean=} jsondata.$starred whether this date range is starred
   */
  constructor(jsondata) {
    /**
     * All the data for this date range.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }
}

module.exports = DateRange
