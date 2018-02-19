const xjs = require('extrajs')
const HTMLElement = require('extrajs-dom').HTMLElement
const HTMLUListElement = require('extrajs-dom').HTMLUListElement
const HTMLLIElement = require('extrajs-dom').HTMLLIElement
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
     * The string name of this person.
     * @private
     * @final
     * @type {string}
     */
    this._NAME = jsondata.name || ''
    /**
     * The object name of this person.
     * @private
     * @final
     * @type {!Object}
     */
    this._$NAME = {
      givenName      : jsondata.givenName       || '',
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
   * @type {(string|!Object)}
   */
  get name() {
    return this._NAME || this._$NAME
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
     * Return this person’s name in "First Last" format.
     * @summary Call `Person#view()` to render this display.
     * @function Person.VIEW.default
     * @returns {string} HTML output
     */
    return new View(function () {
        return ``
      return new HTMLElement('span').attr('itemprop','name')
        .addContent((xjs.Object.typeOf(this.name) === 'object') ? [
          new HTMLElement('span').attr('itemprop','givenName').addContent(this.name.givenName),
          ` `,
          new HTMLElement('span').attr('itemprop','familiyName').addContent(this.name.familyName),
        ] : this.name)
        .html()
    }, this)
      /**
       * Return this person’s name in "First Middle Last" format.
       * @summary Call `Person#view.fullName()` to render this display.
       * @function Person.VIEW.fullName
       * @returns {string} HTML output
       */
      .addDisplay(function fullName() {
        return ``
        return new HTMLElement('span').attr('itemprop','name')
          .addContent((xjs.Object.typeOf(this.name) === 'object') ? [
            new HTMLElement('span').attr('itemprop','givenName').addContent(this.name.givenName),
            ` `,
            new HTMLElement('span').attr('itemprop','additionalName').addContent(this.name.additionalName),
            ` `,
            new HTMLElement('span').attr('itemprop','familyName').addContent(this.name.familyName),
          ] : this.name)
          .html()
      })
      /**
       * Return this person’s name in "Px. First Middle Last, Sx." format.
       * @summary Call `Person#view.entireName()` to render this display.
       * @function Person.VIEW.entireName
       * @returns {string} HTML output
       */
      .addDisplay(function entireName() {
        return ``
        let returned = this.view.fullName()
        if (this.name.honorificPrefix) returned = `${new HTMLElement('span').attr('itemprop','honorificPrefix').addContent(this.name.honorificPrefix).html()} ${returned}`
        if (this.name.honorificSuffix) returned = `${returned}, ${new HTMLElement('span').attr('itemprop','honorificSuffix').addContent(this.name.honorificSuffix).html()}`
        return returned
      })
      /**
       * Return this person’s name in "First Middle Last, Affiliation" format.
       * @summary Call `Person#view.affiliation()` to render this display.
       * @function Person.VIEW.affiliation
       * @returns {string} HTML output
       */
      .addDisplay(function affiliation() {
        return ``
        return Util.documentFragment([
          this.view.entireName(),
          `, `,
          new HTMLElement('span').class('-fs-t')
            .attr({ itemprop: 'affiliation', itemscope: '', itemtype: 'http://schema.org/Organization' })
            .addContent(new HTMLElement('span').attr('itemprop','name').addContent(this.affiliation)),
        ])
      })
      /**
       * Return this person’s name in "First Last, Director of ... | 555-555-5555" format.
       * @summary Call `Person#view.contact()` to render this display.
       * @function Person.VIEW.contact
       * @returns {string} HTML output
       */
      .addDisplay(function contact() {
        return ``
        let returned = new HTMLElement('a')
          .attr('href',`mailto:${this.email}`)
          .addContent(this.view())
          .html()
        if (this.jobTitle) returned = `${returned}, ${new HTMLElement('span').attr('itemprop','jobTitle').addContent(this.jobTitle).html()}`
        if (this.telephone) {
          returned = `${returned} | ${
            new HTMLElement('a')
              .attr('href',`tel:${Util.toURL(this.telephone)}`)
              .attr('itemprop','telephone')
              .addContent(this.telephone)
              .html()
          }`
        }
        return returned
      })
      /**
       * Return an `<article.c-Speaker>` component marking up this person’s info.
       * @summary Call `Person#view.speaker()` to render this display.
       * @function Person.VIEW.speaker
       * @returns {string} HTML output
       */
      .addDisplay(function speaker() {
        return ``
        return new HTMLElement('article').class('c-Speaker').attr({
          'data-instanceof': 'Person',
          itemprop : 'performer',
          itemscope: '',
          itemtype : 'http://schema.org/Person',
        }).addContent([
          new HTMLElement('img').class('c-Speaker__Img h-Block')
            .attr('src', this.image)
            .attr('itemprop','image'),
          new HTMLElement('header').class('c-Speaker__Head').addContent([
            new HTMLElement('h1').class('c-Speaker__Name')
              .id(this.id)
              .addContent(this.view.entireName()),
            new HTMLElement('p').class('c-Speaker__JobTitle')
              .attr('itemprop','jobTitle')
              .addContent(this.jobTitle),
            new HTMLElement('p').class('c-Speaker__Affiliation').attr({
              itemprop : 'affiliation',
              itemscope: '',
              itemtype : 'http://schema.org/Organization',
            }).addContent(new HTMLElement('span').attr('itemprop','name').addContent(this.affiliation)),
          ]),
          // new HTMLElement('div').class('c-Speaker__Body').attr('itemprop','description'),
          new HTMLElement('footer').class('c-Speaker__Foot').addContent([
            Util.view(this.getSocialAll()).socialList('c-SocialList--speaker'),
            new HTMLUListElement().class('o-List o-Flex c-SocialList').addClass('c-SocialList--speaker')
              .addContent(['email', 'telephone', 'url'].map(function (prop) {
                if (!this[prop]) return null
                let data = ({
                  url      : { icon: 'explore', url: this.url                           , text: 'visit homepage' },
                  email    : { icon: 'email'  , url: `mailto:${this.email}`             , text: 'send email' },
                  telephone: { icon: 'phone'  , url: `tel:${Util.toURL(this.telephone)}`, text: 'call' },
                })[prop]
                return new HTMLLIElement().class('o-List__Item o-Flex__Item c-SocialList__Item').addContent(
                  new HTMLElement('a').class('c-SocialList__Link h-Block')
                    .addClass(`c-SocialList__Link--${data.icon}`)
                    .attr({ href: data.url, itemprop: prop })
                    .addContent([
                      // new HTMLElement('i').class('material-icons').attr('aria-hidden', true).addContent(data.icon),
                      new HTMLElement('span').class('h-Hidden').addContent(data.text),
                    ])
                )
              }, this)),
          ]),
        ])
        .html()
      })
  }
}

module.exports = Person
