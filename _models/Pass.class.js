var Element = require('helpers-js').Element
var RegistrationPeriod = require('./RegistrationPeriod.class.js')

class Pass {
  /**
   * A set of prices for registration.
   * Constructs a Pass object.
   * @constructor
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
   * Markup this pass in HTML.
   * @param  {Pass.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = Pass.Display.PASS, ...args) {
    let returned = {
      /**
       * Return a Pass component.
       * @param  {Conference} $conference the conference to which this pass belongs
       * @return {string} site title link in header
       */
      [Pass.Display.PASS]: function ($conference) {
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
              current_period.view(RegistrationPeriod.Display.PASS_PERIOD, this, true)
            ) : null,
            new Element('footer').class('o-Flex c-Pass__Foot').addContent(
              $conference.getRegistrationPeriodsAll()
                .filter((registration_period) => registration_period !== current_period)
                .map((registration_period) => registration_period.view(RegistrationPeriod.Display.PASS_PERIOD, this, false))
                .join('')
            ),
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
   * Options for formatting pass prices.
   * Equivalent to the `options` parameter for
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString|Number#toLocaleString()}.
   * @type {Object}
   */
  static get PRICE_OPTIONS() {
    return {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
      maximumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
    }
  }

  /**
   * Enum for pass formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** Pass component. */ PASS: 'pass',
    }
  }

  /**
   * REVIEW may not need this class
   * An Attendee Type ("Member", "Non-Member", etc) of a pass.
   * @inner
   */
  static get AttendeeType() { return AttendeeType }
}




class AttendeeType {
      /**
       * An Attendee Type ("Member", "Non-Member", etc) of a pass.
       * Construct an AttendeeType object, given a name and
       * a boolean specifying whether the object is featured.
       * Both name and “featured” are immutable.
       * @constructor
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
   * Markup this attendee type in HTML.
   * @param  {AttendeeType.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representating an HTML DOM snippet
   */
  view(display = AttendeeType.Display.PASS_ATTENDEE, ...args) {
    let returned = {
      /**
       * Return a Pass__Period subcomponent.
       * @param  {number} price the price for this attendee type given a certain pass and registration period
       * @param  {boolean} is_body `true` if this attendee type happens to be in the pass body
       * @return {string} a <dt>–<dd> pair DOM output
       */
      [AttendeeType.Display.PASS_ATTENDEE]: function (price, is_body) {
        return Element.concat(
          new Element('dt').class('c-Pass__Attendee').attr('data-instanceof','Pass.AttendeeType').addContent(this.name),
          new Element('dd').class('c-Pass__Price')
            .addClass((is_body && this.isFeatured) ? 'c-Pass__Price--featured' : '')
            .attr({
              'aria-label': `${price} ${Pass.PRICE_OPTIONS.currency}`,
              itemprop : 'priceSpecification',
              itemscope: '',
              itemtype : 'http://schema.org/UnitPriceSpecification',
            })
            .addElements([
              new Element('data')
                .attr('value',Pass.PRICE_OPTIONS.currency)
                .attr('itemprop','priceCurrency')
                .addContent(price.toLocaleString('en', Pass.PRICE_OPTIONS).slice(0,1)), // first char // .charAt(0) // FIXME for USD only!
              new Element('span')
                .attr('itemprop','price')
                .addContent(price.toLocaleString('en', Pass.PRICE_OPTIONS).slice(1)), // rest
            ])
        )
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }


  /**
   * Enum for AttendeeType formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** A Pass__Attendee subcomponent. */ PASS_ATTENDEE: 'passAttendee',
    }
  }
}




module.exports = Pass
