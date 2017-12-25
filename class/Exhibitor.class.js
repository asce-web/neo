const HTMLElement  = require('extrajs-dom').HTMLElement
const View         = require('extrajs-view')
const Util         = require('./Util.class.js')
const Organization = require('./Organization.class.js')

/**
 * An organization exhibiting at a conference or series of conferences.
 * @extends Organization
 */
class Exhibitor extends Organization {
  /**
   * Construct a new Exhibitor object.
   * @param {!Object} jsondata a JSON object
   * @param {string} jsondata.name the name of the organization
   * @param {string=} jsondata.url the url of the organization
   * @param {string=} jsondata.image the image url of the organization
   * @param {string=} jsondata.description the name of the organization
   * @param {number=} jsondata.$booth the booth number of this exhibitor
   * @param {boolean=} jsondata.$isSponsor whether this exhibitor also happens to be a sponsor
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
   * @summary The description of this exhibitor.
   * @todo TODO move to SchemaObject
   * @type {string}
   */
  get description() {
    return this._DATA.description || ''
  }

  /**
   * @summary The booth number of this exhibitor.
   * @description Return `NaN` if this exhibitor has no booth number.
   * @type {number}
   */
  get booth() {
    return this._DATA.$booth || NaN
  }

  /**
   * @summary Whether this exhibitor is also a sponsor.
   * @see Supporter
   * @type {boolean}
   */
  get isSponsor() {
    return this._DATA.$isSponsor || false
  }


  /**
   * @summary Render this exhibitor in HTML.
   * @see Exhibitor.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Exhibitor#view()` - default display
     * @namespace Exhibitor.VIEW
     * @type {View}
     */
    /**
     * COMBAK Exhibitor view has not been decided yet.
     * @summary Call `Exhibitor#view()` to render this display.
     * @todo COMBAK Exhibitor view has not been decided yet.
     * @function Exhibitor.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      return Util.documentFragment([
        new HTMLElement('a').class((this.isSponsor) ? '-fw-b' : null).attr('href', this.url).addContent(`${this.name} (booth ${this.booth})`),
        new HTMLElement('img').attr('src', this.image || '#0').attr('alt', this.name),
      ])
    }, this)
  }
}

module.exports = Exhibitor
