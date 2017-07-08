module.exports = class Pass {
  /**
   * A set of prices for registration.
   * Constructs a Pass object.
   * @constructor
   * @param {string} name the name or type of the pass
   */
  constructor(name) {
    var self = this
    self._NAME = name
    self._description  = ''
    self._fineprint    = ''
    self._attend_types = []
    self._is_starred = false
  }

  /**
   * Get the name of this pass.
   * @return {string} the name of this pass
   */
  name() {
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
   * @param {AttendeeType} $attendeeType the attendee type to add
   */
  addAttendeeType($attendeeType) {
    this._attend_types.push($attendeeType)
    return this
  }
  /**
   * Retrieve an attendee type of this pass.
   * @param  {string} name the name of the attendee type to get
   * @return {?AtendeeType} the specified attendee type
   */
  getAttendeeType(name) {
    return this._attend_types.find(function ($attendeeType) { return $attendeeType.name() === name }) || null
  }
  /**
   * Retreive all attendee types of this pass.
   * @return {Array<AttendeeType>} a shallow array of all attendee types of this pass
   */
  getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  /**
   * Mark this pass as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Pass} this pass
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
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
   * REVIEW may not need this class
   * An Attendee Type ("Member", "Non-Member", etc) of a pass.
   * @inner
   */
  static get AttendeeType() {
    return class {
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
        var self = this
        self._NAME        = name
        self._IS_FEATURED = is_featured
      }
      /**
       * Get the name of this attendee type.
       * @return {string} the name of this attendee type
       */
      name() {
        return this._NAME
      }
      /**
       * Get whether this attendee type is featured.
       * @return {boolean} whether this attendee type is featured
       */
      isFeatured() {
        return this._IS_FEATURED
      }
    }
  }
}
