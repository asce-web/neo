const Page = require('sitepage').Page
const Util = require('./Util.class.js')

/**
 * Any page or subpage within a {@link ConfSite}.
 * @extends Page
 */
class ConfPage extends Page {
  /**
   * Construct a ConfPage object, given a name and url.
   * @param {string} name name of this page
   * @param {string} url  url of this page
   */
  constructor(name, url) {
    super({ name: name, url: url })
    /** @private */ this._icon     = null
    /** @private */ this._is_hidden = false
  }

  /**
   * @summary Set the icon for this page.
   * @param {string} key the keyword for the icon
   */
  setIcon(key) {
    this._icon = Util.ICON_DATA.find(($icon) => $icon.content===key)
    return this
  }
  /**
   * @summary Get the icon of this page.
   * @param   {boolean=} fallback if true, get the unicode code point
   * @returns {string} if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback) {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  /**
   * @summary Hide or show this page.
   * @param   {boolean=} bool hides or shows this page
   * @returns {Page} this page
   */
  hide(bool = true) {
    this._is_hidden = bool
    return this
  }
  /**
   * @summary Get the hidden status of this page.
   * @returns {boolean} true if this page is hidden; false otherwise
   */
  isHidden() {
    return this._is_hidden
  }
}

module.exports = ConfPage
