const xjs     = require('extrajs')
const HTMLElement = require('extrajs-dom').HTMLElement
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
        return new HTMLElement('section').class('c-Pass__Period')
          .addClass((!is_body) ? 'o-Flex__Item' : '')
          .attr({
            'data-instanceof': 'RegistrationPeriod',
            itemprop : 'offers',
            itemscope: '',
            itemtype : 'http://schema.org/AggregateOffer',
          })
          .addContent([
            new HTMLElement('h1').class('c-Pass__Period__Hn').attr('itemprop','name').addContent([
              new HTMLElement('span').class('-d-n').addContent(`${$pass.name}: `), // NOTE: `.-d-n` hides from AT but reveals to Microdata
              this.name
            ]),
            new HTMLElement('meta').attr({ content:$pass.getAttendeeTypesAll().length, itemprop:'offerCount' }),
            (this.startDate.toISOString() !== new Date().toISOString()) ? new HTMLElement('meta').attr({ content:this.startDate.toISOString(), itemprop:'availabilityStarts' }) : null,
            (this.  endDate.toISOString() !== new Date().toISOString()) ? new HTMLElement('meta').attr({ content:this.  endDate.toISOString(), itemprop:'availabilityEnds'   }) : null,
            new HTMLElement('dl').addContent($pass.getAttendeeTypesAll().map((att_type) =>
              att_type.view.pass(42.87) // TODO price is 42 for now
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
        // test equal ISOStrings because the getters return `new Date()` if none is set
        let start_date = (this.startDate.toISOString() !== new Date().toISOString()) ? new HTMLElement('time').attr('datetime',this.startDate.toISOString()).addContent(xjs.Date.format(this.startDate, 'M j')) : null
        let end_date   = (this.endDate  .toISOString() !== new Date().toISOString()) ? new HTMLElement('time').attr('datetime',this.endDate  .toISOString()).addContent(xjs.Date.format(this.endDate  , 'M j')) : null
        let small = [new HTMLElement('b').addContent(this.name)]
        if (start_date && end_date) small.push(`: `, start_date, `&ndash;`, end_date)
        else if (start_date) small.push(` begins `, start_date)
        else if (end_date  ) small.push(` ends `  , end_date)
        return new HTMLElement('p').class('c-RegPdIcon').attr('data-instanceof','RegistrationPeriod').addContent([
          new HTMLElement('i').class('material-icons').attr('role','none').addContent(this.getIcon()),
          new HTMLElement('small').addContent(small),
        ])
      })
  }
}

module.exports = RegistrationPeriod
