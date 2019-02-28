import * as xjs from 'extrajs-dom'
import * as sdo from 'schemaorg-jsd'
import {xAddress} from 'aria-patterns'

import {Hyperlink} from '../interfaces'
import xListHighlightButton from '../tpl/list-highlightbutton.tpl'
import xListLink from '../tpl/list-links.tpl'
import xListSocial from '../tpl/list-social.tpl'



/**
 * Data for an icon.
 */
export interface Icon {
	/** the keyword used for the ligature */
	content: string;
	/** unicode code point */
	fallback: string;
	/** html entity */
	html: string;
}

/**
 * A set of static values and functions used site-wide.
 */
export default class Util {
  /**
   * List of icon objects used in Conf styles.
   * @todo TODO convert this to JSON
   */
  static readonly ICON_DATA: Icon[] = [
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

  /**
   * Data for social media networks.
   * @todo TODO convert this to JSON
   */
  static readonly SOCIAL_DATA: { [index: string]: { name: string, icon: Icon } } = {
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

			/**
			 * Return a snippet marking up a promoted location.
			 * @param   postal_address a postal address
			 * @returns HTML output
			 */
			static view_promoLoc(postal_address: sdo.PostalAddress): string {
				return new xjs.DocumentFragment(xAddress.process(postal_address, {
					regionName: true,
				})).trimInner().textContent() !
			}
			/**
			 * Return an unordered list of button links for a highlighted content block.
			 * @param   buttons a list of links
			 * @param   buttonclasses the classes to add to the buttons
			 * @returns HTML output
			 */
			static view_highlightButtons(buttons: Hyperlink[], buttonclasses = '') {
				// const list_highlightbuttons = require('../dist/tpl/list-highlightbuttons.tpl.js').default
				return new xjs.DocumentFragment(xListHighlightButton.process(buttons, { buttonclasses })).innerHTML()
			}
			/**
			 * Return an unordered list of links.
			 * @param   links a list of links
			 * @returns HTML output
			 */
			static view_linkList(links: Hyperlink[]) {
				// const list_links = require('../dist/tpl/x-linklist.tpl.js').default
				return new xjs.DocumentFragment(xListLink.process(links)).innerHTML()
			}
	/**
	 * Return a `<ul.c-SocialList>` component, containing
	 * markup for social media profiles.
	 * @param   data array of social media links
	 * @param   classes optional classes to add to the `<ul>`
	 * @returns HTML output
	 */
	static view_socialList(data: Hyperlink[], classes = ''): string {
		// const list_social = require('../dist/tpl/list-social.tpl.js').default
		return new xjs.DocumentFragment(xListSocial.process(data, { classes })).innerHTML()
	}

  /**
   * Return a URL-friendly string.
   * @param   str a string to convert
   * @returns a URL-safe variant of the string given
   */
  static toURL(str: string): string {
    return encodeURIComponent(str.toLowerCase().replace(/[\W]+/g, '-'))
  }

  /**
   * Return a string part of an icon.
   * @param   icon the icon object to parse
   * @param   fb is the fallback preferred over the content?
   * @returns exactly `(fb) ? icon.fallback : icon.content`
   */
  static iconToString(icon: Icon, fb = false): string {
    return (fb) ? icon.fallback : icon.content
  }


	private constructor() {}
}
