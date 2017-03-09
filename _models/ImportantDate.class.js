module.exports = (function () {
  // CONSTRUCTOR
  /**
   * An important date.
   * Construct an ImportantDate object.
   * The name and start time
   * are immutable and must be provided during construction.
   * @constructor
   * @param {Object} $actioninfo an object with the following immutable properties:
   * @param {string} $actioninfo.name the name of the important date
   * @param {Date} $actioninfo.start_time the start time of the important date
   */
  function ImportantDate($actioninfo) {
    var self = this
    $actioninfo = $actioninfo || {} // NOTE constructor overloading
    self._NAME  = $actioninfo.name
    self._START = $actioninfo.start_time
    self._url       = ''
    self._is_starred = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this important date.
   * @return {string} the name of this important date
   */
  ImportantDate.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Get the date value of this important date.
   * @return {Date} the date of this important date
   */
  ImportantDate.prototype.startTime = function startTime() {
    return this._START || new Date()
  }

  /**
   * Set or get the url of this important date.
   * @param  {string=} url the url of this important date
   * @return {(ImportantDate|string)} this important date || the url of this important date
   */
  ImportantDate.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Mark this important date as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {ImportantDate} this important date
   */
  ImportantDate.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this important date.
   * @return {boolean} whether this important date is starred
   */
  ImportantDate.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  return ImportantDate
})()
