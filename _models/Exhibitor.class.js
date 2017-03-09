module.exports = (function () {
  // CONSTRUCTOR
  /**
   * An organization exhibiting at a conference or series of conferences.
   * Assigned at the site level, not at an individual conference.
   * Construct a new Exhibitor object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the exhibiting organization
   */
  function Exhibitor(name) {
    var self = this
    self._NAME = name
    self._url   = ''
    self._img   = ''
    self._description = ''
    self._booth = NaN
    self._is_sponsor = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the name of this exhibitor.
   * @return {string} the name of this exhibitor
   */
  Exhibitor.prototype.name = function name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this exhibitor.
   * @param  {string=} url the URL of this exhibitor
   * @return {(Exhibitor|string)} this exhibitor || the URL of this exhibitor
   */
  Exhibitor.prototype.url = function url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * Set or get the image of this exhibitor.
   * @param  {string=} img the image of this exhibitor
   * @return {(Exhibitor|string)} this exhibitor || the image of this exhibitor
   */
  Exhibitor.prototype.img = function img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else return this._img
  }

  /**
   * Set a short, html-friendly description for this exhibitor.
   * @param {string} html html-friendly content
   * @return {Exhibitor} this exhibitor
   */
  Exhibitor.prototype.setDescription = function setDescription(html) {
    this._description = html
    return this
  }
  /**
   * Get the description of this exhibitor.
   * @param  {boolean=} unescaped whether or not the returned string should be escaped
   * @return {string} the description of this exhibitor
   */
  Exhibitor.prototype.getDescription = function getDescription(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._description
  }

  /**
   * Set or get the booth number of this exhibitor.
   * @param  {number=} num the booth number of this exhibitor
   * @return {(Exhibitor|number)} this exhibitor || the booth number of this exhibitor
   */
  Exhibitor.prototype.booth = function booth(num) {
    if (arguments.length) {
      this._booth = num
      return this
    } else return this._booth
  }

  /**
   * Set or get whether this exhibitor is also a sponsor.
   * @see Supporter
   * @param  {boolean=} flag `true` if this exhibitor is also a sponsor
   * @return {(Exhibitor|boolean)} this exhibitor || `true` if this exhibitor is also a sponsor
   */
  Exhibitor.prototype.isSponsor = function isSponsor(flag) {
    if (arguments.length) {
      this._is_sponsor = flag
      return this
    } else return this._is_sponsor
  }

  return Exhibitor
})()
