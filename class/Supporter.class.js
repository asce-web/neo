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
}

module.exports = Supporter
