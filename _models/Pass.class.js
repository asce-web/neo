module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A set of prices for registration.
   * Constructs a Pass object.
   * @constructor
   * @param {string} name the name or type of the pass
   */
  function Pass(name) {
    var self = this
    self._NAME = name
    self._description  = ''
    self._fineprint    = ''
    self._attend_types = []
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this pass.
   * @return {string} the name of this pass
   */
  Pass.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the description of this pass.
   * @param  {string=} text the description of this pass
   * @return {(Pass|string)} this pass || the description of this pass
   */
  Pass.prototype.description = function description(text) {
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
  Pass.prototype.fineprint = function fineprint(text) {
    if (arguments.length) {
      this._fineprint = text
      return this
    } else return this._fineprint
  }

  /**
   * Add an attendee type to this pass.
   * @param {AttendeeType} $attendeeType the attendee type to add
   */
  Pass.prototype.addAttendeeType = function addAttendeeType($attendeeType) {
    this._attend_types.push($attendeeType)
    return this
  }
  /**
   * Retrieve an attendee type of this pass.
   * @param  {string} name the name of the attendee type to get
   * @return {?AtendeeType} the specified attendee type
   */
  Pass.prototype.getAttendeeType = function getAttendeeType(name) {
    return this._attend_types.find(function ($attendeeType) { return $attendeeType.name() === name }) || null
  }
  /**
   * Remove an attendee type from this pass.
   * @param  {string} name the name of the attendee type to remove
   * @return {Pass} pass
   */
  Pass.prototype.removeAttendeeType = function removeAttendeeType(name) {
    Util.spliceFromArray(this._attend_types, this.getAttendeeType(name))
    return this
  }
  /**
   * Retreive all attendee types of this pass.
   * @return {Array<AttendeeType>} a shallow array of all attendee types of this pass
   */
  Pass.prototype.getAttendeeTypesAll = function getAttendeeTypesAll() {
    return this._attend_types.slice()
  }

  /**
   * Mark this pass as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Pass} this pass
   */
  Pass.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this pass.
   * @return {boolean} whether this pass is starred
   */
  Pass.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  // STATIC MEMBERS
  /**
   * REVIEW may not need this class
   * An Attendee Type ("Member", "Non-Member", etc) of a pass.
   * @inner
   */
  Pass.AttendeeType = (function () {
    /**
     * An Attendee Type ("Member", "Non-Member", etc) of a pass.
     * Construct an AttendeeType object, given a name and
     * a boolean specifying whether the object is featured.
     * Both name and “featured” are immutable.
     * @constructor
     * @param {string} name the name of the attendee type
     * @param {boolean} is_featured whether this attendee type is marked as “featured”
     */
    function AttendeeType(name, is_featured) {
      var self = this
      self._NAME        = name
      self._IS_FEATURED = is_featured
    }
    /**
     * Get the name of this attendee type.
     * @return {string} the name of this attendee type
     */
    AttendeeType.prototype.name = function name() {
      return this._NAME
    }
    /**
     * Get whether this attendee type is featured.
     * @return {boolean} whether this attendee type is featured
     */
    AttendeeType.prototype.isFeatured = function isFeatured() {
      return this._IS_FEATURED
    }
    return AttendeeType
  })()

  return Pass
})()
