module.exports = class Session {
  /**
   * A program event.
   * Construct a Session object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object=} $eventinfo an object with the following immutable properties:
   * @param {string} $eventinfo.name the name of the session
   * @param {Date} $eventinfo.start_date the start date of the session
   * @param {Date} $eventinfo.end_date the end date of the session
   */
  constructor($eventinfo = {}) {
    /** @private */ this._NAME  = $eventinfo.name
    /** @private */ this._START = $eventinfo.start_date
    /** @private */ this._END   = $eventinfo.end_date
    /** @private */ this._url = ''
    /** @private */ this._is_starred = false
  }

  /**
   * Get the name of this session.
   * @return {string} the name of this session
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the start date of this session.
   * @return {Date} the start date of this session
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this session.
   * @return {Date} the end date of this session
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * Set or get the url of this session.
   * @param  {string=} url the url of this session
   * @return {(Session|string)} this session || the url of this session
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this session as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Session} this session
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this session.
   * @return {boolean} whether this session is starred
   */
  isStarred() {
    return this._is_starred
  }
}
