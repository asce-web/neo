import * as xjs from 'extrajs-dom'
import {Color} from 'extrajs-color'

import {ConfSite as ConfSiteSchema, Hyperlink, Queue} from '../interfaces'
import xSiteTitle from '../tpl/sitetitle.tpl'
import xDirectory from '../tpl/directory.tpl'
import Conference from './Conference.class'
import ConfPage   from './ConfPage.class'

const Page     = require('sitepage').Page


// TODO export this and use in '../tpl/directory.tpl'
interface DirectoryOpts {
	/**
	 * How many levels deep the outline should be; a non-negative integer, or `Infinity`.
	 * @default Infinity
	 */
	depth?: number;
	/**
	 * The subpage at which to start; an integer.
	 *
	 * Works just like the first parameter of
	 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice|Array#slice}.
	 * @default 0
	 */
	start?: number;
	/**
	 * The subpage at which to end; an integer or `Infinity`.
	 *
	 * Works just like the last parameter of
	 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice|Array#slice}.
	 * @default Infinity
	 */
	end?: number;
	/** group set of css class configurations */
	classes?: null|{
		/** list classes (`<ol>`) */
		list?: string;
		/** item classes (`<li>`) */
		item?: string;
		/** link classes (`<a>`) */
		link?: string;
		/** classes for page icon */
		icon?: string;
		/** classes for `expand_more` icon */
		expand?: string;
	};
	/** unknown docs */
	links?: object;
	/** configurations for nested outlines */
	opts?: DirectoryOpts;
}

/**
 * A conference site.
 * A website hosting a series of conferences,
 * with a name, url, slogan, logo, and color scheme.
 */
export default class ConfSite extends Page {
  /**
   * Generate a color palette and return a style object with custom properties.
   * @todo TODO use a CSSRuleset object
   * @param   $primary   the primary color for the site
   * @param   $secondary the secondary color for the site
   * @returns a CSS object containg custom properties with color string values
   */
  static colorStyles($primary: Color, $secondary: Color): { [index: string]: string } {
    let   primary_s2  =   $primary.darken(2/3, true)
    let   primary_s1  =   $primary.darken(1/3, true)
    let   primary_t1  =   $primary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let   primary_t2  =   $primary.darken(2/3, true).lighten(2/3, false) // two-thirds to white
    let secondary_s2  = $secondary.darken(2/3, true)
    let secondary_s1  = $secondary.darken(1/3, true)
    let secondary_t1  = $secondary.darken(1/3, true).lighten(1/3, false) // one-third to white
    let secondary_t2  = $secondary.darken(2/3, true).lighten(2/3, false) // two-thirds to white

    let _g1 = $primary.mix($secondary, 1/4).desaturate(7/8, true)
    let _g2 = $secondary.mix($primary, 1/4).desaturate(7/8, true)

    let gray_dk_s2 = _g1.lighten( 1/12 - _g1.hslLum, false)
    let gray_dk_s1 = _g1.lighten( 2/12 - _g1.hslLum, false)
    let gray_dk    = _g1.lighten( 3/12 - _g1.hslLum, false)
    let gray_dk_t1 = _g1.lighten( 4/12 - _g1.hslLum, false)
    let gray_dk_t2 = _g1.lighten( 5/12 - _g1.hslLum, false)
    let gray_lt_s2 = _g2.lighten( 7/12 - _g2.hslLum, false)
    let gray_lt_s1 = _g2.lighten( 8/12 - _g2.hslLum, false)
    let gray_lt    = _g2.lighten( 9/12 - _g2.hslLum, false)
    let gray_lt_t1 = _g2.lighten(10/12 - _g2.hslLum, false)
    let gray_lt_t2 = _g2.lighten(11/12 - _g2.hslLum, false)

    return {
      '--color-primary'  :   $primary.toString(),
      '--color-secondary': $secondary.toString(),
      '--color-gray_dk'  :    gray_dk.toString(),
      '--color-gray_lt'  :    gray_lt.toString(),

      '--color-primary-shade2'  :   primary_s2.toString(),
      '--color-primary-shade1'  :   primary_s1.toString(),
      '--color-primary-tint1'   :   primary_t1.toString(),
      '--color-primary-tint2'   :   primary_t2.toString(),

      '--color-secondary-shade2': secondary_s2.toString(),
      '--color-secondary-shade1': secondary_s1.toString(),
      '--color-secondary-tint1' : secondary_t1.toString(),
      '--color-secondary-tint2' : secondary_t2.toString(),

      '--color-gray_dk-shade2'  :   gray_dk_s2.toString(),
      '--color-gray_dk-shade1'  :   gray_dk_s1.toString(),
      '--color-gray_dk-tint1'   :   gray_dk_t1.toString(),
      '--color-gray_dk-tint2'   :   gray_dk_t2.toString(),

      '--color-gray_lt-shade2'  :   gray_lt_s2.toString(),
      '--color-gray_lt-shade1'  :   gray_lt_s1.toString(),
      '--color-gray_lt-tint1'   :   gray_lt_t1.toString(),
      '--color-gray_lt-tint2'   :   gray_lt_t2.toString(),
    }
  }


	/** All the data for this object. */
	private readonly _DATA: ConfSiteSchema;

  /**
   * Construct a new ConfSite object.
   * @param   jsondata all the data for this object
   */
  constructor(jsondata: ConfSiteSchema) {
    super({ name: jsondata.name, url: jsondata.url })
    super.description(jsondata.description || '')
    super.keywords(jsondata.keywords || [])
    this._DATA = jsondata
  }


