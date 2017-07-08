module.exports = class Exhibitor {
  /**
   * An organization exhibiting at a conference or series of conferences.
   * Assigned at the site level, not at an individual conference.
   * Construct a new Exhibitor object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the exhibiting organization
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._url   = ''
    /** @private */ this._img   = ''
    /** @private */ this._description = ''
    /** @private */ this._booth = NaN
    /** @private */ this._is_sponsor = false
  }

  /**
   * Get the name of this exhibitor.
   * @return {string} the name of this exhibitor
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this exhibitor.
   * @param  {string=} url the URL of this exhibitor
   * @return {(Exhibitor|string)} this exhibitor || the URL of this exhibitor
   */
  url(url) {
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
  img(img) {
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
  setDescription(html) {
    this._description = html
    return this
  }
  /**
   * Get the description of this exhibitor.
   * @param  {boolean=} unescaped whether or not the returned string should be escaped
   * @return {string} the description of this exhibitor
   */
  getDescription(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._description
  }

  /**
   * Set or get the booth number of this exhibitor.
   * @param  {number=} num the booth number of this exhibitor
   * @return {(Exhibitor|number)} this exhibitor || the booth number of this exhibitor
   */
  booth(num) {
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
  isSponsor(flag) {
    if (arguments.length) {
      this._is_sponsor = flag
      return this
    } else return this._is_sponsor
  }
}
