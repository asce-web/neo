/**
 * An organization such as a school, NGO, corporation, club, etc.
 * @see http://schema.org/Organization
 */
class Organization {
  /**
   * Construct a new Organization object.
   * @param {!Object} jsondata a JSON object
   * @param {string} jsondata.name the name of the organization
   * @param {string=} jsondata.url the url of the organization
   * @param {string=} jsondata.image the image url of the organization
   */
  constructor(jsondata) {
    /**
     * All the data for this organization.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary The name of this organization.
   * @todo TODO move to SchemaObject
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The URL of this supporter.
   * @todo TODO move to SchemaObject
   * @type {string}
   */
  get url() {
    return this._DATA.url || ''
  }

  /**
   * @summary The image url of this supporter.
   * @todo TODO move to SchemaObject
   * @type {string}
   */
  get img() {
    return this._DATA.image || ''
  }
}

module.exports = Organization
