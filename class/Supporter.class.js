const xjs = require('extrajs-dom')
const View    = require('extrajs-view')
const Organization = require('./Organization.class.js')


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
    return new View(null, this)
  }
}

module.exports = Supporter
