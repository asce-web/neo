const Element = require('extrajs-element')

module.exports = class SupporterLevel {
  /**
   * A group of supporters with a similar level of support or donation.
   * Assigned at the site level, not at an individual conference.
   * Construct a SupporterLevel object, given an (immutable) name.
   * @constructor
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
   * @return {string} HTML output
   */
  get view() {
    let self = this
    /**
     * Default display. Takes no arguments.
     * Throw an error: must call an explicit display.
     * Call `SupporterLevel#view()` to render this display.
     * @return {string} HTML output
     */
    function returned() {
      return (function () {
        throw new Error('Please select a display: `AttendeeType#view[display]()`.')
      }).call(self)
    }
    /**
     * Return a <section.c-SupporterBlock> component containing the supporters that have this level.
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
                    .addElements([
                      new Element('a').attr({ href:$supporter.url(), rel:'external nofollow', itemprop:'url' }).addElements([
                        new Element('img').class('c-SupporterBlock__Logo').attr({ src:$supporter.img(), alt:$supporter.name, itemprop:'logo' }),
                        new Element('meta').attr({ content:$supporter.name, itemprop:'name' }),
                      ]),
                    ])
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
