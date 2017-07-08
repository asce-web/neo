module.exports = class Util {
  /**
   * A set of static values and functions used site-wide.
   * @private
   * @constructor
   */
  constructor() {}

  /**
   * List of full month names in English.
   * @type {Array<string>}
   */
  static get MONTH_NAMES() {
    return [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ]
  }

  /**
   * List of full day names in English.
   * @type {Array<string>}
   */
  static get DAY_NAMES() {
    return [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]
  }

  /**
   * NOTE: Type Definition
   * @typedef {Object} StateObj
   * @property {string} index  - the postal code for the state
   * @property {string} name   - the name of the state
   * @property {number} pop    - population in people
   * @property {number} area   - area in square km
   * @property {string} region - region of US
   */

  /**
   * List of US State objects.
   * @type {Array<StateObj>}
   */
  static get STATE_DATA() {
    return [
      { index: 'AL',  name: 'Alabama',         pop:  4779736,  area:  52419, region: 'South'     },
      { index: 'AK',  name: 'Alaska',          pop:   710231,  area: 663267, region: 'West'      },
      { index: 'AZ',  name: 'Arizona',         pop:  6392017,  area: 113998, region: 'Southwest' },
      { index: 'AR',  name: 'Arkansas',        pop:  2915918,  area:  53179, region: 'South'     },
      { index: 'CA',  name: 'California',      pop: 37253956,  area: 163696, region: 'West'      },
      { index: 'CO',  name: 'Colorado',        pop:  5029196,  area: 104094, region: 'West'      },
      { index: 'CT',  name: 'Connecticut',     pop:  3574097,  area:   5543, region: 'Northeast' },
      { index: 'DE',  name: 'Delaware',        pop:   897934,  area:   2489, region: 'Northeast' },
      { index: 'FL',  name: 'Florida',         pop: 18801310,  area:  65755, region: 'South'     },
      { index: 'GA',  name: 'Georgia',         pop:  9687653,  area:  59425, region: 'South'     },
      { index: 'HI',  name: 'Hawaii',          pop:  1360301,  area:  10931, region: 'West'      },
      { index: 'ID',  name: 'Idaho',           pop:  1567582,  area:  83570, region: 'West'      },
      { index: 'IL',  name: 'Illinois',        pop: 12830632,  area:  57914, region: 'Midwest'   },
      { index: 'IN',  name: 'Indiana',         pop:  6483802,  area:  36418, region: 'Midwest'   },
      { index: 'IA',  name: 'Iowa',            pop:  3046355,  area:  56272, region: 'Midwest'   },
      { index: 'KS',  name: 'Kansas',          pop:  2853118,  area:  82277, region: 'Midwest'   },
      { index: 'KY',  name: 'Kentucky',        pop:  4339367,  area:  40409, region: 'South'     },
      { index: 'LA',  name: 'Louisiana',       pop:  4533372,  area:  51840, region: 'South'     },
      { index: 'ME',  name: 'Maine',           pop:  1328361,  area:  35385, region: 'Northeast' },
      { index: 'MD',  name: 'Maryland',        pop:  5773552,  area:  12407, region: 'Northeast' },
      { index: 'MA',  name: 'Massachusetts',   pop:  6547629,  area:  10555, region: 'Northeast' },
      { index: 'MI',  name: 'Michigan',        pop:  9883640,  area:  96716, region: 'Midwest'   },
      { index: 'MN',  name: 'Minnesota',       pop:  5303925,  area:  86939, region: 'Midwest'   },
      { index: 'MS',  name: 'Mississippi',     pop:  2967297,  area:  48430, region: 'South'     },
      { index: 'MO',  name: 'Missouri',        pop:  5988927,  area:  69704, region: 'Midwest'   },
      { index: 'MT',  name: 'Montana',         pop:   989415,  area: 147042, region: 'West'      },
      { index: 'NE',  name: 'Nebraska',        pop:  1826341,  area:  77354, region: 'Midwest'   },
      { index: 'NV',  name: 'Nevada',          pop:  2700551,  area: 110561, region: 'West'      },
      { index: 'NH',  name: 'New Hampshire',   pop:  1316470,  area:   9350, region: 'Northeast' },
      { index: 'NJ',  name: 'New Jersey',      pop:  8791894,  area:   8721, region: 'Northeast' },
      { index: 'NM',  name: 'New Mexico',      pop:  2059179,  area: 121589, region: 'Southwest' },
      { index: 'NY',  name: 'New York',        pop: 19378102,  area:  54556, region: 'Northeast' },
      { index: 'NC',  name: 'North Carolina',  pop:  9535483,  area:  53819, region: 'South'     },
      { index: 'ND',  name: 'North Dakota',    pop:   672591,  area:  70700, region: 'Midwest'   },
      { index: 'OH',  name: 'Ohio',            pop: 11536504,  area:  44825, region: 'Midwest'   },
      { index: 'OK',  name: 'Oklahoma',        pop:  3751351,  area:  69898, region: 'Southwest' },
      { index: 'OR',  name: 'Oregon',          pop:  3831074,  area:  98381, region: 'West'      },
      { index: 'PA',  name: 'Pennsylvania',    pop: 12702379,  area:  46055, region: 'Northeast' },
      { index: 'RI',  name: 'Rhode Island',    pop:  1052567,  area:   1545, region: 'Northeast' },
      { index: 'SC',  name: 'South Carolina',  pop:  4625364,  area:  32020, region: 'South'     },
      { index: 'SD',  name: 'South Dakota',    pop:   814180,  area:  77117, region: 'Midwest'   },
      { index: 'TN',  name: 'Tennessee',       pop:  6346105,  area:  42143, region: 'South'     },
      { index: 'TX',  name: 'Texas',           pop: 25145561,  area: 268581, region: 'Southwest' },
      { index: 'UT',  name: 'Utah',            pop:  2763885,  area:  84899, region: 'West'      },
      { index: 'VT',  name: 'Vermont',         pop:   625741,  area:   9614, region: 'Northeast' },
      { index: 'VA',  name: 'Virginia',        pop:  8260405,  area:  42774, region: 'South'     },
      { index: 'WA',  name: 'Washington',      pop:  6971406,  area:  71300, region: 'West'      },
      { index: 'WV',  name: 'West Virginia',   pop:  1854304,  area:  24230, region: 'South'     },
      { index: 'WI',  name: 'Wisconsin',       pop:  5686986,  area:  65498, region: 'Midwest'   },
      { index: 'WY',  name: 'Wyoming',         pop:   563626,  area:  97814, region: 'West'      },
    ]
  }

  /**
   * NOTE: Type Definition
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
        // toURL: function (handle) { return 'https://twitter.com/' + (handle || '') }, // NOTE param validation
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
   * Display a Date object as a string of the format 'HH:MMrr', where
   * - 'HH' is the 12-hour format hour of day ('1'–'12')
   * - 'MM' is the minutes of the hour
   * - 'rr' is 'am' or 'pm' (“Ante Meridiem” or “Post Meridiem”)
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format HH:MM[am|pm]
   */
  static hourTime12(date) {
    var hour = '' + ((date.getHours() - 1)%12 + 1)
    var minute = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
    var meridiem = (date.getHours() < 12) ? 'am' : 'pm'
    return hour + ((minute !== '00') ? `:${minute}` : '') + meridiem
  }

  /**
   * Display a Date object as a string of the format 'HHHH:MM', where
   * - 'HHHH' is the 24-hour format hour of day ('00'–'23')
   * - 'MM' is the minutes of the hour
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format HHHH:MM
   */
  static hourTime24(date) {
    var hour =   ((date.getHours()   < 10) ? '0' : '') + date.getHours()
    var minute = ((date.getMinutes() < 10) ? '0' : '') + date.getMinutes()
    return hour + ':' + minute
  }

  /**
   * Return an abbreviated form of a date.
   * The format is 'MMM DD', where
   * - 'MMM' is the first 3 letters of the month in English
   * - 'DD' is the date (one or two digits)
   * @param  {Date} date the datetime to display
   * @return {string} a string of the format 'MMM DD'
   */
  static monthDay(date) {
    return Util.MONTH_NAMES[date.getUTCMonth()].slice(0,3) + ' ' + date.getUTCDate()
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
   * Return a new Date object from a given datetime string.
   * @param  {string} str a string in any acceptable datetime format
   * @return {Date} a new Date object representation of the argument
   */
  static toDate(str) {
    return (str) ? new Date(str) : new Date()
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
}
