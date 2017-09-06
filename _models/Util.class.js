var Element = require('helpers-js').Element

/**
 * A set of static values and functions used site-wide.
 * @module
 */
module.exports = class Util extends require('helpers-js').Util {
  /** @private */ constructor() {}

  /**
   * NOTE: TYPE DEFINITION
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "StateObj",
   *   "type": "object",
   *   "additionalProperties": false,
   *   "required": ["index", "name", "pop", "area", "region"],
   *   "properties": {
   *     "index" : { "type": "string", "description": "the postal code for the state" },
   *     "name"  : { "type": "string", "description": "the name of the state" },
   *     "pop"   : { "type": "number", "description": "population in people" },
   *     "area"  : { "type": "number", "description": "area in square km" },
   *     "region": { "type": "Util.Region", "description": "region of US" }
   *   }
   * }
   * @typedef {Object} StateObj
   * @property {string} index  - the postal code for the state
   * @property {string} name   - the name of the state
   * @property {number} pop    - population in people
   * @property {number} area   - area in square km
   * @property {Util.Region} region - region of US
   */

  /**
   * List of US State objects.
   * @type {Array<StateObj>}
   */
  static get STATE_DATA() {
    return [
      { index: 'AL',  name: 'Alabama',         pop:  4779736,  area:  52419, region: Util.Region.SOUTH     },
      { index: 'AK',  name: 'Alaska',          pop:   710231,  area: 663267, region: Util.Region.WEST      },
      { index: 'AZ',  name: 'Arizona',         pop:  6392017,  area: 113998, region: Util.Region.SOUTHWEST },
      { index: 'AR',  name: 'Arkansas',        pop:  2915918,  area:  53179, region: Util.Region.SOUTH     },
      { index: 'CA',  name: 'California',      pop: 37253956,  area: 163696, region: Util.Region.WEST      },
      { index: 'CO',  name: 'Colorado',        pop:  5029196,  area: 104094, region: Util.Region.WEST      },
      { index: 'CT',  name: 'Connecticut',     pop:  3574097,  area:   5543, region: Util.Region.NORTHEAST },
      { index: 'DE',  name: 'Delaware',        pop:   897934,  area:   2489, region: Util.Region.NORTHEAST },
      { index: 'FL',  name: 'Florida',         pop: 18801310,  area:  65755, region: Util.Region.SOUTH     },
      { index: 'GA',  name: 'Georgia',         pop:  9687653,  area:  59425, region: Util.Region.SOUTH     },
      { index: 'HI',  name: 'Hawaii',          pop:  1360301,  area:  10931, region: Util.Region.WEST      },
      { index: 'ID',  name: 'Idaho',           pop:  1567582,  area:  83570, region: Util.Region.WEST      },
      { index: 'IL',  name: 'Illinois',        pop: 12830632,  area:  57914, region: Util.Region.MIDWEST   },
      { index: 'IN',  name: 'Indiana',         pop:  6483802,  area:  36418, region: Util.Region.MIDWEST   },
      { index: 'IA',  name: 'Iowa',            pop:  3046355,  area:  56272, region: Util.Region.MIDWEST   },
      { index: 'KS',  name: 'Kansas',          pop:  2853118,  area:  82277, region: Util.Region.MIDWEST   },
      { index: 'KY',  name: 'Kentucky',        pop:  4339367,  area:  40409, region: Util.Region.SOUTH     },
      { index: 'LA',  name: 'Louisiana',       pop:  4533372,  area:  51840, region: Util.Region.SOUTH     },
      { index: 'ME',  name: 'Maine',           pop:  1328361,  area:  35385, region: Util.Region.NORTHEAST },
      { index: 'MD',  name: 'Maryland',        pop:  5773552,  area:  12407, region: Util.Region.NORTHEAST },
      { index: 'MA',  name: 'Massachusetts',   pop:  6547629,  area:  10555, region: Util.Region.NORTHEAST },
      { index: 'MI',  name: 'Michigan',        pop:  9883640,  area:  96716, region: Util.Region.MIDWEST   },
      { index: 'MN',  name: 'Minnesota',       pop:  5303925,  area:  86939, region: Util.Region.MIDWEST   },
      { index: 'MS',  name: 'Mississippi',     pop:  2967297,  area:  48430, region: Util.Region.SOUTH     },
      { index: 'MO',  name: 'Missouri',        pop:  5988927,  area:  69704, region: Util.Region.MIDWEST   },
      { index: 'MT',  name: 'Montana',         pop:   989415,  area: 147042, region: Util.Region.WEST      },
      { index: 'NE',  name: 'Nebraska',        pop:  1826341,  area:  77354, region: Util.Region.MIDWEST   },
      { index: 'NV',  name: 'Nevada',          pop:  2700551,  area: 110561, region: Util.Region.WEST      },
      { index: 'NH',  name: 'New Hampshire',   pop:  1316470,  area:   9350, region: Util.Region.NORTHEAST },
      { index: 'NJ',  name: 'New Jersey',      pop:  8791894,  area:   8721, region: Util.Region.NORTHEAST },
      { index: 'NM',  name: 'New Mexico',      pop:  2059179,  area: 121589, region: Util.Region.SOUTHWEST },
      { index: 'NY',  name: 'New York',        pop: 19378102,  area:  54556, region: Util.Region.NORTHEAST },
      { index: 'NC',  name: 'North Carolina',  pop:  9535483,  area:  53819, region: Util.Region.SOUTH     },
      { index: 'ND',  name: 'North Dakota',    pop:   672591,  area:  70700, region: Util.Region.MIDWEST   },
      { index: 'OH',  name: 'Ohio',            pop: 11536504,  area:  44825, region: Util.Region.MIDWEST   },
      { index: 'OK',  name: 'Oklahoma',        pop:  3751351,  area:  69898, region: Util.Region.SOUTHWEST },
      { index: 'OR',  name: 'Oregon',          pop:  3831074,  area:  98381, region: Util.Region.WEST      },
      { index: 'PA',  name: 'Pennsylvania',    pop: 12702379,  area:  46055, region: Util.Region.NORTHEAST },
      { index: 'RI',  name: 'Rhode Island',    pop:  1052567,  area:   1545, region: Util.Region.NORTHEAST },
      { index: 'SC',  name: 'South Carolina',  pop:  4625364,  area:  32020, region: Util.Region.SOUTH     },
      { index: 'SD',  name: 'South Dakota',    pop:   814180,  area:  77117, region: Util.Region.MIDWEST   },
      { index: 'TN',  name: 'Tennessee',       pop:  6346105,  area:  42143, region: Util.Region.SOUTH     },
      { index: 'TX',  name: 'Texas',           pop: 25145561,  area: 268581, region: Util.Region.SOUTHWEST },
      { index: 'UT',  name: 'Utah',            pop:  2763885,  area:  84899, region: Util.Region.WEST      },
      { index: 'VT',  name: 'Vermont',         pop:   625741,  area:   9614, region: Util.Region.NORTHEAST },
      { index: 'VA',  name: 'Virginia',        pop:  8260405,  area:  42774, region: Util.Region.SOUTH     },
      { index: 'WA',  name: 'Washington',      pop:  6971406,  area:  71300, region: Util.Region.WEST      },
      { index: 'WV',  name: 'West Virginia',   pop:  1854304,  area:  24230, region: Util.Region.SOUTH     },
      { index: 'WI',  name: 'Wisconsin',       pop:  5686986,  area:  65498, region: Util.Region.MIDWEST   },
      { index: 'WY',  name: 'Wyoming',         pop:   563626,  area:  97814, region: Util.Region.WEST      },
    ]
  }

  /**
   * NOTE: TYPE DEFINITION
   * {
   *   "$schema": "http://json-schema.org/schema#",
   *   "title": "Icon",
   *   "type": "object",
   *   "additionalProperties": false,
   *   "required": ["content", "fallback", "html"],
   *   "properties": {
   *     "content" : { "type": "string", "description": "the keyword used for the ligature" },
   *     "fallback": { "type": "string", "description": "unicode code point" },
   *     "html"    : { "type": "string", "description": "html entity" }
   *   }
   * }
   * @typedef {Object} Icon
   * @property {string} content  - the keyword used for the ligature
   * @property {string} fallback - unicode code point
   * @property {string} html     - html entity
   */

  /**
   * List of icon objects used in Conf styles.
   * @type {Array<Icon>}
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
   * Data for social media networks.
   * @type {Object<{name:string, icon}>}
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
   * Miscellaneous views.
   * These do not belong to any particular content type.
   * @type {Object<function(...):string>}
   */
  static get VIEW() {
    return {
      /**
       * Returns a list of buttons (links) for a highlighted content block.
       *
       * ```pug
       * ul.o-List.o-Flex.o-ListAction
       *   each item in links
       *     li.o-List__Item.o-Flex__Item.o-ListAction__Item
       *       a.c-Button.c-Button--hilite(class=[buttonclasses,item.attr('class')] href=item.attr('href'))
       *         = item.contents
       * ```
       * @param  {Array<Element>} links the links to mark up
       * @param  {string} buttonclasses the classes to add to the buttons
       * @return {string} a <ul> element marking up the links
       */
      highlightButtons(links, buttonclasses = '') {
        return Element.data(links, {
          ordered: false,
          attributes: {
            list:  { class: 'o-List o-Flex o-ListAction' },
            value: { class: 'o-List__Item o-Flex__Item o-ListAction__Item' },
          },
          options: { attributes: { list: { class: `c-Button c-Button--hilite ${buttonclasses}` } } },
        })
      },
      /**
       * Mark up a date as a heading for a time block (a list of Sessions in a program).
       * @param  {date} date the date to mark up: the date of a session
       * @return {string} a <time> element marking up the date
       */
      programHn(date) {
        return new Element('time')
          .class('c-ProgramHn h-Block')
          .attr('datetime', Util.Date.format(date, 'Y-m-d'))
          .addContent(`${Util.Date.DAY_NAMES[date.getUTCDay()]},`)
          .addElements([new Element('br')])
          .addContent(Util.Date.format(date, 'M j'))
          .html()
      },
    }
  }

  /**
   * Return a URL-friendly string.
   * @param  {string} str a string to convert
   * @return {string} a URL-safe variant of the string given
   */
  static toURL(str) {
    return encodeURIComponent(str.toLowerCase().replace(/[\W]+/g, '-'))
  }

  /**
   * Remove an item from an array.
   * This method is destructive: it modifies the given argument.
   * @param  {Array} arr the array to modify
   * @param  {unknown} item  the item to remove from the array
   */
  static spliceFromArray(arr, item) {
    var index = arr.indexOf(item)
    if (index >= 0) arr.splice(index, 1)
  }

  /**
   * Return a string part of an icon.
   * @param  {Object} icon          the icon object to parse
   * @param  {string} icon.content  the keyword of the icon
   * @param  {string} icon.fallback the unicode codepoint of the icon
   * @param  {boolean=} fb          true if the fallback is preferred over the content
   * @return {string}               `icon.fallback` if fallback==true, else `icon.content`
   */
  static iconToString(icon, fb) {
    return (fb) ? icon.fallback : icon.content
  }

  /**
   * Enum for state regions.
   * @enum {string}
   */
  static get Region() {
    return {
      SOUTH    : 's',
      WEST     : 'w',
      SOUTHWEST: 'sw',
      NORTHEAST: 'ne',
      MIDWEST  : 'mw',
    }
  }
}
