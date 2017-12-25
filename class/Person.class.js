const xjs = require('extrajs')
const HTMLElement = require('extrajs-dom').HTMLElement
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
   * @param {!Object=} jsondata.$name if string param `name` is not used, required; an object containing the following:
   * @param {string} jsondata.$name.givenName the person’s first name
   * @param {string} jsondata.$name.familyName the person’s last name
   * @param {string=} jsondata.$name.additionalName  the person’s middle name or initial
   * @param {string=} jsondata.$name.honorificPrefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string=} jsondata.$name.honorificSuffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   * @param {string=} jsondata.image the url to a headshot image of this person
   * @param {string=} jsondata.url the url to this person’s homepage or website
   * @param {string=} jsondata.email this person’s email address
   * @param {string=} jsondata.telephone this person’s telephone number
   * @param {string=} jsondata.jobTitle this person’s job title
   * @param {!Object=} jsondata.affiliation an organization that this person is affiliated with; type {@link http://schema.org/Organization}
   * @param {string=} jsondata.affiliation.name an organization that this person is affiliated with
   * @param {boolean=} jsondata.$starred whether this person is starred
   *                                     TODO: use Entity Queues instead!
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
     * @type {?Object}
     */
    this._$NAME = jsondata.$name || null

    /** @private */ this._social      = {}
    /** @private */ this._is_starred  = false
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
   * @type {(string|!Object)}
   */
  get name() {
    return this._NAME || this._$NAME || {}
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
   * @summary Whether this person is starred.
   * @todo TODO: use Entity Queues instead!
   * @type {boolean}
   */
  isStarred() {
    return this._DATA.$starred
  }





  /**
   * @summary Add a social network profile to this person.
   * @param   {!Object} jsonurl data
   * @param   {string} jsonurl.name the name of the social network
   * @param   {string} jsonurl.url the URL of this person’s profile on the network
   * @param   {string=} jsonurl.description optional advisory text
   * @returns {Person} this person
   */
  addSocial(jsonurl) {
    this._social[jsonurl.name] = { url: jsonurl.url, text: jsonurl.description }
    return this
  }
  /**
   * @summary Retrieve a social network profile of this person.
   * @param   {string} network_name the name of the social network
   * @returns {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * @summary Return an object representing all social network profiles of this person.
   * @returns {Object} shallow clone of this person’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social)
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
        return new HTMLElement('span').attr('itemprop','name')
          .addContent((xjs.Object.typeOf(this.name) === 'object') ? [
            new HTMLElement('span').attr('itemprop','givenName').addContent(this.name.givenName),
            ` `,
            new HTMLElement('span').attr('itemprop','additionalName').addContent(this.name.additionalName),
            ` `,
            new HTMLElement('span').attr('itemprop','familiyName').addContent(this.name.familyName),
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
        /* filler placeholder */ function pug(strings, ...exprs) { return strings.join('') }
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
          new HTMLElement('footer').class('c-Speaker__Foot').addContent(pug`
            include ../_views/_c-SocialList.view.pug
            +socialList(${this.getSocialAll()}).c-SocialList--speaker
              if ${this.email}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--email.h-Block(href="mailto:${this.email}" itemprop="email")
                    span.h-Hidden send email
                    //- i.material-icons(role="none") email
              if ${this.telephone}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--phone.h-Block(href="tel:${Util.toURL(this.telephone)}" itemprop="telephone")
                    span.h-Hidden call
                    //- i.material-icons(role="none") phone
              if ${this.url}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--explore.h-Block(href="${this.url}" title="visit homepage" itemprop="url")
                    span.h-Hidden visit homepage
                    //- i.material-icons(role="none") explore
          `),
        ])
        .html()
      })
  }
}

module.exports = Person
