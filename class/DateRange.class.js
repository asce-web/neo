const xjs     = require('extrajs')
const HTMLElement = require('extrajs-dom').HTMLElement
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
   * @param {string} jsondata.$start the start date/time of this date range, in ISO string format
   * @param {string=} jsondata.$end the end date/time of this date range, in ISO string format
   * @param {string=} jsondata.url the url of this date range
   * @param {boolean=} jsondata.$starred whether this date range is starred
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
    return new Date(this._DATA.$start || null)
  }

  /**
   * @summary The end date value of this date range.
   * @type {?Date}
   */
  get end() {
    return (this._DATA.$end) ? new Date(this._DATA.$end) : null
  }

  /**
   * @summary The url of this date range.
   * @type {string}
   */
  url(url) {
    return this._DATA.url
  }

  /**
   * @summary Whether this date range is starred.
   * @type {boolean}
   */
  isStarred() {
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
      /**
       * Return a `<tr.c-DateBlock__Item>` subcomponent containing a pair of `<td>`s,
       * marking up this date range as an important date with date and description.
       * @summary Call `DateRange#view.dateBlock()` to render this display.
       * @function DateRange.VIEW.dateBlock
       * @returns {string} HTML output
       */
      .addDisplay(function dateBlock() {
        return new HTMLElement('tr').class('c-DateBlock__Item')
          .attr('data-instanceof','DateRange')
          .attr({
            itemprop: 'potentialAction',
            itemscope: '',
            itemtype: 'http://schema.org/Action',
          })
          .addContent([
            new HTMLElement('td').class('c-DateBlock__Date').addContent([
              new HTMLElement('time')
                .attr({ datetime: this.start.toISOString(), itemprop: 'startTime' })
                .addContent(xjs.Date.format(this.start, 'M j, Y')),
              (this.end) ? `&ndash;` : '',
              (this.end) ? new HTMLElement('time')
                .attr({ datetime: this.end.toISOString(), itemprop: 'endTime' })
                .addContent(xjs.Date.format(this.end, 'M j, Y')) : null,
            ]),
            new HTMLElement('td').class('c-DateBlock__Desc')
              .attr('itemprop','name')
              .addContent((this.url()) ? new HTMLElement('a').class('c-DateBlock__Link')
                .attr({ href: this.url(), itemprop: 'url' })
                .addContent(this.name) : this.name
              ),
          ])
          .html()
      })
      /**
       * Return a `<tr.c-TimeBlock__Item>` subcomponent containing a pair of `<td>`s,
       * marking up this date range as a session with time and name.
       * @summary Call `DateRange#view.timeBlock()` to render this display.
       * @function DateRange.VIEW.timeBlock
       * @param  {boolean} is_last `true` if the TimeBlock__Item is the last in its list
       * @returns {string} HTML output
       */
      .addDisplay(function timeBlock(is_last) {
        return new HTMLElement('tr').class('c-TimeBlock__Item')
          .attr('data-instanceof','DateRange')
          .attr({
            itemprop: 'subEvent',
            itemscope: '',
            itemtype: 'http://schema.org/Event',
          })
          .addContent([
            new HTMLElement('td').class('c-TimeBlock__Times').addContent([
              new HTMLElement('time')
                .attr({ datetime: this.start.toISOString(), itemprop: 'startDate' })
                .addContent(xjs.Date.format(this.start, 'g:ia')),
              (this.end) ? `&ndash;` : '',
              (this.end) ? new HTMLElement('time')
                .attr({ datetime: this.end.toISOString(), itemprop: 'endDate' })
                .addContent(xjs.Date.format(this.end, 'g:ia')) : null,
            ]),
            new HTMLElement('td').class('c-TimeBlock__Desc').addClass((is_last) ? 'c-TimeBlock__Desc--last' : '')
              .attr('itemprop','name')
              .addContent((this.url()) ? new HTMLElement('a').class('c-TimeBlock__Link')
                .attr({ href: this.url(), itemprop: 'url' })
                .addContent(this.name) : this.name
              ),
          ])
          .html()
      })
  }
}

module.exports = DateRange
