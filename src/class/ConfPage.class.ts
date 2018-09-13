import Util, {Icon} from './Util.class'

const Page = require('sitepage').Page



/**
 * Any page or subpage within a {@link ConfSite}.
 */
export default class ConfPage extends Page {
  /** This page’s icon. */
  private _icon: Icon|null;
  /** Is this page hidden? */
  private _is_hidden: boolean;

  /**
   * Construct a new ConfPage object.
   * @param   name name of this page
   * @param   url  url of this page
   */
  constructor(name: string, url: string) {
    super({ name: name, url: url })
    this._icon      = null
    this._is_hidden = false
  }

  /**
   * Set the icon for this page.
   * @param   key the content keyword for the icon
   * @returns `this`
   */
  setIcon(key: string): this {
    this._icon = Util.ICON_DATA.find((icon) => icon.content === key) || null
    return this
  }
  /**
   * Get the icon of this page.
   * @param   fallback should I get the unicode code point?
   * @returns if fallback, the unicode code point, else, the keyword of the icon
   */
  getIcon(fallback?: boolean): string {
    return (this._icon) ? Util.iconToString(this._icon, fallback) : ''
  }

  /**
   * Hide or show this page.
   * @param   bool should this page be hidden? (default `true`)
   * @returns `this`
   */
  hide(bool = true): this {
    this._is_hidden = bool
    return this
  }
  /**
   * Get the hidden status of this page.
   * @returns is this page hidden?
   */
  isHidden(): boolean {
    return this._is_hidden
  }
}
