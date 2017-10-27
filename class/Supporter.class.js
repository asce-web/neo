const Element = require('extrajs-dom').Element
const View    = require('extrajs-view')

/**
 * An organization supporting a conference or series of conferences.
 */
class Supporter {
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
   * @summary Get the name of this supporter.
   * @type {string}
   */
  get name() {
    return this._NAME
  }

  /**
   * @summary Set or get the URL of this supporter.
   * @param   {string=} url the URL of this supporter
   * @returns {(Supporter|string)} this supporter || the URL of this suppoter
   */
  url(url) {
    if (arguments.length) {
      this._url = url
      return this
    } else return this._url
  }

  /**
   * @summary Set or get the image of this supporter.
   * @param   {string=} img the image of this supporter
   * @returns {(Supporter|string)} this supporter || the image of this suppoter
   */
  img(img) {
    if (arguments.length) {
      this._img = img
      return this
    } else return this._img
  }

  /**
   * @summary Set or get the supporter level in which this supporter belongs.
   * @see SupporterLevel
   * @param   {string=} level a string matching a the name of a SupporterLevel; the level this supporter belongs in
   * @returns {(Supporter|string)} this supporter || name of the corresponding SupporterLevel object
   */
  level(level) {
    if (arguments.length) {
      this._level = level
      return this
    } else return this._level
  }


  /**
   * @summary Render this supporter in HTML.
   * @see Supporter.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Supporter#view.supporterBlock()` - SupporterBlock component
     * @namespace Supporter.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a `<a.c-SupporterBlock__Logo>` subcomponent, an image of the supporter logo.
       * @summary Call `Supporter#view.supporterBlock()` to render this display.
       * @function Supporter.VIEW.supporterBlock
       * @returns {string} HTML output
       */
      .addDisplay(function supporterBlock() {
        return new Element('a').attr({
          'data-instanceof': 'Supporter',
          href    : this.url(),
          rel     : 'external nofollow',
          itemprop: 'url'
        }).addContent([
          new Element('img').class('c-SupporterBlock__Logo').attr({ src:this.img(), alt:this.name, itemprop:'logo' }),
          new Element('meta').attr({ content:this.name, itemprop:'name' }),
        ]).html()
      })
  }
}

module.exports = Supporter
