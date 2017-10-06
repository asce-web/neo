const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const View    = require('extrajs-view')

/**
 * A range of dates.
 * Has start and end dates, name, and optional url.
 * @module
 */
module.exports = class DateRange {
  /**
   * Construct a new DateRange object.
   * @param {Object=} $actioninfo an object with the following immutable properties:
   * @param {string} $actioninfo.name the name of the important date
   * @param {Date} $actioninfo.start_time the start time of the important date
   * @param {Date=} $actioninfo.end_time the start end of the important date
   */
  constructor(name, start, end) {
    /** @private @final */ this._NAME  = name
    /** @private @final */ this._START = start
    /** @private @final */ this._END   = end
    /** @private */        this._url          = ''
    /** @private */        this._is_starred   = false
  }

  /**
   * Get the name of this date range.
   * @return {string} the name of this date range
   */
  get name() {
    return this._NAME
  }

  /**
   * Return the start date value of this date range.
   * @return {Date} the start date of this date range
   */
  get start() {
    return this._START
  }

  /**
   * Return the end date value of this date range.
   * @return {?Date} the end date of this date range
   */
  get end() {
    return this._END || null
  }

  /**
   * Set or get the url of this date range.
   * @param  {string=} url the url of this date range
   * @return {(DateRange|string)} this date range || the url of this date range
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this date range as starred.
   * @param  {boolean=} bool if `true`, mark as starred
   * @return {DateRange} this date range
   */
  star(bool = true) {
    this._is_starred = bool
    return this
  }
  /**
   * Get the starred status of this date range.
   * @return {boolean} whether this date range is starred
   */
  isStarred() {
    return this._is_starred
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
     * - `DateRange#view.programHn()` - ProgramHn Component (heading for a c-TimeBlock)
     * @namespace DateRange.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return an <li.c-DateBlock__Item> subcomponent containing a <dt>–<dd> pair,
       * marking up this date range as an important date with date and description.
       * @summary Call `DateRange#view.dateBlock()` to render this display.
       * @function DateRange.VIEW.dateBlock
       * @returns {string} HTML output
       */
      .addDisplay(function dateBlock() {
        return new Element('tr').class('c-DateBlock__Item')
          .attr('data-instanceof','DateRange')
          .attr({
            itemprop: 'potentialAction',
            itemscope: '',
            itemtype: 'http://schema.org/Action',
          })
          .addElements([
            new Element('td').class('c-DateBlock__Date')
              .addElements([
                new Element('time')
                  .attr({ datetime: this.start.toISOString(), itemprop: 'startTime' })
                  .addContent(xjs.Date.format(this.start, 'M j, Y'))
              ])
              .addContent((this.end) ? `&ndash;` : '')
              .addElements([
                (this.end) ? new Element('time')
                  .attr({ datetime: this.end.toISOString(), itemprop: 'endTime' })
                  .addContent(xjs.Date.format(this.end, 'M j, Y')) : null
              ]),
            new Element('td').class('c-DateBlock__Desc')
              .attr('itemprop','name')
              .addContent((this.url()) ?
                new Element('a').class('c-DateBlock__Link')
                  .attr({ href: this.url(), itemprop: 'url' })
                  .addContent(this.name)
                  .html()
                : this.name
              ),
          ])
          .html()
      })
      /**
       * Return an <li.c-TimeBlock__Item> subcomponent containing a <dt>–<dd> pair,
       * marking up this date range as a session with time and name.
       * @summary Call `DateRange#view.timeBlock()` to render this display.
       * @function DateRange.VIEW.timeBlock
       * @param  {boolean} is_last `true` if the session is the last in its list
       * @returns {string} HTML output
       */
      .addDisplay(function timeBlock(is_last) {
        return new Element('tr').class('c-TimeBlock__Item')
          .attr('data-instanceof','DateRange')
          .attr({
            itemprop: 'subEvent',
            itemscope: '',
            itemtype: 'http://schema.org/Event',
          })
          .addElements([
            new Element('td').class('c-TimeBlock__Times')
              .addElements([
                new Element('time')
                  .attr({ datetime: this.start.toISOString(), itemprop: 'startDate' })
                  .addContent(xjs.Date.format(this.start, 'g:ia'))
              ])
              .addContent((this.end) ? `&ndash;` : '')
              .addElements([
                (this.end) ? new Element('time')
                  .attr({ datetime: this.end.toISOString(), itemprop: 'endDate' })
                  .addContent(xjs.Date.format(this.end, 'g:ia')) : null
              ]),
            new Element('td').class('c-TimeBlock__Desc')
              .addClass((is_last) ? 'c-TimeBlock__Desc--last' : '')
              .attr('itemprop','name')
              .addContent((this.url()) ?
                new Element('a').class('c-TimeBlock__Link')
                  .attr({ href: this.url(), itemprop: 'url' })
                  .addContent(this.name)
                  .html()
                : this.name
              ),
          ])
          .html()
      })
      /**
       * Return an <time.c-ProgramHn> component marking up this date range’s start date.
       * @summary Call `DateRange#view.programHn()` to render this display.
       * @function DateRange.VIEW.programHn
       * @returns {string} HTML output
       */
      .addDisplay(function programHn() {
        return new Element('time').class('c-ProgramHn h-Block')
          .attr('data-instanceof','DateRange')
          .attr('datetime',this.start.toISOString())
          .addContent(`${xjs.Date.DAY_NAMES[this.start.getUTCDay()]},`)
          .addElements([new Element('br')])
          .addContent(xjs.Date.format(this.start, 'M j'))
          .html()
      })
  }
}
