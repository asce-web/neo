const Element = require('extrajs-element')

/**
 * A set of prices for registration.
 * @module
 */
class Pass {
  /**
   * A set of prices for registration.
   * Construct a new Pass object.
   * @param {string} name the name or type of the pass
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._description  = ''
    /** @private */ this._fineprint    = ''
    /** @private */ this._attend_types = []
    /** @private */ this._is_starred = false
  }

  /**
   * Get the name of this pass.
   * @return {string} the name of this pass
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the description of this pass.
   * @param  {string=} text the description of this pass
   * @return {(Pass|string)} this pass || the description of this pass
   */
  description(text) {
    if (arguments.length) {
      this._description = text
      return this
    } else return this._description
  }

  /**
   * Set or get the fine print of this pass.
   * @param  {string=} text the fine print of this pass
   * @return {(Pass|string)} this pass || the fine print of this pass
   */
  fineprint(text) {
    if (arguments.length) {
      this._fineprint = text
      return this
    } else return this._fineprint
  }

  /**
   * Add an attendee type to this pass.
   * @param {Pass.AttendeeType} $attendeeType the attendee type to add
   */
  addAttendeeType($attendeeType) {
    this._attend_types.push($attendeeType)
    return this
  }
  // /**
  //  * REVIEW: use this method if class AttendeeType is removed.
  //  * Add an attendee type to this pass.
  //  * @param {string} name the name of the attendee type
  //  * @param {boolean} is_featured whether this attendee type is marked as “featured”
  //  */
  // addAttendeeType(name, is_featured) {
  //   this._attend_types.push({name: name, isFeatured: is_featured})
  //   return this
  // }
  /**
   * Retrieve an attendee type of this pass.
   * @param  {string} name the name of the attendee type to get
   * @return {?Pass.AtendeeType} the specified attendee type
   */
  getAttendeeType(name) {
    return this._attend_types.find(($attendeeType) => $attendeeType.name===name) || null
  }
  /**
   * Retreive all attendee types of this pass.
   * @return {Array<Pass.AttendeeType>} a shallow array of all attendee types of this pass
   */
  getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  /**
   * Mark this pass as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Pass} this pass
   */
  star(bool = true) {
    this._is_starred = bool
    return this
  }
  /**
   * Get the starred status of this pass.
   * @return {boolean} whether this pass is starred
   */
  isStarred() {
    return this._is_starred
  }


  /**
   * Render this pass in HTML.
   * Displays:
   * - `Pass#view()`      - default display
   * - `Pass#view.pass()` - Pass component
   * @returns {function(?):string} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Throw an error: must call an explicit display.
     * Call `Pass#view()` to render this display.
     * @return {string} HTML output
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `Pass#view[display]()`.')
      }).call(self)
    }
    /**
     * Return an <article.c-Pass> component marking up this pass’s info.
     * Call `Pass#view.pass()` to render this display.
     * @param  {Conference} $conference the conference to which this pass belongs
     * @return {string} HTML output
     */
    returned.pass = function ($conference) {
      return (function () {
        let current_period = $conference.currentRegistrationPeriod()
        return new Element('article').class('c-Pass')
          .attr('data-instanceof','Pass')
          .addElements([
            new Element('header').class('c-Pass__Head').addElements([
              new Element('h1').class('c-Pass__Hn').addContent(this.name),
              new Element('p').class('c-Pass__Desc')
                .addContent(this.description())
                .addElements([
                  (this.fineprint()) ? new Element('small').class('c-Pass__Fine h-Block').addContent(this.fineprint()) : null
                ])
            ]),
            (current_period) ? new Element('div').class('c-Pass__Body').addContent(
              current_period.view.pass(this, true)
            ) : null,
            new Element('footer').class('o-Flex c-Pass__Foot').addContent(
              $conference.getRegistrationPeriodsAll()
                .filter((registration_period) => registration_period !== current_period)
                .map((registration_period) => registration_period.view.pass(this, false))
                .join('')
            ),
          ])
          .html()
      }).call(self)
    }
    return returned
  }


  /**
   * Options for formatting pass prices.
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

  /**
   * REVIEW may not need this class
   * An Attendee Type ("Member", "Non-Member", etc) of a pass.
   * @inner
   */
  static get AttendeeType() { return AttendeeType }
}




/**
 * An Attendee Type ("Member", "Non-Member", etc) of a pass.
 */
class AttendeeType {
      /**
       * Construct a new AttendeeType object.
       * Parameters include a name and
       * a boolean specifying whether the object is featured.
       * Both name and “featured” are immutable.
       * @param {string} name the name of the attendee type
       * @param {boolean} is_featured whether this attendee type is marked as “featured”
       */
      constructor(name, is_featured) {
        /** @private @final */ this._NAME        = name
        /** @private @final */ this._IS_FEATURED = is_featured
      }
      /**
       * Get the name of this attendee type.
       * @return {string} the name of this attendee type
       */
      get name() {
        return this._NAME
      }
      /**
       * Get whether this attendee type is featured.
       * @return {boolean} whether this attendee type is featured
       */
      get isFeatured() {
        return this._IS_FEATURED
      }


  /**
   * Render this attendee type in HTML.
   * Displays:
   * - `AttendeeType#view()`      - default display
   * - `AttendeeType#view.pass()` - Pass__Period subcomponent
   * @returns {function(?):string} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Call `AttendeeType#view()` to render this display.
     * @return {string} HTML output
     * @throws {Error} if no display has been chosen
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `AttendeeType#view[display]()`.')
      }).call(self)
    }
    /**
     * Return an <article.c-Pass> component marking up this pass’s info.
     * Call `AttendeeType#view.pass()` to render this display.
     * @param  {number} price the price for this attendee type given a certain pass and registration period
     * @param  {boolean} is_body `true` if this attendee type happens to be in the pass body
     * @return {string} HTML output
     */
    returned.pass = function (price, is_body) {
      return (function () {
        return Element.concat(
          new Element('dt').class('c-Pass__Attendee').attr('data-instanceof','Pass.AttendeeType').addContent(this.name),
          new Element('dd').class('c-Pass__Price')
            .addClass((is_body && this.isFeatured) ? 'c-Pass__Price--featured' : '')
            .attr({
              'aria-label': `${price} ${Pass.PRICE_OPTIONS.resolvedOptions().currency}`,
              itemprop : 'priceSpecification',
              itemscope: '',
              itemtype : 'http://schema.org/UnitPriceSpecification',
            })
            .addElements([
              new Element('data')
                .attr('value',Pass.PRICE_OPTIONS.resolvedOptions().currency)
                .attr('itemprop','priceCurrency')
                .addContent(Pass.PRICE_OPTIONS.format(price).slice(0,1)), // first char // .charAt(0) // FIXME for USD only!
              new Element('span')
                .attr('itemprop','price')
                .addContent(Pass.PRICE_OPTIONS.format(price).slice(1)), // rest
            ])
        )
      }).call(self)
    }
    return returned
  }
}




module.exports = Pass
