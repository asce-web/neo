const fs = require('fs')
const path = require('path')

const jsdom = require('jsdom')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}
const View    = require('extrajs-view')
const STATE_DATA = require('extrajs-geo')
STATE_DATA.push(...[
  { "code": "DC", "name": "District of Columbia" },
])

const ElemName = require('../lib/ElemName.js') // TEMP until we remove pug
const xHighlightButtons   = require('../tpl/x-highlight-buttons.tpl.js')
const xDateblock          = require('../tpl/x-dateblock.tpl.js')
const xTimeblock          = require('../tpl/x-timeblock.tpl.js')
const xRegistrationLegend = require('../tpl/x-registration-legend.tpl.js')
const xDirectory          = require('../tpl/x-directory.tpl.js')


/**
 * A set of static values and functions used site-wide.
 * @namespace
 */
class Util {
  /** @private */ constructor() {}

  // TEMP TODO delete after extrajs-dom@3.3.0
  static documentFragment(...contents) {
    if (xjs.Object.typeOf(contents[0]) === 'array') return Util.documentFragment(...contents[0])
    return contents.map((c) =>
      (c instanceof Element) ? c.view.html() : c
    ).join('')
  }

  /**
   * @summary Convert a thing into a string.
   * @description If the argument is an array, it is joined.
   * Useful for JSON objects when the value could be a single string or an array of strings.
   * @todo TODO move to `xjs.String`.
   * @param   {*} thing anything to convert
   * @param   {boolean=} truthy if `true`, the values `null` and `undefined` are converted to
   *                            the strings `'null'` and `'undefined'` respectively;
   *                            else, they are converted to the empty string
   * @returns {string} a string version of the argument
   */
  static stringify(thing, truthy = false) {
    const returned = {
      'array'    : function (arg) { return arg.join('') },
      'object'   : function (arg) { return JSON.stringify(arg) },
      'string'   : function (arg) { return arg },
      'null'     : function (arg) { return (truthy) ? 'null'      : '' },
      'undefined': function (arg) { return (truthy) ? 'undefined' : '' },
      default(arg) { return arg.toString() },
    }
    return (returned[xjs.Object.typeOf(thing)] || returned.default).call(null, thing)
  }

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
       * @todo TODO move this display to `require('sitepage').VIEW`
       * @function Util.VIEW.pageToc
       * @param   {!Object=} options options for configuring output
       * @param   {number=} options.depth a non-negative integer, or `Infinity`: how many levels deep the outline should be
       * @param   {number=} options.start group set of css class configurations
       * @param   {number=} options.end group set of css class configurations
       * @param   {?Object<string>=} options.classes group set of css class configurations
       * @param   {string=} options.classes.list list classes (`<ol>`)
       * @param   {string=} options.classes.item item classes (`<li>`)
       * @param   {!Object=} options.links configuration param to send into {@link Util.VIEW.pageLink|Util#view.pageLink()}
       * @param   {!Object=} options.options configurations for nested outlines; specs identical to `options`
       * @returns {string} HTML output
       */
      .addDisplay(function pageToc(options = {}) {
        let classes = options.classes || {}
        let start = options.start || 0
        let end   = options.end   || Infinity
        return new xjs.DocumentFragment(xDirectory.render({
          ...this,
          hasPart: this.findAll().filter((p) => !p.isHidden()),
          $depth: options.depth,
          options: {
            ...{classes, start, end},
            links: options.links,
            options: options.options,
          }
        })).innerHTML()
      })
      /**
       * Return a snippet marking up a promoted location.
       * Parameter `data` should be of type `{@link PostalAddress}`.
       * @summary Call `Util.view(data).promoLoc()` to render this display.
       * @todo TODO move this display to `require('extrajs-geo')`
       * @function Util.VIEW.promoLoc
       * @param   {boolean=} state_code if `true`, displays region as its code (e.g. “Virginia” as “VA”)
       * @returns {string} HTML output
       */
      .addDisplay(function promoLoc(state_code = false) {
        const returned = []
        if (this.addressLocality) returned.push(ElemName('span').attr('itemprop','addressLocality').textContent(this.addressLocality).outerHTML(), `, `)
        if (this.addressRegion) {
          returned.push(ElemName('data')
            .attr({ itemprop: 'addressRegion', value: this.addressRegion })
            .textContent((state_code) ? STATE_DATA.find((state) => state.name===this.addressRegion).code : this.addressRegion)
            .outerHTML())
        }
        if (this.addressCountry) returned.push(`, `, ElemName('span').attr('itemprop','addressCountry').textContent(this.addressCountry).outerHTML())
        return returned.join('')
      })
      /**
       * Return an unordered list of button links for a highlighted content block.
       * Parameter `data` should be of type `Array<Element>` (TODO: HTMLAnchorElement), i.e., a list of links.
       * @summary Call `Util.view(data).highlightButtons()` to render this display.
       * @function Util.VIEW.highlightButtons
       * @param   {string=} buttonclasses the classes to add to the buttons
       * @returns {string} HTML output
       */
      .addDisplay(function highlightButtons(buttonclasses = '') {
        return new xjs.DocumentFragment(xHighlightButtons.render({links: this, buttonclasses})).innerHTML()
      })
      /**
       * Return a table containing a `<tbody.c-DateBlock>` component, containing
       * rows of {@link DateRange.VIEW.dateBlock|DateRange#view.dateBlock()} displays.
       * Parameter `data` should be of type `Array<DateRange>`, e.g., a list of important dates.
       * @summary Call `Util.view(data).dateBlock()` to render this display.
       * @function Util.VIEW.dateBlock
       * @returns {string} HTML output
       */
      .addDisplay(function dateBlock() {
        return new xjs.DocumentFragment(
          xDateblock.render(this.map(($dateRange) => $dateRange._DATA))
        ).innerHTML()
      })
      /**
       * Return a table containing a `<tbody.c-TimeBlock>` component, containing
       * rows of {@link DateRange.VIEW.timeBlock|DateRange#view.timeBlock()} displays.
       * Parameter `data` should be of type `Array<sdo.Event>`, e.g., a list of sessions.
       * @summary Call `Util.view(data).timeBlock()` to render this display.
       * @function Util.VIEW.timeBlock
       * @returns {string} HTML output
       */
      .addDisplay(function timeBlock() {
        return new xjs.DocumentFragment(
          xTimeblock.render(this.map((evnt, index) => ({ ...evnt, $is_last: index===this.length-1 })))
        ).innerHTML()
      })
      /**
       * Return a `<ul.c-Alert>` component containing the legend of registration periods.
       * Parameter `data` should be of type `Array<RegistrationPeriod>`.
       * @summary Call `Util.view(data).registrationLegend()` to render this display.
       * @function Util.VIEW.registrationLegend
       * @returns {string} HTML output
       */
      .addDisplay(function registrationLegend() {
        return new xjs.DocumentFragment(
          xRegistrationLegend.render(this.map(($period) => $period._DATA))
        ).innerHTML()
      })
      /**
       * Return a `<ul.o-ListStacked>` component, containing items of
       * {@link Pass.VIEW.pass|Pass#view.pass()} displays.
       * Parameter `data` should be of type `Array<Pass>`.
       * @summary Call `Util.view(data).pass()` to render this display.
       * @function Util.VIEW.pass
       * @param   {Conference} $conference the conference to which these passes belong
       * @param   {(Array<string>|!Object)=} queue a list of pass names, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the pass names
       * @returns {string} HTML output
       */
      .addDisplay(function pass($conference, queue = null) {
        const xPass = require('../tpl/x-pass.tpl.js')
        const pass_names = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        return ElemName('ul').class('o-List o-Flex o-ListStacked').append(...this
          .filter((pass) => (queue) ? pass_names.includes(pass.name) : true)
          .map((pass) => ElemName('li').class('o-List__Item o-Flex__Item o-ListStacked__Item').append(xPass.render({ ...pass._DATA, $conference })))
        ).outerHTML()
        return `
<ul class="o-List o-Flex o-ListStacked">${
  this
    .filter((pass) => (queue) ? pass_names.includes(pass.name) : true)
    .map((pass) => `<li class="o-List__Item o-Flex__Item o-ListStacked__Item">${pass.view.pass($conference)}</li>`)
}</ul>
        `
      })
      /**
       * Return a `<ul.o-ListStacked>` component, containing items of
       * {@link Person.VIEW.speaker|Person#view.speaker()} displays.
       * Parameter `data` should be of type `Array<Person>`.
       * @summary Call `Util.view(data).speaker()` to render this display.
       * @function Util.VIEW.speaker
       * @param   {(Array<string>|!Object)=} queue a list of person ids, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
       * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the person ids
       * @returns {string} HTML output
       */
      .addDisplay(function speaker(queue = null) {
        const xSpeaker = require('../tpl/x-speaker.tpl.js')
        const speaker_ids = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
        return ElemName('ul').class('o-List o-Flex o-ListStacked').append(...this
          .filter((person) => (queue) ? speaker_ids.includes(person.id) : true)
          .map((person) => ElemName('li').class('o-List__Item o-Flex__Item o-ListStacked__Item').append(xSpeaker.render(person._DATA))
        )).outerHTML()
        return `
<ul class="o-List o-Flex o-ListStacked">${
  this
    .filter((person) => (queue) ? speaker_ids.includes(person.name) : true)
    .map((person) => `<li class="o-List__Item o-Flex__Item o-ListStacked__Item">${pass.view.speaker()}</li>`)
}</ul>
        `
      })
      /**
       * Return a `<ul.c-SocialList>` component, containing
       * markup for social media profiles.
       * Parameter `data` should be of type `Array<!Object>`, where each object is of type {@link http://schema.org/URL}.
       * @summary Call `Util.view(data).socialList()` to render this display.
       * @function Util.VIEW.socialList
       * @param   {string=} classes optional classes to add to the `<ul>`
       * @returns {string} HTML output
       */
      .addDisplay(function socialList(classes = '') {
        return ElemName('ul').class('o-List o-Flex c-SocialList')
          .addClass(classes)
          .append(...this.map((url) =>
            ElemName('li').class('o-List__Item o-Flex__Item c-SocialList__Item')
              .attr({
                itemprop : 'sameAs',
                itemscope: '',
                itemtype : 'http://schema.org/URL',
              })
              .append(
                ElemName('a').class('c-SocialList__Link h-Block')
                  .addClass(`c-SocialList__Link--${url.name}`)
                  .attr({ href: url.url, itemprop: 'url' })
                  .append(
                    ElemName('span').class('h-Hidden')
                      .attr('itemprop','description')
                      .textContent(url.description)
                  )
              )
          ))
          .outerHTML()
        return `
<ul class="o-List o-Flex c-SocialList ${classes}">${
  this.map((url) => `
    <li class="o-List__Item o-Flex__Item c-SocialList__Item" itemprop="sameAs" itemscope="" itemtype="http://schema.org/URL">
      <a class="c-SocialList__Link h-Block c-SocialList__Link--${url.name}">
        <span class="h-Hidden" itemprop="description">${url.description}</span>
      </a>
    </li>
  `)
}</ul>
        `
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
   * @summary Remove an item from an array.
   * @description This method is impure: it modifies the given argument.
   * @param  {Array} arr the array to modify
   * @param  {unknown} item  the item to remove from the array
   */
  static spliceFromArray(arr, item) {
    var index = arr.indexOf(item)
    if (index >= 0) arr.splice(index, 1)
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

  /**
   * @todo TODO move this as an instance method of `xjs.HTMLTemplateElement`, replacing `xtemp` param with `this`
   * @private
   */
  static importLinks(xfrag, relativepath) {
    xfrag.node.querySelectorAll('link[rel="import"][data-import]').forEach(function (link) {
      const import_switch = {
        'document': () => ('import' in link) ? link.import.cloneNode(true)                                   : jsdom.JSDOM.fragment(fs.readFileSync(path.resolve(relativepath, link.href), 'utf8')),
        'template': () => ('import' in link) ? link.import.querySelector('template').content.cloneNode(true) : xjs.HTMLTemplateElement.fromFileSync(path.resolve(relativepath, link.href)).content(),
        default() { return null },
      }
      let imported = (import_switch[link.getAttribute('data-import')] || import_switch.default).call(null)
      if (imported && link.parentElement) {
        link.parentElement.append(imported)
        link.remove()
      }
    })
    return xfrag
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