  /**
   * The colors for this site: a CSS object containg custom properties with color string values.
   * @todo TODO use a CSSRuleset object
   */
  get colors(): { [index: string]: string } {
    return ConfSite.colorStyles(
      Color.fromString(this._DATA.color && this._DATA.color[0] || '#660000'),  // default Hokie colors
      Color.fromString(this._DATA.color && this._DATA.color[1] || '#ff6600')   // default Hokie colors
    )
  }

  /**
   * Retrieve a conference of this site.
   * @param   url the unique url of the conference to get
   * @returns the specified conference, or `null` if it cannot be found
   */
  getConference(url: string): Conference|null {
    let returned = this._DATA.$conferences.find((conference) => conference.url === url) || null
    return (returned) ? new Conference(returned) : null
  }
  /**
   * Retrieve all conferences added to this site.
   * @returns all conferences of this site
   */
  getConferencesAll(): Conference[] {
    return this._DATA.$conferences.map((event) => new Conference(event))
  }
  /**
   * The current conference is the conference that is being promoted this cycle.
   * @returns the current conference of this site
   */
  get currentConference(): Conference {
    return this.getConference(this._DATA.$currentConference || this._DATA.$conferences[0].url) !
  }
  /**
   * The previous conference is the conference that was promoted last cycle.
   * @returns the previous conference of this site, or `null` if it has not been specified
   */
  get prevConference(): Conference|null {
    return this.getConference(this._DATA.$previousConference || '')
  }
  /**
   * The next conference is the conference that will be promoted next cycle.
   * @returns the next conference of this site, or `null` if it has not been specified
   */
  get nextConference(): Conference|null {
    return this.getConference(this._DATA.$nextConference || '')
  }

  /**
   * Retrieve a queue added to this site.
   * @param   name the name of the queue
   * @returns the queue, or `null` if not found
   */
  getQueue(name: string): Queue|null {
    return this.getQueuesAll().find((list) => list.name===name) || null
  }
  /**
   * Return all queues on this site.
   * @todo TODO turn this into a getter
   * @returns all this site’s queues
   */
  getQueuesAll(): Queue[] {
    return (this._DATA.$queues || []).slice()
  }

  /**
   * Return all social network profiles of this site.
   * @returns all this site’s social media networks
   */
  getSocialAll(): Hyperlink[] {
    return (this._DATA.brand) ? (this._DATA.brand.$social || []).slice() : []
  }


  /**
   * Initialize this site: add the proper pages.
   *
   * This method should only be called once; it resets pages every time called.
   * @returns `this`
   */
  init(): this {
    // TODO move all this data inside the database
    var self = this
    function pageTitle(this: ConfPage): string { return this.name() + ' | ' + self.name() }
    return this
      .removeAll() //- NOTE IMPORTANT
      .add(new ConfPage('Home', 'index.html')
        .title(this.name())
        .description(this.slogan)
        .setIcon('home')
      )
      .add(new ConfPage('Registration', 'registration.html')
        .title(pageTitle)
        .description(`Register for ${this.name()} here.`)
        .setIcon('shopping_cart')
      )
      .add(new ConfPage('Program', 'program.html')
        .title(pageTitle)
        .description(`Program and agenda of ${this.name()}.`)
        .setIcon('event')
      )
      .add(new ConfPage('Location', 'location.html')
        .title(pageTitle)
        .description(`Location and where to stay for ${this.name()}.`)
        .setIcon('flight')
      )
      .add(new ConfPage('Speakers', 'speakers.html')
        .title(pageTitle)
        .description(`Current and prospective speakers at ${this.name()}.`)
        .setIcon('account_box')
      )
      .add(new ConfPage('Sponsor', 'sponsor.html')
        .title(pageTitle)
        .description(`Sponsors of ${this.name()}.`)
        .setIcon('people')
      )
      .add(new ConfPage('Exhibit', 'exhibit.html')
        .title(pageTitle)
        .description(`Exhibitors at ${this.name()}.`)
        .setIcon('work')
      )
      .add(new ConfPage('About', 'about.html')
        .title(pageTitle)
        .description(`About ${this.name()}.`)
        .setIcon('info_outline')
      )
      .add(new ConfPage('Contact', 'contact.html')
        .title(pageTitle)
        .description(`Contact us for questions and comments about ${this.name()}.`)
        .setIcon('email')
      )
  }

	/**
	 * Return an `<a.c-SiteTitle>` component marking up this conference site’s info.
	 * @returns HTML output
	 */
	view_siteTitle(): string {
		return new xjs.DocumentFragment(xSiteTitle.process(this._DATA)).innerHTML()
	}
			/**
			 * Return a Page object’s document outline as a nested ordered list.
			 * @param   options options for configuring output
			 * @returns HTML output
			 */
			view_pageToc(options: DirectoryOpts = {}): string {
				function toSDO(page: typeof Page) {
					return {
						"@type": "WebPage",
						"name"       : page.name(),
						"url"        : page.url(),
						"description": page.description(),
						"keywords"   : page.keywords(),
						"hasPart"    : page.findAll().map((p: typeof Page) => toSDO(p)),
					}
				}
				return new xjs.DocumentFragment(xDirectory.process({
					...this._DATA,
					hasPart: this.findAll().map((p: typeof Page) => toSDO(p)), // FIXME don’t use `.findAll`
				}, options)).innerHTML()
			}
}
