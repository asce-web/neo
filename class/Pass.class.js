const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
const View    = require('extrajs-view')
const Util    = require('./Util.class.js')

/**
 * A set of prices for registration.
 */
class Pass {
  /**
   * Construct a new Pass object.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name or type of the pass
   * @param {string=} jsondata.description a short description of this pass
   * @param {string=} jsondata.$fineprint further details of this pass
   */
  constructor(jsondata) {
    /**
     * All the data for this pass.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
    /** @private */ this._attend_types = []
    /** @private */ this._is_starred = false
  }

  /**
   * @summary Get the name of this pass.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The description of this pass.
   * @type {string}
   */
  get description() {
    return this._DATA.description || ''
  }

  /**
   * @summary The fine print of this pass.
   * @type {string}
   */
  get fineprint() {
    return Util.stringify(this._DATA.$fineprint)
  }

  /**
   * @summary Add an attendee type to this pass.
   * @param   {Pass.AttendeeType} $attendeeType the attendee type to add
   * @returns {Pass} this pass
   */
  addAttendeeType($attendeeType) {
    this._attend_types.push($attendeeType)
    return this
  }
  // /**
  //  * REVIEW: use this method if class AttendeeType is removed.
  //  * @summary Add an attendee type to this pass.
  //  * @param   {string} name the name of the attendee type
  //  * @param   {boolean} is_featured whether this attendee type is marked as “featured”
  //  * @returns {Pass} this pass
  //  */
  // addAttendeeType(name, is_featured) {
  //   this._attend_types.push({name: name, isFeatured: is_featured})
  //   return this
  // }
  /**
   * @summary Retrieve an attendee type of this pass.
   * @param   {string} name the name of the attendee type to get
   * @returns {?Pass.AtendeeType} the specified attendee type
   */
  getAttendeeType(name) {
    return this._attend_types.find(($attendeeType) => $attendeeType.name===name) || null
  }
  /**
   * @summary Retreive all attendee types of this pass.
   * @returns {Array<Pass.AttendeeType>} a shallow array of all attendee types of this pass
   */
  getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  /**
   * @summary Mark this pass as starred.
   * @param   {boolean=} bool if true, mark as starred
   * @returns {Pass} this pass
   */
  star(bool = true) {
    this._is_starred = bool
    return this
  }
  /**
   * @summary Get the starred status of this pass.
   * @returns {boolean} whether this pass is starred
   */
  isStarred() {
    return this._is_starred
  }


  /**
   * @summary Render this pass in HTML.
   * @see Pass.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Pass#view.pass()` - Pass component
     * @namespace Pass.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return an `<article.c-Pass>` component marking up this pass’s info.
       * @summary Call `Pass#view.pass()` to render this display.
       * @function Pass.VIEW.pass
       * @param   {Conference} $conference the conference to which this pass belongs
       * @returns {string} HTML output
       */
      .addDisplay(function pass($conference) {
        let current_period = $conference.currentRegistrationPeriod
        return new HTMLElement('article').class('c-Pass')
          .attr('data-instanceof','Pass')
          .addContent([
            new HTMLElement('header').class('c-Pass__Head').addContent([
              new HTMLElement('h1').class('c-Pass__Hn').addContent(this.name),
              new HTMLElement('p').class('c-Pass__Desc').addContent([
                this.description,
                (this.fineprint) ? new HTMLElement('small').class('c-Pass__Fine h-Block').addContent(this.fineprint) : null,
              ]),
            ]),
            new HTMLElement('div').class('c-Pass__Body').addContent(current_period.view.pass(this, true)),
            new HTMLElement('footer').class('o-Flex c-Pass__Foot').addContent(
              $conference.getRegistrationPeriodsAll()
                .filter((registration_period) => registration_period.name !== current_period.name)
                .map((registration_period) => registration_period.view.pass(this, false))
            ),
          ])
          .html()
      })
  }


  /**
   * @summary Options for formatting pass prices.
   * @type {Intl.NumberFormat}
   */
  static get PRICE_OPTIONS() {
    return new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
      maximumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
    })
  }
}



/**
 * An Attendee Type ("Member", "Non-Member", etc) of a pass.
 */
Pass.AttendeeType = class AttendeeType {
  /**
   * Construct a new AttendeeType object.
   * @param {string} name the name of the attendee type
   */
  constructor(name) {
    /**
     * All the data for this attendee type.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = { name: name }
  }
  /**
   * @summary The name of this attendee type.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }


  /**
   * @summary Render this attendee type in HTML.
   * @see Pass.AttendeeType.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `AttendeeType#view()`      - default display
     * - `AttendeeType#view.pass()` - Pass__Period subcomponent
     * @namespace Pass.AttendeeType.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return an <article.c-Pass> component marking up this pass’s info.
       * @summary Call `AttendeeType#view.pass()` to render this display.
       * @function Pass.AttendeeType.VIEW.pass
       * @param   {number} price the price for this attendee type given a certain pass and registration period
       * @param   {boolean} is_featured whether this attendee type is marked as “featured”
       * @returns {string} HTML output
       */
      .addDisplay(function pass(price, is_featured) {
        return Element.concat([
          new HTMLElement('dt').class('c-Pass__Attendee').attr('data-instanceof','Pass.AttendeeType').addContent(this.name),
          new HTMLElement('dd').class('c-Pass__Price')
            .addClass((is_featured) ? 'c-Pass__Price--featured' : '')
            .attr({
              'aria-label': `${price} ${Pass.PRICE_OPTIONS.resolvedOptions().currency}`,
              itemprop : 'priceSpecification',
              itemscope: '',
              itemtype : 'http://schema.org/UnitPriceSpecification',
            })
            .addContent([
              new HTMLElement('data')
                .attr('value',Pass.PRICE_OPTIONS.resolvedOptions().currency)
                .attr('itemprop','priceCurrency')
                .addContent(Pass.PRICE_OPTIONS.format(price).slice(0,1)), // first char // .charAt(0) // FIXME for USD only!
              new HTMLElement('span')
                .attr('itemprop','price')
                .addContent(Pass.PRICE_OPTIONS.format(price).slice(1)), // rest
            ]),
        ])
      })
  }
}

module.exports = Pass
