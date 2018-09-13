import * as xjs from 'extrajs-dom'
import * as sdo from 'schemaorg-jsd/dist/schemaorg' // TODO use an index file

import {
	ConfPerson,
	Hyperlink,
	Pass,
	Queue,
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


/**
 * A conference event.
 * It may have a name, theme, dates, (promoted) location,
 * passes, sessions, venues, speakers,
 * supporter levels and supporters, exhibitors, contact information,
 * important dates, organizers, and other properties.
 */
export default class Conference {
  /**
   * Construct a new Conference object.
   *
   * The name, url, theme, start date, end date, and promoted location
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
   * The name of this conference.
   */
  get name(): string {
    return this._DATA.name
  }

  /**
   * The URL of this conference.
   */
  get url(): string {
    return this._DATA.url
  }

  /**
   * The theme of this conference.
   *
   * The theme is a one-sentence or one-phrase motif,
   * and may be changed from year to year (from conference to conference).
   */
  get theme(): string {
    return this._DATA.description || ''
  }

  /**
   * The hero image of this conference.
   */
  get heroImage(): string {
    return this._DATA.image || ''
  }

  /**
   * The starting date of this conference.
   */
  get startDate(): Date {
    return new Date(this._DATA.startDate || null)
  }

  /**
   * The ending date of this conference.
   */
  get endDate(): Date {
    return new Date(this._DATA.endDate || null)
  }

  /**
   * Get the promoted location of this conference.
   *
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   */
  get promoLoc(): sdo.PostalAddress {
    return this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" }
  }

  /**
   * The location image of this conference.
   */
  get promoLocImage(): string {
    return this._DATA.location && this._DATA.location[0] && this._DATA.location[0].image || ''
  }

  /**
   * Retrieve all registration periods of this conference.
   * @returns a shallow array of all registration periods of this conference.
   */
  getRegistrationPeriodsAll(): RegistrationPeriod[] {
    return (this._DATA.offers || []).slice()
  }

  /**
   * The current registration period.
   *
   * The current registration period is the registration period that is active at this time.
   * If none has been set, the first registration period is returned.
   */
  get currentRegistrationPeriod(): RegistrationPeriod {
    let default_ = {
      "@type": "AggregateOffer",
      "name" : "default",
    }
    return (this._DATA.$currentRegistrationPeriod) ?
      this.getRegistrationPeriodsAll().find((pd) => pd.name === this._DATA.$currentRegistrationPeriod) || default_ :
      this._DATA.offers && this._DATA.offers[0] || default_
  }

  /**
   * Retrieve all passes of this conference.
   * @returns a shallow array of all passes of this conference
   */
  getPassesAll(): Pass[] {
    return (this._DATA.$passes || []).slice()
  }

  /**
   * Retrieve all venues of this conference.
   * @returns a shallow copy of the venues object of this conference
   */
  getVenuesAll(): Venue[] {
    return (this._DATA.location || []).slice(1)
  }

  /**
   * Retrieve all speakers of this conference.
   * @returns a shallow array of all speakers of this conference
   */
  getSpeakersAll(): ConfPerson[] {
    return (this._DATA.performer || []).slice()
  }

  /**
   * Return an object representing all social network profiles of this conference.
   * @returns all this conference’s social media networks
   */
  getSocialAll(): Hyperlink[] {
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
	 * @returns HTML output
	 */
	view_hero(): string {
		return new xjs.DocumentFragment(hero_processor.process({
			...this._DATA,
			location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
		})).innerHTML()
	}
	/**
	 * Return an `<aside>` element with other year backdrop marking up this conference’s main info.
	 * @returns HTML output
	 */
	view_otherYear(): string {
		return new xjs.DocumentFragment(otheryear_processor.process({
			...this._DATA,
			location: this._DATA.location && this._DATA.location[0] || { "@type": "PostalAddress" },
		})).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link Pass} items.
	 * @param   queue a list of pass names, in the correct order
	 * @returns HTML output
	 */
	view_pass(queue?: Queue): string {
		let items = this.getPassesAll().filter((item) => (queue) ? queue.itemListElement.includes(item.name) : true)
		return new xjs.DocumentFragment(list_pass_processor.process(items, { conference: this._DATA })).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component containing the legend of registration periods.
	 * @returns HTML output
	 */
	view_registrationLegend(): string {
		return new xjs.DocumentFragment(list_registrationicon_processor.process(this.getRegistrationPeriodsAll())).innerHTML()
	}
	/**
	 * Return a `xDateblock` component marking up this conference’s important dates.
	 * @param   starred do you want only starred dates to display?
	 * @returns HTML output
	 */
	view_importantDates(starred = false): string {
		return new xjs.DocumentFragment(dateblock_processor.process(
			(this._DATA.potentialAction || []).filter((d) => (starred) ? d.$starred : true)
		)).innerHTML()
	}
	/**
	 * Return an `<.o-Tablist[role="tablist"]>` marking up this conference’s program sessions.
	 * Each tab contains a Program Heading Component
	 * and its panel contains a Time Block Component for that date.
	 * @param   id unique id for form elements
	 * @param   starred do you want only starred sessions to display?
	 * @returns HTML output
	 */
	view_program(id: string, starred = false): string {
		return new xjs.DocumentFragment(program_processor.process(
			(this._DATA.subEvent || []).filter((s) => (starred) ? s.$starred : true),
			{ id, starred }
		)).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link ConfPerson} items.
	 * @param   queue a list of person ids, in the correct order
	 * @returns HTML output
	 */
	view_speaker(queue?: Queue): string {
		let items = this.getSpeakersAll().filter((item) => (queue) ? queue.itemListElement.includes(item.identifier) : true)
		return new xjs.DocumentFragment(list_speaker_processor.process(items)).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component, containing {@link Venue} items.
	 * @param   queue a list of venue titles, in the correct order
	 * @returns HTML output
	 */
	view_venue(queue?: Queue): string {
		let items = this.getVenuesAll().filter((item) => (queue) ? queue.itemListElement.includes(item.description) : true)
		return new xjs.DocumentFragment(list_venue_processor.process(items)).innerHTML()
	}
	/**
	 * Return a list of `<section.c-SupporterBlock>` components containing this conference’s supporters
	 * that have the specified levels.
	 * @param   queue a list of supporter level names, in the correct order
	 * @param   small should logo sizing be overridden to small?
	 * @returns HTML output
	 */
	view_supporterLevel(queue?: Queue, small = false): string {
		let items = (this._DATA.$supporterLevels || []).filter((offer) => (queue) ? queue.itemListElement.includes(offer.name) : true)
		return new xjs.DocumentFragment(list_supporterLevel_processor.process(items, { small, conference: this })).innerHTML()
	}
	/**
	 * Return a list of `<div>` elements marking up this conference’s exhibitors.
	 * @returns HTML output
	 */
	view_exhibitorList(): string {
		return new xjs.DocumentFragment(list_exhibitor_processor.process(this._DATA.$exhibitors || [])).innerHTML()
	}
	/**
	 * Return a `<ul>` element, containing conference chairs and/or co-chairs.
	 * Parameter `data` should be of type `Array<{@link http://schema.org/Person|sdo.Person}>`.
	 * @returns HTML output
	 */
	view_chair(): string {
		return new xjs.DocumentFragment(list_chair_processor.process(this._DATA.organizer || [])).innerHTML()
	}
}
