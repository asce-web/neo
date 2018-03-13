const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const Util = require('./Util.class.js')


/**
 * A set of prices for registration.
 */
class Pass {
  /**
   * Construct a new Pass object.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.name the name or type of the pass
   * @param {string=} jsondata.description a short description of this pass
   * @param {string=} jsondata.$fineprint further details of this pass
   * @param {Array<string>=} jsondata.$attendeeTypes types of attendees that can purchase this pass
   *                                                 (usually based on membership)
   */
  constructor(jsondata) {
    /**
     * All the data for this pass.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }
}

  /**
   * @summary Options for formatting pass prices.
   * @const {Intl.NumberFormat}
   */
    Pass.PRICE_OPTIONS = new Intl.NumberFormat('en', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
      maximumFractionDigits: 0, // REVIEW: remove these lines to show cent amounts
    })

module.exports = Pass
