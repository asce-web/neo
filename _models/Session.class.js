var Element = require('helpers-js').Element
var Util = require('./Util.class.js')

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


  /**
   * Markup this session in HTML.
   * @param  {Session.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = Session.Display.TIME_BLOCK, ...args) {
    let returned = {
      /**
       * Return a part of a Time Block component.
       * @return {string} single DOM snippet representing this session
       */
      [Session.Display.TIME_BLOCK]: function () {
        throw new Error('feature not yet supported')
      },
      /**
       * Return a ProgramHn component.
       * @return {string} <time> element marking up this session’s start date
       */
      [Session.Display.PROGRAM_HN]: function () {
        return new Element('time').class('c-ProgramHn h-Block')
          .attr('data-instanceof','Session')
          .attr('datetime', Util.Date.format(this.startDate, 'Y-m-d'))
          .addContent(`${Util.Date.DAY_NAMES[this.startDate.getUTCDay()]},`)
          .addElements([new Element('br')])
          .addContent(Util.Date.format(this.startDate, 'M j'))
          .html()
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }



  /**
   * Enum for session displays.
   * @enum {string}
   */
  static get Display() {
    return {
      /** TimeBlock component. */ TIME_BLOCK: 'timeBlock',
      /** ProgramHn component. */ PROGRAM_HN: 'programHn',
    }
  }
}
