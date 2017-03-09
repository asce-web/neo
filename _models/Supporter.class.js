module.exports = (function () {
  // CONSTRUCTOR
  /**
   * An organization supporting a conference or series of conferences.
   * Assigned at the site level, not at an individual conference.
   * Construct a supporter object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the supporting organization
   */
  function Supporter(name) {
    var self = this
    self._NAME = name
    self._url   = ''
    self._img   = ''
    self._level = ''
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this supporter.
   * @return {string} the name of this supporter
   */
  Supporter.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this supporter.
   * @param  {string=} url the URL of this supporter
   * @return {(Supporter|string)} this supporter || the URL of this suppoter
   */
  Supporter.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Set or get the image of this supporter.
   * @param  {string=} img the image of this supporter
   * @return {(Supporter|string)} this supporter || the image of this suppoter
   */
  Supporter.prototype.img = function img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else return this._img
  }

  /**
   * Set or get the supporter level in which this supporter belongs.
   * @see SupporterLevel
   * @param  {string=} level a string matching a the name of a SupporterLevel; the level this supporter belongs in
   * @return {(Supporter|string)} this supporter || name of the corresponding SupporterLevel object
   */
  Supporter.prototype.level = function level(level) {
    if (arguments.length) {
      this._level = level
      return this
    } else return this._level
  }

  return Supporter
})()
