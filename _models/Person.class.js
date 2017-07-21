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
    /** @private */ this._bio         = ''
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
   * Set a short, html-friendly biography (“bio”) for this person.
   * @param {string} html html-friendly content
   * @return {Person} this person
   */
  setBio(html) {
    this._bio = html
    return this
  }
  /**
   * Get the bio of this person.
   * @param  {boolean=} unescaped whether or not the returned string should be escaped
   * @return {string} the bio of this person
   */
  getBio(unescaped) {
    return ((unescaped) ? '<!-- warning: unescaped code -->' : '') + this._bio
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
   * Output this person’s name and other information as HTML.
   * NOTE: remember to wrap this output with an `[itemscope=""][itemtype="https://schema.org/Person"]`.
   * Also remember to unescape this code, or else you will get `&lt;`s and `&gt;`s.
   * @param  {Person.Format} format how to display the output
   * @return {string} a string representing an HTML DOM snippet
   */
  html(format) {
    switch (format) {
      case Person.Format.NAME:
        return `
          <span itemprop="name">
            <span itemprop="givenName">${this.name.given_name}</span>
            <span itemprop="familiyName">${this.name.family_name}</span>
          </span>
        `
        break;
      case Person.Format.FULL_NAME:
        return `
          <span itemprop="name">
            <span itemprop="givenName">${this.name.given_name}</span>
            <span itemprop="additionalName">${this.name.additional_name}</span>
            <span itemprop="familiyName">${this.name.family_name}</span>
          </span>
        `
        break;
      case Person.Format.ENTIRE_NAME:
        var output = this.html(Person.Format.FULL_NAME) // using `var` because `let` works poorly in `switch`
        if (this.name.honorific_prefix) {
          output = `<span itemprop="honorificPrefix">${this.name.honorific_prefix}</span> ${output}`
        }
        if (this.name.honorific_suffix) {
          output = `${output}, <span itemprop="honorificSuffix">${this.name.honorific_suffix}</span>`
        }
        return output
        break;
      case Person.Format.AFFILIATION:
        return `${this.html(Person.Format.ENTIRE_NAME)},
          <span class="-fs-t" itemprop="affiliation" itemscope="" itemtype="http://schema.org/Organization">
            <span itemprop="name">${this.affiliation()}</span>
          </span>
        `
        break;
      case Person.Format.CONTACT:
        var output = `
          <a href="mailto:${this.email()}">${this.html(Person.Format.NAME)}</a>
        `
        if (this.jobTitle()) {
          output = `${output}, <span itemprop="jobTitle">${this.jobTitle()}</span>`
        }
        if (this.phone()) {
          output = `${output} | <a href="tel:${this.phone()}" itemprop="telephone">${this.phone()}</a>`
        }
        return output
        break;
      default:
        return this.toString()
    }
  }

  /**
   * Enum for name formats.
   * @enum {String}
   */
  static get Format() {
    return {
      /** First Last */                                 NAME       : 'name',
      /** First Middle Last */                          FULL_NAME  : 'full',
      /** Px. First Middle Last, Sx. */                 ENTIRE_NAME: 'entire',
      /** First Middle Last, Affiliation */             AFFILIATION: 'affiliation',
      /** First Last, Director of ... | 555-555-5555 */ CONTACT    : 'contact',
    }
  }
}
