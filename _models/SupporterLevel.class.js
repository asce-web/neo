module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A group of supporters with a similar level of support or donation.
   * Assigned at the site level, not at an individual conference.
   * Construct a SupporterLevel object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the level (e.g. 'Gold')
   */
  function SupporterLevel(name) {
    var self = this
    self._NAME = name
    self._size = ''
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this supporter level.
   * @return {string} the name of this supporter level
   */
  SupporterLevel.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the sizing of this supporter level.
   * The sizing informs the size of the supporter logo in this supporter level.
   * The parameter must be one of the following enumerated values:
   * - 'lrg'
   * - 'med'
   * - 'sml'
   * @param  {string=} str the sizing of this supporter level’s logos
   * @return {(SupporterLevel|string)} this supporter level | the sizing
   */
  SupporterLevel.prototype.size = function size(str) {
    if (arguments.length) {
      this._size = str
      return this
    } else return this._size
  }

  return SupporterLevel
})()
