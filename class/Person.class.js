const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const {xPersonFullname} = require('aria-patterns')

const xPersonContact = require('../dist/tpl/person-contact.tpl.js').default


/**
 * A person (alive, dead, undead, or fictional).
 * Can be used for any role on the site,
 * e.g., speaker, chair, or ASCE staff member.
 * @see https://schema.org/Person
 */
class Person {
  /**
   * Construct a new Person object.
   * @param {!Object} jsondata a JSON object
   * @param {string} jsondata.identifier
   * @param {string=} jsondata.name
   * @param {string} jsondata.givenName
   * @param {string} jsondata.familyName
   * @param {string=} jsondata.additionalName  the person’s middle name or initial
   * @param {string=} jsondata.honorificPrefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string=} jsondata.honorificSuffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   * @param {string=} jsondata.image the url to a headshot image of this person
   * @param {string=} jsondata.url the url to this person’s homepage or website
   * @param {string=} jsondata.email this person’s email address
   * @param {string=} jsondata.telephone this person’s telephone number
   * @param {string=} jsondata.jobTitle
   * @param {!Object=} jsondata.affiliation ; type {@link http://schema.org/Organization}
   * @param {string=} jsondata.affiliation.name an organization that this person is affiliated with
   * @param {Array<!Object>=} jsondata.$social a list of social media links for this person; type {@link http://schema.org/URL}
   * @param {string}          jsondata.$social.name the name or identifier of the social media service (used for icons)
   * @param {string}          jsondata.$social.url the URL of the person’s social media profile or page
   * @param {string=}         jsondata.$social.description short alternative text for non-visual media
   */
  constructor(jsondata) {
    /**
     * All the data for this person.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary The string name of this person if it exists; else the object name of this person.
   * @type {!Object}
   */
  get name() {
    return {
      givenName      : this._DATA.givenName       || this._DATA.name || '',
      familyName     : this._DATA.familyName      || '',
      additionalName : this._DATA.additionalName  || '',
      honorificPrefix: this._DATA.honorificPrefix || '',
      honorificSuffix: this._DATA.honorificSuffix || '',
    }
  }


	/**
	 * Return this person’s name in "FullName, Director of ... | 555-555-5555" format.
	 * @returns {string} HTML output
	 */
	view_contact() {
		return new xjs.DocumentFragment(xPersonContact.process(this._DATA)).innerHTML()
	}
}

module.exports = Person
