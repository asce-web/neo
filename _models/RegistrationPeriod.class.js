var Element = require('helpers-js').Element
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
   * Get the name of this registration period.
   * @return {string} the name of this registration period
   */
  get name() {
    return this._NAME
  }

  /**
   * Get the start date of this registration period.
   * @return {Date} the start date of this registration period
   */
  get startDate() {
    return this._START || new Date()
  }

  /**
   * Get the end date of this registration period.
   * @return {Date} the end date of this registration period
   */
  get endDate() {
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


  /**
   * Markup this registration period in HTML.
   * @param  {RegistrationPeriod.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = RegistrationPeriod.Display.PASS_PERIOD, ...args) {
    let returned = {
      /**
       * Return a Pass__Period subcomponent.
       * @param  {Pass} $pass the Pass component in which this registration period is rendered
       * @param  {boolean} is_body `true` if this period belongs in the pass body (if it’s current)
       * @return {string} a <section> element DOM output
       */
      [RegistrationPeriod.Display.PASS_PERIOD]: function ($pass, is_body) {
        // FIXME HACK cannot require(Pass) because it depends on this class
        const Pass = { AttendeeType : { Display: { PASS_ATTENDEE: 'passAttendee' } } }
        return new Element('section').class('c-Pass__Period')
          .addClass((!is_body) ? 'o-Flex__Item' : '')
          .attr({
            'data-instanceof': 'RegistrationPeriod',
            itemprop : 'offers',
            itemscope: '',
            itemtype : 'https://schema.org/AggregateOffer',
          })
          .addElements([
            new Element('h1').class('c-Pass__Period__Hn').attr('itemprop','name')
              .addElements([ new Element('span').class('-d-n').addContent(`${$pass.name}: `) ]) // NOTE: `.-d-n` hides from AT but reveals to Microdata
              .addContent(this.name),
            // new Element('meta').attr({ content:$pass.getAttendeeTypesAll().length, itemprop:'offerCount' }), // TODO use number arg on helpers-js@0.4.1 update
            new Element('meta').attr({ content:`${$pass.getAttendeeTypesAll().length}`, itemprop:'offerCount' }), // TODO use number arg on helpers-js@0.4.1 update
            // NOTE the getters below return `new Date()` if none is set
            (this.startDate.toISOString() !== new Date().toISOString()) ? new Element('meta').attr({ content:this.startDate.toISOString(), itemprop:'availabilityStarts' }) : null,
            (this.  endDate.toISOString() !== new Date().toISOString()) ? new Element('meta').attr({ content:this.  endDate.toISOString(), itemprop:'availabilityEnds'   }) : null,
            new Element('dl').addContent($pass.getAttendeeTypesAll().map((att_type) =>
              att_type.view(Pass.AttendeeType.Display.PASS_ATTENDEE, 42.87, is_body) // TODO price is 42 for now
            ).join('')),
          ])
          .html()
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }


  /**
   * Enum for RegistrationPeriod formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** A Pass__Period subcomponent. */ PASS_PERIOD: 'passPeriod',
    }
  }
}
