const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View    = require('extrajs-view')
const {xPersonFullname} = require('aria-patterns')

const xPersonContact = require('../tpl/x-person-contact.tpl.js')


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
   * @param {string} jsondata.identifier a unique identifier of this person
   * @param {string=} jsondata.name the string name of this person
   * @param {string} jsondata.givenName the person’s first name
   * @param {string} jsondata.familyName the person’s last name
   * @param {string=} jsondata.additionalName  the person’s middle name or initial
   * @param {string=} jsondata.honorificPrefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string=} jsondata.honorificSuffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   * @param {string=} jsondata.image the url to a headshot image of this person
   * @param {string=} jsondata.url the url to this person’s homepage or website
   * @param {string=} jsondata.email this person’s email address
   * @param {string=} jsondata.telephone this person’s telephone number
   * @param {string=} jsondata.jobTitle this person’s job title
   * @param {!Object=} jsondata.affiliation an organization that this person is affiliated with; type {@link http://schema.org/Organization}
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
   * @summary Render this person in HTML.
   * @see Person.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Person#view()`             - default display - “First Last”
     * - `Person#view.fullName()`    - “First Middle Last”
     * - `Person#view.entireName()`  - “Px. First Middle Last, Sx.”
     * - `Person#view.affiliation()` - “First Middle Last, Affiliation”
     * - `Person#view.contact()`     - “First Last, Director of ... | 555-555-5555”
     * - `Person#view.speaker()`     - Speaker Component
     * @namespace Person.VIEW
     * @type {View}
     */
    /**
     * Default display. Takes no arguments.
     * Return this person’s name in "Px. First Middle Last, Sx." format.
     * @summary Call `Person#view()` to render this display.
     * @function Person.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
      return new xjs.DocumentFragment(xPersonFullname.render(this.name)).innerHTML()
    }, this)
      /**
       * Return this person’s name in "FullName, Director of ... | 555-555-5555" format.
       * @summary Call `Person#view.contact()` to render this display.
       * @function Person.VIEW.contact
       * @returns {string} HTML output
       */
      .addDisplay(function contact() {
        return new xjs.DocumentFragment(xPersonContact.render(this._DATA)).innerHTML()
      })
  }
}

module.exports = Person
