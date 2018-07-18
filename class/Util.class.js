const fs = require('fs')
const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View    = require('extrajs-view')

const xDirectory          = require('../tpl/x-directory.tpl.js')
const xPass = require('../tpl/x-pass.tpl.js')
const xRegistrationicon = require('../tpl/x-registrationicon.tpl.js')
const xVenue = require('../tpl/x-venue.tpl.js')


/**
 * A set of static values and functions used site-wide.
 * @namespace
 */
class Util {
  /** @private */ constructor() {}


  /**
   * NOTE: TYPE DEFINITION
   * ```json
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "Util.Icon",
   *   "type": "object",
   *   "additionalProperties": false,
   *   "required": ["content", "fallback", "html"],
   *   "properties": {
   *     "content" : { "type": "string", "description": "the keyword used for the ligature" },
   *     "fallback": { "type": "string", "description": "unicode code point" },
   *     "html"    : { "type": "string", "description": "html entity" }
   *   }
   * }
   * ```
   * @typedef  {Object} Util.Icon
   * @property {string} content  - the keyword used for the ligature
   * @property {string} fallback - unicode code point
   * @property {string} html     - html entity
   */

  /**
   * @summary List of icon objects used in Conf styles.
   * @type {Array<Util.Icon>}
   */
  static get ICON_DATA() {
    return [
      { content: 'home'              , fallback: '\uE88A', html: '&#xE88A;' }, // Home page
      { content: 'shopping_cart'     , fallback: '\uE8CC', html: '&#xE8CC;' }, // Registration page
      { content: 'event'             , fallback: '\uE878', html: '&#xE878;' }, // Program page
      { content: 'flight'            , fallback: '\uE539', html: '&#xE539;' }, // Location page
      { content: 'account_box'       , fallback: '\uE851', html: '&#xE851;' }, // Speakers page
      { content: 'people'            , fallback: '\uE7FB', html: '&#xE7FB;' }, // Sponsor page
      { content: 'work'              , fallback: '\uE8F9', html: '&#xE8F9;' }, // Exhibit page
      { content: 'info_outline'      , fallback: '\uE88F', html: '&#xE88F;' }, // About page
      { content: 'email'             , fallback: '\uE0BE', html: '&#xE0BE;' }, // Contact page / social list icon email
      { content: 'stars'             , fallback: '\uE8D0', html: '&#xE8D0;' }, // Early Bird registration period icon
      { content: 'date_range'        , fallback: '\uE916', html: '&#xE916;' }, // Advance registration period icon
      { content: 'account_balance'   , fallback: '\uE84F', html: '&#xE84F;' }, // Onsite registration period icon
      { content: 'insert_drive_file' , fallback: '\uE24D', html: '&#xE24D;' }, // generic page file (only used in Docs)
      { content: 'arrow_upward'      , fallback: '\uE5D8', html: '&#xE5D8;' }, // "return to top" button
      { content: 'phone'             , fallback: '\uE0CD', html: '&#xE0CD;' }, // social list icon phone
      { content: 'phone_iphone'      , fallback: '\uE325', html: '&#xE325;' }, // social list icon phone / mobile app callout
      { content: 'explore'           , fallback: '\uE87A', html: '&#xE87A;' }, // social list icon homepage
      { content: 'expand_more'       , fallback: '\uE5CF', html: '&#xE5CF;' }, // main menu drop-down
    ]
  }

  /**
   * @summary Data for social media networks.
   * @type {Object<{name:string, icon:Util.Icon}>}
   */
  static get SOCIAL_DATA() {
    return {
      twitter: {
        name: 'Twitter',
        icon: Util.ICON_DATA[-1],
        // toURL: (handle = '') => `https://twitter.com/${(handle)}`,
      },
      facebook: {
        name: 'Faceboook',
        icon: Util.ICON_DATA[-1],
      },
      google: {
        name: 'Google+',
        icon: Util.ICON_DATA[-1],
      },
      linkedin: {
        name: 'LinkedIn',
        icon: Util.ICON_DATA[-1],
      },
      youtube: {
        name: 'YouTube',
        icon: Util.ICON_DATA[-1],
      },
    }
  }

