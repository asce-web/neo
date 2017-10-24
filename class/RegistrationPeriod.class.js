const xjs     = require('extrajs')
const Element = require('extrajs-dom').Element
const View    = require('extrajs-view')
const Util    = require('./Util.class.js')

/**
 * An interval of dates in which registration prices are set.
 */
class RegistrationPeriod {
  /**
   * Construct a new RegistrationPeriod object.
   * The name, start date, and end date
   * are immutable and must be provided during construction.
   * @param {Object} $periodinfo an object with the following immutable properties:
   * @param {string} $periodinfo.name the name of the registration period (e.g., 'Early Bird')
   * @param {Date=} $periodinfo.start_date the date on which this registration period starts
   * @param {Date=} $periodinfo.end_date the date on which this registration period ends
   */
  constructor($periodinfo) {
    /** @private @final */ this._NAME  = $periodinfo.name
    /** @private @final */ this._START = $periodinfo.start_date
    /** @private @final */ this._END   = $periodinfo.end_date
    /** @private */ this._icon = null
  }

  /**
   * @summary Get the name of this registration period.
   * @type {string}
   */
  get name() {
    return this._NAME
  }

  /**
   * @summary Get the start date of this registration period.
   * @type {Date}
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * @summary Get the end date of this registration period.
   * @type {Date}
   */
  get endDate() {
    return this._END || new Date()
  }

  /**
   * @summary Set the icon of this registration period.
   * @param {string} key the keyword of the icon to set
   */
  setIcon(key) {
    // REVIEW: if icons are the same suite-wide, this can be removed.
    this._icon = Util.ICON_DATA.find((item) => item.content===key)
    return this
  }
  /**
   * @summary Get the icon of this registration period.
   * @param   {boolean=} fallback if true, get the unicode code point
   * @returns {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    // REVIEW: if icons are the same suite-wide, this can be removed.
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }


  /**
   * @summary Render this registration period in HTML.
   * @see RegistrationPeriod.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `RegistrationPeriod#view.pass()` - Pass component - Pass__Period subcomponent
     * @namespace RegistrationPeriod.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a `<section.c-Pass__Period>` subcomponent marking up this period’s info.
       * @summary Call `RegistrationPeriod#view.pass()` to render this display.
       * @function RegistrationPeriod.VIEW.pass
       * @param  {Pass} $pass the Pass component in which this registration period is rendered
       * @param  {boolean} is_body `true` if this period belongs in the pass body (if it’s current)
       * @returns {string} HTML output
       */
      .addDisplay(function pass($pass, is_body) {
        return new Element('section').class('c-Pass__Period')
          .addClass((!is_body) ? 'o-Flex__Item' : '')
          .attr({
            'data-instanceof': 'RegistrationPeriod',
            itemprop : 'offers',
            itemscope: '',
            itemtype : 'https://schema.org/AggregateOffer',
          })
          .addContent([
            new Element('h1').class('c-Pass__Period__Hn').attr('itemprop','name').addContent([
              new Element('span').class('-d-n').addContent(`${$pass.name}: `), // NOTE: `.-d-n` hides from AT but reveals to Microdata
              this.name
            ]),
            new Element('meta').attr({ content:$pass.getAttendeeTypesAll().length, itemprop:'offerCount' }),
            (this.startDate.toISOString() !== new Date().toISOString()) ? new Element('meta').attr({ content:this.startDate.toISOString(), itemprop:'availabilityStarts' }) : null,
            (this.  endDate.toISOString() !== new Date().toISOString()) ? new Element('meta').attr({ content:this.  endDate.toISOString(), itemprop:'availabilityEnds'   }) : null,
            new Element('dl').addContent($pass.getAttendeeTypesAll().map((att_type) =>
              att_type.view.pass(42.87, is_body) // TODO price is 42 for now
            )),
          ])
          .html()
      })
      /**
       * Return a `<li.c-Alert__Item>` component containing icons and dates for this registration period .
       * @summary Call `RegistrationPeriod#view.legend()` to render this display.
       * @function RegistrationPeriod.VIEW.legend
       * @returns {string} HTML output
       */
      .addDisplay(function legend() {
        return new Element('li').class('o-List__Item o-Flex__Item c-Alert__Item')
          .attr('data-instanceof','RegistrationPeriod')
          .addContent([
          new Element('i').class('material-icons').attr('role','none').addContent(this.getIcon()),
          new Element('small').addContent((function () {
            // test equal ISOStrings because th getters return `new Date()` if none is set
            let start_date = (this.startDate.toISOString() !== new Date().toISOString()) ? new Element('time').attr('datetime',this.startDate.toISOString()).addContent(xjs.Date.format(this.startDate, 'M j')) : false
            let end_date   = (this.endDate.toISOString()   !== new Date().toISOString()) ? new Element('time').attr('datetime',this.endDate  .toISOString()).addContent(xjs.Date.format(this.endDate  , 'M j')) : false
            let returned = []
            returned.push(new Element('b').addContent(this.name))
            if (!start_date && !end_date) { ; }
            else if (!end_date  ) returned.push(` begins `, start_date)
            else if (!start_date) returned.push(` ends `  , end_date)
            else returned.push(`: `, start_date, `&ndash;`, end_date)
            return returned
          }).call(this)),
        ]).html()
      })
  }
}

module.exports = RegistrationPeriod
