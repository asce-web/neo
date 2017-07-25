module.exports = class SupporterLevel {
  /**
   * A group of supporters with a similar level of support or donation.
   * Assigned at the site level, not at an individual conference.
   * Construct a SupporterLevel object, given an (immutable) name.
   * @constructor
   * @param {string} name the name of the level (e.g. 'Gold')
   */
  constructor(name) {
    /** @private @final */ this._NAME = name
    /** @private */ this._size = SupporterLevel.LogoSize.DEFAULT
  }

  /**
   * Get the name of this supporter level.
   * @return {string} the name of this supporter level
   */
  get name() {
    return this._NAME
  }

  /**
   * Set or get the sizing of this supporter level.
   * The sizing informs the size of the supporter logo in this supporter level.
   * @param  {SupporterLevel.LogoSize=} size the sizing of this supporter level’s logos
   * @return {(SupporterLevel|SupporterLevel.LogoSize)} this supporter level | the sizing
   */
  size(size = SupporterLevel.LogoSize.DEFAULT) {
    if (arguments.length) {
      this._size = size
      return this
    } else return this._size
  }

  /**
   * Enum for supporter level logo sizes.
   * @enum {string}
   */
  static get LogoSize() {
    return {
      /** Logo size for top-level supporters. */ LARGE : 'lrg',
      /** Logo size for mid-level supporters. */ MEDIUM: 'med',
      /** Logo size for low-level supporters. */ SMALL : 'sml',
      /** Default value. */                      get DEFAULT() { return this.LARGE },
    }
  }
}
