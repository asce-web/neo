var Util = require('./Util.class.js')

module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A person.
   * Can be used for any role on the suite.
   * Constructs a Person object.
   * @constructor
   * @param {string} id a unique identifier of the person
   * @param {Object} $name an object containing the following:
   * @param {string} $name.honorific_prefix a prefix, if any (e.g. 'Mr.', 'Ms.', 'Dr.')
   * @param {string} $name.given_name the person’s first name
   * @param {string} $name.additional_name  the person’s middle name or initial
   * @param {string} $name.family_name the person’s last name
   * @param {string} $name.honorific_suffix the suffix, if any (e.g. 'M.D.', 'P.ASCE')
   */
  function Person(id, $name) {
    var self = this
    $name = $name || {} // NOTE constructor overloading
    self._ID   = id
    self._NAME = {
      honorific_prefix: $name.honorific_prefix
    , given_name      : $name.given_name
    , additional_name : $name.additional_name
    , family_name     : $name.family_name
    , honorific_suffix: $name.honorific_suffix
    }
    self._jobTitle    = ''
    self._affiliation = ''
    self._img         = ''
    self._email       = ''
    self._telephone   = ''
    self._url         = ''
    self._social      = {}
    self._is_starred  = false
  }

  // ACCESSOR FUNCTIONS
  /**
   * Get the id of this person.
   * @return {string} the unique id of this person
   */
  Person.prototype.id = function id() {
    return this._ID
  }

  /**
   * Get the name object of this person.
   * @return {Object} a shallow object representing this person’s name
   */
  Person.prototype.name = function name() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._NAME)
  }

  /**
   * Set or get this person’s job title.
   * @param  {string=} text the job title
   * @return {(Person|string)} this person || the job title
   */
  Person.prototype.jobTitle = function jobTitle(text) {
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
  Person.prototype.affiliation = function affiliation(text) {
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
  Person.prototype.img = function img(url) {
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
  Person.prototype.email = function email(text) {
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
  Person.prototype.phone = function phone(text) {
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
  Person.prototype.url = function url(text) {
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
  Person.prototype.addSocial = function addSocial(network_name, url, text) {
    this._social[network_name] = { url: url, text: text }
    return this
  }
  /**
   * Retrieve a social network profile of this person.
   * @param  {string} network_name the name of the social network
   * @return {Object} an object representing the social network profile
   */
  Person.prototype.getSocial = function getSocial(network_name) {
    return this._social[network_name]
  }
  /**
   * Remove a social network profile from this person.
   * @param  {string} network_name the name of the social network
   * @return {Person} this person
   */
  Person.prototype.removeSocial = function removeSocial(network_name) {
    this._social[network_name] = null
    return this
  }
  /**
   * Return an object representing all social network profiles of this person.
   * @return {Object} shallow clone of this person’s social object
   */
  Person.prototype.getSocialAll = function getSocialAll() {
    //- NOTE returns shallow clone (like arr.slice())
    return Object.assign({}, this._social) // shallow clone this.social into {}
  }

  /**
   * Mark this person as starred.
   * @param  {boolean=true} bool if true, mark as starred
   * @return {Person} this person
   */
  Person.prototype.star = function star(bool) {
    this._is_starred = (arguments.length) ? bool : true
    return this
  }
  /**
   * Get the starred status of this person.
   * @return {boolean} whether this person is starred
   */
  Person.prototype.isStarred = function isStarred() {
    return this._is_starred
  }

  // METHODS
  /**
   * Return a string representing this person’s full name.
   * The full name consists of:
   *  - first name
   *  - middle name/initial
   *  - last name
   * REVIEW: this is not needed
   * @return {string} a string representing this person’s full name
   */
  Person.prototype.printFullName = function printFullName() {
    var returned = ''
    returned += this.name.givenName
    returned += ' ' + this.name.additionalName
    returned += ' ' + this.name.familyName
    return returned
  }

  /**
   * Return a string representing this person’s entire name.
   * The entire name is the full name along with prefix and suffix.
   * REVIEW: this is not needed
   * @return {string} a string representing this person’s entire name
   */
  Person.prototype.printEntireName = function printEntireName() {
    var returned = ''
    if (this.name.honorificPrefix) returned += this.name.honorificPrefix + ' '
    returned += this.printFullName()
    if (this.name.honorificSuffix) returned += ', ' + this.name.honorificSuffix
    return returned
  }

  return Person
})()
