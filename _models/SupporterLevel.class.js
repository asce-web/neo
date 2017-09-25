const Element = require('extrajs-element')

/**
 * A group of supporters with a similar level of support or donation.
 * @module
 */
module.exports = class SupporterLevel {
  /**
   * Construct a new SupporterLevel object, given an (immutable) name.
   * @param {string} name the name of the level (e.g. 'Gold')
   * @param {SupporterLevel.LogoSize} size the sizing of this supporter level’s logos
   */
  constructor(name, size) {
    /** @private @final */ this._NAME = name
    /** @private */ this._size = size
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
   * @param  {SupporterLevel.LogoSize} size the sizing of this supporter level’s logos
   * @return {(SupporterLevel|SupporterLevel.LogoSize)} this supporter level | the sizing
   */
  size(size) {
    if (arguments.length) {
      this._size = size
      return this
    } else return this._size
  }


  /**
   * Render this supporter level in HTML.
   * Displays:
   * - `SupporterLevel#view()` - default display
   * - `SupporterLevel#view.supporterBlock()` - SupporterBlock component
   * @returns {function(?):string} a function returning HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Call `SupporterLevel#view()` to render this display.
     * @return {string} HTML output
     * @throws {Error} if no display has been chosen
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `SupporterLevel#view[display]()`.')
      }).call(self)
    }
    /**
     * Return a <section.c-SupporterBlock> component containing the supporters that have this level.
     * Call `SupporterLevel#view.supporterBlock()` to render this display.
     * @param  {Conference} $conference the conference from which to extract supporters having this as their level
     * @return {string} HTML output
     */
    returned.supporterBlock = function ($conference) {
      return (function () {
        return new Element('section').class('c-SupporterBlock')
          .addClass((this.size()) ? `c-SupporterBlock--${this.size()}` : '')
          .addElements([
            new Element('h1').class('c-SupporterBlock__Hn').addContent(this.name),
            new Element('ul').class('o-List o-Flex c-SupporterBlock__List').addElements(
              $conference.getSupportersAll()
                .filter(($supporter) => $supporter.level()===this.name)
                .map(($supporter) =>
                  new Element('li').class('o-List__Item o-Flex__Item c-SupporterBlock__List__Item')
                    .attr({ itemprop:'sponsor', itemscope:'', itemtype:'https://schema.org/Organization' })
                    .addContent($supporter.view.supporterBlock())
                )
            ),
          ])
          .html()
      }).call(self)
    }
    return returned
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
    }
  }
}
