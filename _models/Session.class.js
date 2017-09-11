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
   * Render this session in HTML.
   * Displays:
   * - `Session#view()`      - default display - a subcomponent of TimeBlock
   * - `Session#programHn()` - ProgramHn Component
   * @return {string} HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Throws error: must call an explicit display.
     * Call `Session#view()` to render this display.
     * @return {string} HTML output
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `Session#view[display]()`.')
      }).call(self)
    }
    /**
     * Return an <li.c-TimeBlock__Item> subcomponent containing a <dt>–<dd> pair,
     * marking up this session’s time and name.
     * Call `Session#view.timeBlock()` to render this display.
     * @param  {boolean} is_last `true` if this session is the last in its list
     * @return {string} HTML output
     */
    returned.timeBlock = function (is_last) {
      return (function () {
        return new Element('li').class('o-List__Item o-Flex c-TimeBlock__Item')
          .attr('data-instanceof','Session')
          .attr({
            itemprop: 'subEvent',
            itemscope: '',
            itemtype: 'http://schema.org/Event',
          })
          .addElements([
            new Element('dt').class('o-Flex__Item c-TimeBlock__Times')
              .addElements([
                new Element('time')
                  .attr({ datetime: this.startDate.toISOString(), itemprop: 'startDate' })
                  .addContent(Util.Date.format(this.startDate, 'g:ia'))
              ])
              .addContent(`\u2013`) // &ndash;
              .addElements([
                new Element('time')
                  .attr({ datetime: this.endDate.toISOString(), itemprop: 'endDate' })
                  .addContent(Util.Date.format(this.endDate, 'g:ia'))
              ]),
            new Element('dd').class('o-Flex__Item c-TimeBlock__Desc')
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
      }).call(self)
    }
    /**
     * Return an <time.c-ProgramHn> component marking up this session’s date.
     * Call `Session#view.programHn()` to render this display.
     * @return {string} HTML output
     */
    returned.programHn = function () {
      return (function () {
        return new Element('time').class('c-ProgramHn h-Block')
          .attr('data-instanceof','Session')
          .attr('datetime', Util.Date.format(this.startDate, 'Y-m-d'))
          .addContent(`${Util.Date.DAY_NAMES[this.startDate.getUTCDay()]},`)
          .addElements([new Element('br')])
          .addContent(Util.Date.format(this.startDate, 'M j'))
          .html()
      }).call(self)
    }
    return returned
  }
}