  /**
   * @summary Render any data in HTML.
   * @see Util.VIEW
   * @param   {*} data any data to render
   * @returns {View}
   */
  static view(data) {
    /**
     * @summary This view object is a set of functions returning HTML output.
     * @description Available displays:
     * - `Util.view(data).pageLink()` - link to a page in a document outline / t.o.c.
     * - `Util.view(data).pageToc()` - a document outline / t.o.c. of a page
     * - `Util.view(data).highlightButtons()` - list of buttons for a HCB
     * - `Util.view(data).dateblock()` - .c-DateBlock component
     * - `Util.view(data).timeblock()` - .c-TimeBlock component
     * - `Util.view(data).registrationLegend()` - Legend (list) of registration periods
     * - `Util.view(data).pass()` - .c-Pass component
     * - `Util.view(data).speaker()` - .c-Speaker component
     * @namespace Util.VIEW
     * @type {View}
     */
    return new View(null, data)
      /**
       * Return a Page object’s document outline as a nested ordered list.
       * Parameter `data` should be of type `Page`.
       * @summary Call `Util.view(data).pageToc()` to render this display.
       * @function Util.VIEW.pageToc
       * @param   {!Object=} options options for configuring output
       * @param   {number=} options.depth a non-negative integer, or `Infinity`: how many levels deep the outline should be
       * @param   {integer=} options.start which subpage to start at
       * @param   {integer=} options.end which subpage to end at
       * @param   {?Object<string>=} options.classes group set of css class configurations
       * @param   {string=} options.classes.list list classes (`<ol>`)
       * @param   {string=} options.classes.item item classes (`<li>`)
       * @param   {!Object=} options.links configuration param to send into {@link Util.VIEW.pageLink|Util#view.pageLink()}
       * @param   {!Object=} options.options configurations for nested outlines; specs identical to `options`
       * @returns {string} HTML output
       */
      .addDisplay(function pageToc(options = {}) {
        return new xjs.DocumentFragment(xDirectory.render({
          ...this,
          hasPart: this.findAll().filter((p) => !p.isHidden()),
        }, null, {
          depth  : options.depth || Infinity,
          start  : options.start || 0,
          end    : options.end   || Infinity,
          classes: options.classes || {},
          links  : options.links,
          options: options.options,
        })).innerHTML()
      })
      /**
       * Return a snippet marking up a promoted location.
       * Parameter `data` should be of type `{@link http://schema.org/PostalAddress|sdo.PostalAddress}`.
       * @summary Call `Util.view(data).promoLoc()` to render this display.
       * @function Util.VIEW.promoLoc
       * @returns {string} HTML output
       */
      .addDisplay(function promoLoc() {
        const {xAddress} = require('aria-patterns')
        return new xjs.DocumentFragment(xAddress.render({
          ...this,
          $regionName: true,
        })).trimInner().textContent()
      })
      /**
       * Return an unordered list of button links for a highlighted content block.
       * Parameter `data` should be of type `Array<sdo.WebPageElement>`, i.e., a list of links.
       * @summary Call `Util.view(data).highlightButtons()` to render this display.
       * @function Util.VIEW.highlightButtons
       * @param   {string=} buttonclasses the classes to add to the buttons
       * @returns {string} HTML output
       */
      .addDisplay(function highlightButtons(buttonclasses = '') {
        const xListHighlightbuttons = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item o-Flex__Item')
              .innerHTML(`<a class="c-Button c-Button--hilite {{ buttonclasses }}" href="{{ url }}">{{ text }}</a>`)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLAnchorElement(f.querySelector('a'))
                .replaceClassString('{{ buttonclasses }}', o.buttonclasses)
                .href       (d.url  || '#1')
                .textContent(d.text || ''  )
            }, null, { buttonclasses: opts.buttonclasses })
          })
        return new xjs.DocumentFragment(xListHighlightbuttons.render(this, null, { buttonclasses })).innerHTML()
      })
      /**
       * Return a `<ul.c-Alert>` component containing the legend of registration periods.
       * Parameter `data` should be of type `Array<{@link http://schema.org/AggregateOffer|sdo.AggregateOffer}>`.
       * @summary Call `Util.view(data).registrationLegend()` to render this display.
       * @function Util.VIEW.registrationLegend
       * @returns {string} HTML output
       */
      .addDisplay(function registrationLegend() {
        const xListRegistrationicon = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even c-Alert')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item o-Flex__Item c-Alert__Item')
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-registrationicon.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xRegistrationicon.render(d)
              )
            })
          })
        return new xjs.DocumentFragment(xListRegistrationicon.render(this)).innerHTML()
      })
      /**
       * Return a `<ul.o-ListStacked>` component, containing {@link xPass} items.
       * Parameter `data` should be of type `Array<!Object>`,
       * where each entry is similar to an argument of the `Pass` constructor.
       * @summary Call `Util.view(data).pass()` to render this display.
       * @function Util.VIEW.pass
       * @param   {Conference} $conference the conference to which these passes belong
       * @param   {(Array<string>|sdo.ItemList)=} queue a list of pass names, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the pass names
       * @returns {string} HTML output
       */
      .addDisplay(function pass($conference, queue = null) {
        const xListPass = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-pass.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xPass.render(d, null, { conference: o.conference })
              )
            }, null, { conference: opts.conference })
          })
        let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        let items = this.filter((item) => (queue) ? item_keys.includes(item.name) : true)
        return new xjs.DocumentFragment(xListPass.render(items, null, { conference: $conference })).innerHTML()
      })
      /**
       * Return a `<ul.c-Alert>` component, containing {@link xVenue} items.
       * Parameter `data` should be of type `Array<{@link http://schema.org/Accommodation|sdo.Accommodation}>`.
       * @summary Call `Util.view(data).venue()` to render this display.
       * @function Util.VIEW.venue
       * @param   {(Array<string>|sdo.ItemList)=} queue a list of venue titles, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the venue titles
       * @returns {string} HTML output
       */
      .addDisplay(function venue(queue = null) {
        const xListVenue = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-Flex--even c-Alert')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item o-Flex__Item c-Alert__Item')
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-venue.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xVenue.render(d)
              )
            })
          })
        let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        let items = this.filter((item) => (queue) ? item_keys.includes(item.description) : true)
        return new xjs.DocumentFragment(xListVenue.render(items)).innerHTML()
      })
      /**
       * Return a `<ul.o-ListStacked>` component, containing {@link xSpeaker} items.
       * Parameter `data` should be of type `Array<{@link http://schema.org/Person|sdo.Person}>`.
       * @summary Call `Util.view(data).speaker()` to render this display.
       * @function Util.VIEW.speaker
       * @param   {(Array<string>|sdo.ItemList)=} queue a list of person ids, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the person ids
       * @returns {string} HTML output
       */
      .addDisplay(function speaker(queue = null) {
        const xSpeaker = require('../tpl/x-speaker.tpl.js')
        const xListSpeaker = xjs.HTMLUListElement.templateSync()
          .exe(function () {
            new xjs.HTMLUListElement(this.content().querySelector('ul')).addClass('o-List o-Flex o-ListStacked')
            new xjs.HTMLLIElement(this.content().querySelector('template').content.querySelector('li'))
              .addClass('o-List__Item o-Flex__Item o-ListStacked__Item')
              .innerHTML(`<link rel="import" data-import="template" href="../tpl/x-speaker.tpl.html"/>`)
            new xjs.DocumentFragment(this.content().querySelector('template').content).importLinks(__dirname)
          })
          .setRenderer(function (frag, data, opts) {
            new xjs.HTMLUListElement(frag.querySelector('ul')).populate(data, function (f, d, o) {
              new xjs.HTMLLIElement(f.querySelector('li')).empty().append(
                xSpeaker.render(d)
              )
            })
          })
        let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        let items = this.filter((item) => (queue) ? item_keys.includes(item.identifier) : true)
        return new xjs.DocumentFragment(xListSpeaker.render(items)).innerHTML()
      })
      /**
       * Return a `<ul>` element, containing conference chairs and/or co-chairs.
       * Parameter `data` should be of type `Array<{@link http://schema.org/Person|sdo.Person}>`.
       * @summary Call `Util.view(data).chairs()` to render this display.
       * @function Util.VIEW.chairs
       * @param   {(Array<string>|sdo.ItemList)=} queue a list of person ids, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the person ids
       * @returns {string} HTML output
       */
      .addDisplay(function chairs(queue = null) {
        const xListChair = require('../tpl/x-list-chair.tpl.js')
        let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        let items = this.filter((item) => (queue) ? item_keys.includes(item.identifier) : true)
        return new xjs.DocumentFragment(xListChair.render(items)).innerHTML()
      })
      /**
       * Return a `<ul.c-SocialList>` component, containing
       * markup for social media profiles.
       * Parameter `data` should be of type `Array<{@link http://schema.org/WebPageElement|sdo.WebPageElement}>`,
       * where each array entry has a `name`, `url`, and `text`.
       * @summary Call `Util.view(data).socialList()` to render this display.
       * @function Util.VIEW.socialList
       * @param   {string=} classes optional classes to add to the `<ul>`
       * @returns {string} HTML output
       */
      .addDisplay(function socialList(classes = '') {
        const xListSocial = require('../tpl/x-list-social.tpl.js')
        return new xjs.DocumentFragment(
          xListSocial.render(this.map((obj) => ({
            ...obj,
            "@type": "WebPageElement",
            text   : obj.description, // TODO update database to use type `sdo.WebPageElement`
          })), null, { classes })
        ).innerHTML()
      })
  }

  /**
   * @summary Return a URL-friendly string.
   * @param  {string} str a string to convert
   * @returns {string} a URL-safe variant of the string given
   */
  static toURL(str) {
    return encodeURIComponent(str.toLowerCase().replace(/[\W]+/g, '-'))
  }

  /**
   * @summary Return a string part of an icon.
   * @param   {Util.Icon} icon the icon object to parse
   * @param   {boolean=} fb true if the fallback is preferred over the content
   * @returns {string} if `fb===true`, `icon.fallback`; else `icon.content`
   */
  static iconToString(icon, fb = false) {
    return (fb) ? icon.fallback : icon.content
  }
}



/**
 * @summary Enum for state regions.
 * @enum {string}
 */
Util.Region = {
  SOUTH    : 's',
  WEST     : 'w',
  SOUTHWEST: 'sw',
  NORTHEAST: 'ne',
  MIDWEST  : 'mw',
}

module.exports = Util
