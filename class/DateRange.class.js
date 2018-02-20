const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View    = require('extrajs-view')


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

  /**
   * @summary The name of this date range.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The start date value of this date range.
   * @type {Date}
   */
  get start() {
    return new Date(this._DATA.startDate || this._DATA.startTime || null)
  }

  /**
   * @summary The end date value of this date range.
   * @type {?Date}
   */
  get end() {
    return (this._DATA.endDate || this._DATA.endTime) ? new Date(this._DATA.endDate || this._DATA.endTime) : null
  }

  /**
   * @summary The url of this date range.
   * @type {string}
   */
  get url() {
    return this._DATA.url
  }

  /**
   * @summary Whether this date range is starred.
   * @type {boolean}
   */
  get isStarred() {
    return this._DATA.$starred || false
  }


  /**
   * @summary Render this date range in HTML.
   * @see DateRange.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `DateRange#view.dateBlock()` - DateBlock Component, as an important date
     * - `DateRange#view.timeBlock()` - TimeBlock Component, as a session
     * @namespace DateRange.VIEW
     * @type {View}
     */
    return new View(null, this)
  }
}

module.exports = DateRange
