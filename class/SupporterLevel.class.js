const HTMLElement = require('extrajs-dom').HTMLElement
const View    = require('extrajs-view')

/**
 * A group of supporters with a similar level of support or donation.
 */
class SupporterLevel {
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
   * @summary Get the name of this supporter level.
   * @type {string}
   */
  get name() {
    return this._NAME
  }

  /**
   * @summary Set or get the sizing of this supporter level.
   * @description The sizing informs the size of the supporter logo in this supporter level.
   * @param   {SupporterLevel.LogoSize} size the sizing of this supporter level’s logos
   * @returns {(SupporterLevel|SupporterLevel.LogoSize)} this supporter level | the sizing
   */
  size(size) {
    if (arguments.length) {
      this._size = size
      return this
    } else return this._size
  }


  /**
   * @summary Render this supporter level in HTML.
   * @see SupporterLevel.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `SupporterLevel#view.supporterBlock()` - SupporterBlock component
     * @namespace SupporterLevel.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a `<section.c-SupporterBlock>` component containing the supporters that have this level.
       * @summary Call `SupporterLevel#view.supporterBlock()` to render this display.
       * @function SupporterLevel.VIEW.supporterBlock
       * @param  {Conference} $conference the conference from which to extract supporters having this as their level
       * @returns {string} HTML output
       */
      .addDisplay(function supporterBlock($conference) {
        return new HTMLElement('section').class('c-SupporterBlock')
          .addClass((this.size()) ? `c-SupporterBlock--${this.size()}` : '')
          .attr('data-instanceof','SupporterLevel')
          .addContent([
            new HTMLElement('h1').class('c-SupporterBlock__Hn').addContent(this.name),
            new HTMLElement('ul').class('o-List o-Flex c-SupporterBlock__List').addContent(
              $conference.getSupportersAll()
                .filter(($supporter) => $supporter.level===this.name)
                .map(($supporter) =>
                  new HTMLElement('li').class('o-List__Item o-Flex__Item c-SupporterBlock__List__Item')
                    .attr({ itemprop:'sponsor', itemscope:'', itemtype:'http://schema.org/Organization' })
                    .addContent($supporter.view())
                )
            ),
          ])
          .html()
      })
  }
}



/**
 * @summary Enum for supporter level logo sizes.
 * @enum {string}
 */
SupporterLevel.LogoSize = {
  /** Logo size for top-level supporters. */ LARGE : 'lrg',
  /** Logo size for mid-level supporters. */ MEDIUM: 'med',
  /** Logo size for low-level supporters. */ SMALL : 'sml',
}

module.exports = SupporterLevel
