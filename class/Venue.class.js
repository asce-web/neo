const Element = require('extrajs-dom').Element
const HTMLElement = require('extrajs-dom').HTMLElement
const View    = require('extrajs-view')
const Place = require('./Place.class.js')

/**
 * A building location and address related to the conference.
 * Mostly used for hotels & conference centers.
 * @extends Place
 */
class Venue extends Place {
  /**
   * Construct a new Venue object.
   * @param {!Object} jsondata a JSON object that validates against some schema?
   * @param {string} jsondata.description (required) the label or title for the venue
   * @param {!Object=} jsondata.$cta a call-to-action link with a url and text
   * @param {string=} jsondata.$cta.url the url of the call-to-action
   * @param {string=} jsondata.$cta.text the text of the call-to-action
   */
  constructor(jsondata) {
    super(jsondata)
  }

  /**
   * @summary The label or title of this venue.
   * @type {string}
   */
  get label() {
    return super.description
  }


  /**
   * @summary Render this place in HTML.
   * @see Venue.VIEW
   * @type {View}
   */
  get view() {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Venue#view.venue()` - a venue address
     * @namespace Venue.VIEW
     * @type {View}
     */
    return new View(null, this)
      /**
       * Return a DOM snippet marking up this place’s address.
       * @summary Call `Venue#view.venue()` to render this display.
       * @function Venue.VIEW.venue
       * @returns {string} HTML output
       */
      .addDisplay(function venue() {
        return ``
        let name = new HTMLElement('b').class('h-Clearfix').attr('itemprop','name').addContent(this.name)
        if (this.url) {
          name = new HTMLElement('a').attr({
            href: this.url,
            itemprop: 'url',
          }).addContent(name)
        }
        return Element.concat([
          name,
          new HTMLElement('span')
            .attr({
              itemprop : 'address',
              itemscope: '',
              itemtype : 'http://schema.org/PostalAddress',
            })
            .addContent([
              new HTMLElement('span').class('h-Clearfix').attrStr('itemprop="streetAddress"').addContent(this.streetAddress),
              new HTMLElement('span').attrStr('itemprop="addressLocality"').addContent(this.addressLocality),
              `, `,
              new HTMLElement('span').attrStr('itemprop="addressRegion"').addContent(this.addressRegion),
              ` `,
              new HTMLElement('span').class('h-Clearfix').attrStr('itemprop="postalCode"').addContent(this.postalCode),
              (this.addressCountry) ? new HTMLElement('span').class('h-Clearfix').attrStr('itemprop="addressCountry"').addContent(this.addressCountry) : null,
            ]),
          (this.telephone) ? new HTMLElement('a').attr('href',`tel:${this.telephone}`).attr('itemprop','telephone').addContent(this.telephone) : null,
        ])
      })
  }
}

module.exports = Venue
