var Element = require('helpers-js').Element
var Util = require('./Util.class.js')

module.exports = class Person {
  /**
   * A person.
   * Can be used for any role on the suite.
   * Constructs a Person object.
   * @constructor
   * @param {string} id a unique identifier of the person
   * @param {Object=} $name an object containing the following:
   * @param {string} $name.honorific_prefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string} $name.given_name the person’s first name
   * @param {string} $name.additional_name  the person’s middle name or initial
   * @param {string} $name.family_name the person’s last name
   * @param {string} $name.honorific_suffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   */
  constructor(id, $name = {}) {
    /** @private @final */ this._ID   = id
    /** @private @final */ this._NAME = {
      honorific_prefix: $name.honorific_prefix,
      given_name      : $name.given_name,
      additional_name : $name.additional_name,
      family_name     : $name.family_name,
      honorific_suffix: $name.honorific_suffix,
    }
    /** @private */ this._jobTitle    = ''
    /** @private */ this._affiliation = ''
    /** @private */ this._img         = ''
    /** @private */ this._email       = ''
    /** @private */ this._telephone   = ''
    /** @private */ this._url         = ''
    /** @private */ this._social      = {}
    /** @private */ this._is_starred  = false
  }

  /**
   * Get the id of this person.
   * @return {string} the unique id of this person
   */
  get id() {
    return this._ID
  }

  /**
   * Get the name object of this person.
   * @return {Object} a shallow object representing this person’s name
   */
  get name() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._NAME)
  }

  /**
   * Set or get this person’s job title.
   * @param  {string=} text the job title
   * @return {(Person|string)} this person || the job title
   */
  jobTitle(text) {
    if (arguments.length) {
      this._jobTitle = text
      return this
    } else return this._jobTitle
  }

  /**
   * Set or get this person’s affiliation.
   * @param  {string=} text the affiliation
   * @return {(Person|string)} this person || the affiliation
   */
  affiliation(text) {
    if (arguments.length) {
      this._affiliation = text
      return this
    } else return this._affiliation
  }

  /**
   * Set or get this person’s headshot image.
   * @param  {string=} text the url pointing to the headshot image
   * @return {(Person|string)} this person || the headshot image url
   */
  img(url) {
    if (arguments.length) {
      this._img = url
      return this
    } else return this._img
  }

  /**
   * Set or get this person’s email address.
   * @param  {string=} text the email address
   * @return {(Person|string)} this person || the email address
   */
  email(text) {
    if (arguments.length) {
      this._email = text
      return this
    } else return this._email
  }

  /**
   * Set or get this person’s telephone number.
   * @param  {string=} text the telephone number
   * @return {(Person|string)} this person || the telephone number
   */
  phone(text) {
    if (arguments.length) {
      this._telephone = text
      return this
    } else return this._telephone
  }

  /**
   * Set or get this person’s homepage.
   * @param  {string=} text the homepage
   * @return {(Person|string)} this person || the homepage
   */
  url(text) {
    if (arguments.length) {
      this._url = text
      return this
    } else return this._url
  }

  /**
   * Add a social network profile to this person.
   * @param {string} network_name the name of the social network
   * @param {string} url the URL of this person’s profile on the network
   * @param {string=} text optional advisory text
   * @return {Person} this person
   */
  addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this person.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Return an object representing all social network profiles of this person.
   * @return {Object} shallow clone of this person’s social object
   */
  getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  /**
   * Mark this person as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Person} this person
   */
  star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this person.
   * @return {boolean} whether this person is starred
   */
  isStarred() {
    return this._is_starred
  }


  /**
   * Markup this person in HTML.
   * @param  {Person.Display=} display one of the output displays
   * @param  {*=} args display-specific arguments (see inner jsdoc)
   * @return {string} a string representing an HTML DOM snippet
   */
  view(display = Person.Display.NAME, ...args) {
    let returned = {
      /**
       * Return this person’s name in "First Last" format.
       * @return {string} HTML snippet representing this person
       */
      [Person.Display.NAME]: function () {
        return new Element('span').attr('itemprop','name')
          .addElements([new Element('span').attr('itemprop','givenName').addContent(this.name.given_name)])
          .addContent(` `)
          .addElements([new Element('span').attr('itemprop','familiyName').addContent(this.name.family_name)])
          .html()
      },
      /**
       * Return this person’s name in "First Middle Last" format.
       * @return {string} HTML snippet representing this person
       */
      [Person.Display.FULL_NAME]: function () {
        return new Element('span').attr('itemprop','name')
          .addElements([new Element('span').attr('itemprop','givenName').addContent(this.name.given_name)])
          .addContent(` `)
          .addElements([new Element('span').attr('itemprop','additionalName').addContent(this.name.additional_name)])
          .addContent(` `)
          .addElements([new Element('span').attr('itemprop','familiyName').addContent(this.name.family_name)])
          .html()
      },
      /**
       * Return this person’s name in "Px. First Middle Last, Sx." format.
       * @return {string} HTML snippet representing this person
       */
      [Person.Display.ENTIRE_NAME]: function () {
        let returned = this.view(Person.Display.FULL_NAME)
        if (this.name.honorific_prefix) {
          returned = `${
            new Element('span').attr('itemprop','honorificPrefix').addContent(this.name.honorific_prefix).html()
          } ${returned}`
        }
        if (this.name.honorific_suffix) {
          returned = `${returned}, ${
            new Element('span').attr('itemprop','honorificSuffix').addContent(this.name.honorific_suffix).html()
          }`
        }
        return returned
      },
      /**
       * Return this person’s name in "First Middle Last, Affiliation" format.
       * @return {string} HTML snippet representing this person
       */
      [Person.Display.AFFILIATION]: () => `${this.view(Person.Display.ENTIRE_NAME)}, ${
        new Element('span').class('-fs-t').attr({
          itemprop : 'affiliation',
          itemscope: '',
          itemtype : 'http://schema.org/Organization',
        }).addElements([
          new Element('span').attr('itemprop','name').addContent(this.affiliation())
        ]).html()
      }`,
      /**
       * Return this person’s name in "First Last, Director of ... | 555-555-5555" format.
       * @return {string} HTML snippet representing this person
       */
      [Person.Display.CONTACT]: function () {
        let returned = new Element('a')
          .attr('href',`mailto:${this.email()}`)
          .addContent(this.view(Person.Display.NAME))
          .html()
        if (this.jobTitle()) {
          returned = `${returned}, ${
            new Element('span').attr('itemprop','jobTitle').addContent(this.jobTitle()).html()
          }`
        }
        if (this.phone()) {
          returned = `${returned} | ${
            new Element('a')
              .attr('href',`tel:${this.phone()}`)
              .attr('itemprop','telephone')
              .addContent(this.phone())
              .html()
          }`
        }
        return returned
      },
      /**
       * Return a Speaker component.
       * @return {string} <article> element representing this person
       */
      [Person.Display.SPEAKER]: function () {
        /** filler placeholder */ function pug(strings, ...exprs) { return strings.join('') }
        return new Element('article').class('c-Speaker').attr({
          itemprop : 'performer',
          itemscope: '',
          itemtype : 'http://schema.org/Person',
        }).addElements([
          new Element('img').class('c-Speaker__Img h-Block')
            .attr('src', this.img())
            .attr('itemprop','image'),
          new Element('header').class('c-Speaker__Head').addElements([
            new Element('h1').class('c-Speaker__Name')
              .id(this.id)
              .addContent(this.view(Person.Display.ENTIRE_NAME)),
            new Element('p').class('c-Speaker__JobTitle')
              .attr('itemprop','jobTitle')
              .addContent(this.jobTitle()),
            new Element('p').class('c-Speaker__Affiliation').attr({
              itemprop : 'affiliation',
              itemscope: '',
              itemtype : 'http://schema.org/Organization',
            }).addElements([
              new Element('span').attr('itemprop','name').addContent(this.affiliation())
            ]),
          ]),
          // new Element('div').class('c-Speaker__Body').attr('itemprop','description'),
          new Element('footer').class('c-Speaker__Foot').addContent(pug`
            include ../_views/_c-SocialList.view.pug
            +socialList(${this.getSocialAll()}).c-SocialList--speaker
              if ${this.email()}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--email.h-Block(href="mailto:${this.email()}" title="${this.email()}" itemprop="email")
                    span.h-Hidden send email
                    //- i.material-icons(role="none") email
              if ${this.phone()}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--phone.h-Block(href="tel:${Util.toURL(this.phone())}" title="${this.phone()}" itemprop="telephone")
                    span.h-Hidden call
                    //- i.material-icons(role="none") phone
              if ${this.url()}
                li.o-List__Item.o-Flex__Item.c-SocialList__Item
                  a.c-SocialList__Link.c-SocialList__Link--explore.h-Block(href="${this.url()}" title="visit homepage" itemprop="url")
                    span.h-Hidden visit homepage
                    //- i.material-icons(role="none") explore
          `),
        ])
        .html()
      },
      default: function () {
        return this.view()
      },
    }
    return (returned[display] || returned.default).call(this, ...args)
  }

  /**
   * Enum for name formats.
   * @enum {string}
   */
  static get Display() {
    return {
      /** First Last */                                 NAME       : 'name',
      /** First Middle Last */                          FULL_NAME  : 'full',
      /** Px. First Middle Last, Sx. */                 ENTIRE_NAME: 'entire',
      /** First Middle Last, Affiliation */             AFFILIATION: 'affiliation',
      /** First Last, Director of ... | 555-555-5555 */ CONTACT    : 'contact',
      /** a speaker at a conference */                  SPEAKER    : 'speaker',
    }
  }
}
