const Element = require('extrajs-element')

/**
 * An organization supporting a conference or series of conferences.
 * @module
 */
module.exports = class Supporter {
  /**
   * Construct a supporter object, given an (immutable) name.
   * @param {string} name the name of the supporting organization
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._url   = ''
    /** @private */ this._img   = ''
    /** @private */ this._level = ''
  }

  /**
   * Get the name of this supporter.
   * @return {string} the name of this supporter
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the URL of this supporter.
   * @param  {string=} url the URL of this supporter
   * @return {(Supporter|string)} this supporter || the URL of this suppoter
   */
  url(url) {
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
  img(img) {
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
  level(level) {
    if (arguments.length) {
      this._level = level
      return this
    } else return this._level
  }


  /**
   * Render this supporter in HTML.
   * Displays:
   * - `Supporter#view()` - default display
   * - `Supporter#view.supporterBlock()` - SupporterBlock component
   * @returns {function(?):string} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Call `Supporter#view()` to render this display.
     * @return {string} HTML output
     * @throws {Error} if no display has been chosen
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `Supporter#view[display]()`.')
      }).call(self)
    }
    /**
     * Return a <a.c-SupporterBlock__Logo> subcomponent, an image of the supporter logo.
     * Call `Supporter#view.supporterBlock()` to render this display.
     * @return {string} HTML output
     */
    returned.supporterBlock = function () {
      return (function () {
        return new Element('a').attr({
          'data-instanceof': 'Supporter',
          href    : this.url(),
          rel     : 'external nofollow',
          itemprop: 'url'
        }).addElements([
          new Element('img').class('c-SupporterBlock__Logo').attr({ src:this.img(), alt:this.name, itemprop:'logo' }),
          new Element('meta').attr({ content:this.name, itemprop:'name' }),
        ]).html()
      }).call(self)
    }
    return returned
  }
}
