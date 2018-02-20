const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const View    = require('extrajs-view')
const Util    = require('./Util.class.js')

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
   * @param {Array<!Object>=} jsondata.sameAs a list of social media links for this person; type {@link http://schema.org/URL}
   * @param {string} jsondata.sameAs.name the name or identifier of the social media service (used for icons)
   * @param {string} jsondata.sameAs.url the URL of the person’s social media profile or page
   * @param {string=} jsondata.sameAs.description short alternative text for non-visual media
   */
  constructor(jsondata) {
    /**
     * All the data for this person.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata

    /**
     * The object name of this person.
     * @private
     * @final
     * @type {!Object}
     */
    this._NAME = {
      givenName      : jsondata.givenName       || jsondata.name || '',
      familyName     : jsondata.familyName      || '',
      additionalName : jsondata.additionalName  || '',
      honorificPrefix: jsondata.honorificPrefix || '',
      honorificSuffix: jsondata.honorificSuffix || '',
    }
  }

  /**
   * @summary The id of this person.
   * @type {string}
   */
  get id() {
    return this._DATA.identifier
  }

  /**
   * @summary The string name of this person if it exists; else the object name of this person.
   * @todo TODO `get name()` should inherit from `Thing`, and make this `get $name()` a new method
   * @type {!Object}
   */
  get name() {
    return this._NAME
  }

  /**
   * @summary This person’s headshot image.
   * @type {string}
   */
  get image() {
    return this._DATA.image || ''
  }

  /**
   * @summary This person’s homepage or website.
   * @type {string}
   */
  get url() {
    return this._DATA.url || ''
  }

  /**
   * @summary This person’s email address.
   * @type {string}
   */
  get email() {
    return this._DATA.email || ''
  }

  /**
   * @summary This person’s telephone number.
   * @type {string}
   */
  get telephone() {
    return this._DATA.telephone || ''
  }


  /**
   * @summary This person’s job title.
   * @type {string}
   */
  get jobTitle() {
    return this._DATA.jobTitle || ''
  }

  /**
   * @summary The name of this person’s affiliation.
   * @type {string}
   */
  get affiliation() {
    return this._DATA.affiliation && this._DATA.affiliation.name || ''
  }

  /**
   * @summary Retrieve a social network profile of this person.
   * @param   {string} name the name of the social network
   * @returns {?Object} an object representing the social network profile
   */
  getSocial(name) {
    return this.getSocialAll().find((url) => url.name===name) || null
  }
  /**
   * @summary Return all social network profiles of this person.
   * @todo TODO turn this into a getter
   * @returns {Array<!Object>} all this person’s social media networks
   */
  getSocialAll() {
    return (this._DATA.sameAs || []).map((url) => url)
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
      return new xjs.DocumentFragment(Person.TEMPLATES.xPersonFullname.render(this.name)).innerHTML()
    }, this)
      /**
       * Return this person’s name in "FullName, Affiliation" format.
       * @summary Call `Person#view.affiliation()` to render this display.
       * @function Person.VIEW.affiliation
       * @returns {string} HTML output
       */
      .addDisplay(function affiliation() {
        return `${this.view()},
<span class="-fs-t" itemprop="affiliation" itemscope="" itemtype="http://schema.org/Organization">
  <slot itemprop="name">${this.affiliation}</slot>
</span>
        `
      })
      /**
       * Return this person’s name in "FullName, Director of ... | 555-555-5555" format.
       * @summary Call `Person#view.contact()` to render this display.
       * @function Person.VIEW.contact
       * @returns {string} HTML output
       */
      .addDisplay(function contact() {
        let returned = `<a href="mailto:${this.email}">${this.view()}</a>`
        if (this.jobTitle ) returned = `${returned}, <slot itemprop="jobTitle">${this.jobTitle}</slot>`
        if (this.telephone) returned = `${returned} | <a href="tel:${Util.toURL(this.telephone)}" itemprop="telephone">${this.telephone}</a>`
        return returned
      })
      /**
       * Return an `<article.c-Speaker>` component marking up this person’s info.
       * @summary Call `Person#view.speaker()` to render this display.
       * @function Person.VIEW.speaker
       * @returns {string} HTML output
       */
      .addDisplay(function speaker() {
        return new xjs.DocumentFragment(Person.TEMPLATES.xSpeaker.render(this._DATA)).innerHTML()
      })
  }
}

Person.TEMPLATES = {
  /**
   * @summary A person’s name in "Px. First Middle Last, Sx." format.
   * @see xPersonFullname
   * @type {xjs.HTMLTemplateElement}
   */
  xPersonFullname: xjs.HTMLTemplateElement
    .fromFileSync(path.join(__dirname, '../tpl/x-person-fullname.tpl.html'))
    .setRenderer(require('../tpl/x-person-fullname.tpl.js')),
  /**
   * @summary An `<article.c-Speaker>` component marking up a person’s speaker information.
   * @see xSpeaker
   * @type {xjs.HTMLTemplateElement}
   */
  xSpeaker: xjs.HTMLTemplateElement
    .fromFileSync(path.join(__dirname, '../tpl/x-speaker.tpl.html'))
    .setRenderer(require('../tpl/x-speaker.tpl.js')),
}

module.exports = Person
