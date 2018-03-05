const xjs = require('extrajs-dom')
const View    = require('extrajs-view')
const Organization = require('./Organization.class.js')

const xSupporter = require('../tpl/x-supporter.tpl.js')

/**
 * An organization supporting a conference or series of conferences.
 * @extends Organization
 */
class Supporter extends Organization {
  /**
   * Construct a new Supporter object.
   * @param {!Object} jsondata a JSON object
   * @param {string} jsondata.name the name of the organization
   * @param {string=} jsondata.url the url of the organization
   * @param {string=} jsondata.image the image url of the organization
   * @param {string=} json.$level the level of the supporting organization
   */
  constructor(jsondata) {
    super(jsondata)
    /**
     * All the data for this supporter.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary The supporter level in which this supporter belongs.
   * @type {string}
   */
  get level() {
    return this._DATA.$level || ''
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
     * - `Supporter#view()` - (default) SupporterBlock component
     * @namespace Supporter.VIEW
     * @type {View}
     */
      /**
       * Return a `<a.c-SupporterBlock__Logo>` subcomponent, an image of the supporter logo.
       * @summary Call `Supporter#view()` to render this display.
       * @function Supporter.VIEW.default
       * @returns {string} HTML output
       */
    return new View(function () {
        return new xjs.DocumentFragment(xSupporter.render({...this._DATA, logo: this._DATA.image})).innerHTML()
    }, this)
  }
}

module.exports = Supporter
