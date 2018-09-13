import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import * as sdo from 'schemaorg-jsd/dist/schemaorg' // TODO use an index file

import {
	ConfPerson,
	Hyperlink,
	Pass,
	RegistrationPeriod,
	Venue,
} from '../interfaces'
import hero_processor                  from '../tpl/hero.tpl'
import otheryear_processor             from '../tpl/otheryear.tpl'
import dateblock_processor             from '../tpl/dateblock.tpl'
import program_processor               from '../tpl/program.tpl'
import list_pass_processor             from '../tpl/list-pass.tpl'
import list_registrationicon_processor from '../tpl/list-registrationicon.tpl'
import list_speaker_processor          from '../tpl/list-speaker.tpl'
import list_venue_processor            from '../tpl/list-venue.tpl'
import list_supporterLevel_processor   from '../tpl/list-supporterlevel.tpl'
import list_exhibitor_processor        from '../tpl/list-exhibitor.tpl'
import list_chair_processor            from '../tpl/list-chair.tpl'

const xjs = { ...xjs1, ...xjs2 }


/**
 * A conference event.
 * It may have a name, theme, dates, (promoted) location,
 * passes, sessions, venues, speakers,
 * supporter levels and supporters, exhibitors, contact information,
 * important dates, organizers, and other properties.
 */
export default class Conference {
  /**
   * @summary Construct a Conference object.
   * @description The name, url, theme, start date, end date, and promoted location
   * are immutable and must be provided during construction.
   * @param {sdo.Event} jsondata a JSON object that validates against http://schema.org/Event and `/neo.jsd#/definitions/Conference`
   * @param {string} jsondata.name                       http://schema.org/name
   * @param {string} jsondata.url                        http://schema.org/url
   * @param {string=} jsondata.description               http://schema.org/description
   * @param {string=} jsondata.image                     http://schema.org/image
   * @param {string=} jsondata.startDate                 http://schema.org/startDate
   * @param {string=} jsondata.endDate                   http://schema.org/endDate
   * @param {Array<!Object>=} jsondata.location          http://schema.org/location
   * @param {Array<sdo.AggregateOffer>=} jsondata.offers http://schema.org/offers
   * @param {string=} jsondata.$currentRegistrationPeriod
   * @param {Array<!Object>=} jsondata.$passes
   * @param {Array<sdo.Event>=} jsondata.subEvent         http://schema.org/subEvent
   * @param {Array<sdo.Action>=} jsondata.potentialAction http://schema.org/potentialAction
   * @param {Array<sdo.Person>=} jsondata.performer       http://schema.org/performer
   * @param {Array<sdo.Organization>=} jsondata.sponsor   http://schema.org/sponsor
   * @param {Array<sdo.Person>=} jsondata.organizer       http://schema.org/organizer
   * @param {Array<sdo.Organization>=} jsondata.$exhibitors
   * @param {Array<sdo.WebPageElement>=} jsondata.$social
   */
  constructor(jsondata) {
    /**
     * All the data for this conference.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata

    /** @private */ this._supporter_levels = []
    /** @private */ this._supporter_lists  = {}
    /** @private */ this._social          = {}
  }

  /**
   * @summary The name of this conference.
   * @type {string}
   */
  get name() {
    return this._DATA.name
  }

  /**
   * @summary The URL of this conference.
   * @type {string}
   */
  get url() {
    return this._DATA.url
  }

  /**
   * @summary The theme of this conference.
   * @description The theme is a one-sentence or one-phrase motif,
   * and may be changed from year to year (from conference to conference).
   * @type {string}
   */
  get theme() {
    return this._DATA.description || ''
  }

  /**
   * @summary The hero image of this conference.
   * @type {string}
   */
  get heroImage() {
    return this._DATA.image || ''
  }

  /**
   * @summary The starting date of this conference.
   * @type {Date}
   */
  get startDate() {
    return new Date(this._DATA.startDate || null)
  }

  /**
   * @summary The ending date of this conference.
   * @type {Date}
   */
  get endDate() {
    return new Date(this._DATA.endDate || null)
  }

  /**
   * @summary Get the promoted location of this conference.
   * @description The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   * @type {sdo.PostalAddress}
   */
  get promoLoc() {
    return this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" }
  }

  /**
   * @summary The location image of this conference.
   * @type {string}
   */
  get promoLocImage() {
    return this._DATA.location && this._DATA.location[0] && this._DATA.location[0].image || ''
  }

  /**
   * @summary Retrieve all registration periods of this conference.
   * @returns {Array<sdo.AggregateOffer>} a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll() {
    return (this._DATA.offers || []).slice()
  }

  /**
   * @summary The current registration period.
   * @description The current registration period is the registration period that is active at this time.
   * If none has been set, the first registration period is returned.
   * @type {sdo.AggregateOffer}
   */
  get currentRegistrationPeriod() {
    let default_ = {
      "@type": "AggregateOffer",
      "name" : "default",
    }
    return (this._DATA.$currentRegistrationPeriod) ?
      this.getRegistrationPeriodsAll().find((pd) => pd.name === this._DATA.$currentRegistrationPeriod) || default_ :
      this._DATA.offers && this._DATA.offers[0] || default_
  }

  /**
   * @summary Retrieve all passes of this conference.
   * @returns {Array<!Object>} a shallow array of all passes of this conference
   */
  getPassesAll() {
    return (this._DATA.$passes || []).slice()
  }

  /**
   * @summary Retrieve all venues of this conference.
   * @returns {Array<sdo.Accommodation>} a shallow copy of the venues object of this conference
   */
  getVenuesAll() {
    return (this._DATA.location || []).slice(1)
  }

  /**
   * @summary Retrieve all speakers of this conference.
   * @returns {Array<sdo.Person>} a shallow array of all speakers of this conference
   */
  getSpeakersAll() {
    return (this._DATA.performer || []).slice()
  }

  /**
   * @summary Return an object representing all social network profiles of this conference.
   * @returns {Array<!Object>} all this conference’s social media networks
   */
  getSocialAll() {
    return (this._DATA.$social || []).slice()
  }

  // setPrice(reg_period, pass, membership, price) {
  //   reg_period = reg_period.name || reg_period
  //   pass        = pass.name        || pass
  //   membership  = membership.name  || membership
  //   this.registration = this.registration || {}
  //   this.registration[reg_period][pass][membership] = price
  //   return this
  // }


	/**
	 * Return a `<header>` element with hero image marking up this conference’s main info.
	 * @returns {string} HTML output
	 */
	view_hero() {
		return new xjs.DocumentFragment(hero_processor.process({
			...this._DATA,
			location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
		})).innerHTML()
	}
	/**
	 * Return an `<aside>` element with other year backdrop marking up this conference’s main info.
	 * @returns {string} HTML output
	 */
	view_otherYear() {
		return new xjs.DocumentFragment(otheryear_processor.process({
			...this._DATA,
			location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
		})).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link xPass} items.
	 * @param   {(Array<string>|sdo.ItemList)=} queue a list of pass names, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
	 * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the pass names
	 * @returns {string} HTML output
	 */
	view_pass(queue = null) {
		let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
		let items = this.getPassesAll().filter((item) => (queue) ? item_keys.includes(item.name) : true)
		return new xjs.DocumentFragment(list_pass_processor.process(items, { conference: this._DATA })).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component containing the legend of registration periods.
	 * @returns {string} HTML output
	 */
	view_registrationLegend() {
		return new xjs.DocumentFragment(list_registrationicon_processor.process(this.getRegistrationPeriodsAll())).innerHTML()
	}
	/**
	 * Return a `xDateblock` component marking up this conference’s important dates.
	 * @param   {boolean=} starred `true` if you want only starred dates to display
	 * @returns {string} HTML output
	 */
	view_importantDates(starred = false) {
		return new xjs.DocumentFragment(dateblock_processor.process(
			(this._DATA.potentialAction || []).filter((d) => (starred) ? d.$starred : true)
		)).innerHTML()
	}
	/**
	 * Return an `<.o-Tablist[role="tablist"]>` marking up this conference’s program sessions.
	 * Each tab contains a Program Heading Component
	 * and its panel contains a Time Block Component for that date.
	 * @param   {string} id unique id for form elements
	 * @param   {boolean=} starred `true` if you want only starred sessions to display
	 * @returns {string} HTML output
	 */
	view_program(id, starred = false) {
		return new xjs.DocumentFragment(program_processor.process(
			(this._DATA.subEvent || []).filter((s) => (starred) ? s.$starred : true),
			{ id, starred }
		)).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link xSpeaker} items.
	 * @param   {(Array<string>|sdo.ItemList)=} queue a list of person ids, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
	 * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the person ids
	 * @returns {string} HTML output
	 */
	view_speaker(queue = null) {
		let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
		let items = this.getSpeakersAll().filter((item) => (queue) ? item_keys.includes(item.identifier) : true)
		return new xjs.DocumentFragment(list_speaker_processor.process(items)).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component, containing {@link xVenue} items.
	 * @param   {(Array<string>|sdo.ItemList)=} queue a list of venue titles, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
	 * @param   {Array<string>=} queue.itemListElement if `queue` is an {@link http://schema.org/ItemList}, the venue titles
	 * @returns {string} HTML output
	 */
	view_venue(queue = null) {
		let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
		let items = this.getVenuesAll().filter((item) => (queue) ? item_keys.includes(item.description) : true)
		return new xjs.DocumentFragment(list_venue_processor.process(items)).innerHTML()
	}
	/**
	 * Return a list of `<section.c-SupporterBlock>` components containing this conference’s supporters
	 * that have the specified levels.
	 * @param   {?(sdo.ItemList|Array<string>)=} queue a list of supporter level names, in the correct order, or an {@link http://schema.org/ItemList} type describing such a list
	 * @param   {boolean=} small should logo sizing be overridden to small?
	 * @returns {string} HTML output
	 */
	view_supporterLevel(queue = null, small = false) {
		let item_keys = (xjs.Object.typeOf(queue) === 'object') ? queue.itemListElement || [] : queue
		let items = (this._DATA.$supporterLevels || []).filter((offer) => (queue) ? item_keys.includes(offer.name) : true)
		return new xjs.DocumentFragment(list_supporterLevel_processor.process(items, { small, conference: this })).innerHTML()
	}
	/**
	 * Return a list of `<div>` elements marking up this conference’s exhibitors.
	 * @returns {string} HTML output
	 */
	view_exhibitorList() {
		return new xjs.DocumentFragment(list_exhibitor_processor.process(this._DATA.$exhibitors || [])).innerHTML()
	}
	/**
	 * Return a `<ul>` element, containing conference chairs and/or co-chairs.
	 * Parameter `data` should be of type `Array<{@link http://schema.org/Person|sdo.Person}>`.
	 * @returns {string} HTML output
	 */
	view_chair() {
		return new xjs.DocumentFragment(list_chair_processor.process(this._DATA.organizer || [])).innerHTML()
	}
}
