import * as xjs from 'extrajs-dom'
import * as sdo from 'schemaorg-jsd/dist/schemaorg' // TODO use an index file

import {
	Conference as ConferenceSchema,
	ConfPerson,
	Hyperlink,
	Pass,
	Queue,
	RegistrationPeriod,
	Venue,
} from '../interfaces'
import xDateBlock            from '../tpl/dateblock.tpl'
import xHero                 from '../tpl/hero.tpl'
import xOtherYear            from '../tpl/otheryear.tpl'
import xProgram              from '../tpl/program.tpl'
import xListChair            from '../tpl/list-chair.tpl'
import xListExhibitor        from '../tpl/list-exhibitor.tpl'
import xListPass             from '../tpl/list-pass.tpl'
import xListRegistrationIcon from '../tpl/list-registrationicon.tpl'
import xListSpeaker          from '../tpl/list-speaker.tpl'
import xListSupporterLevel   from '../tpl/list-supporterlevel.tpl'
import xListVenue            from '../tpl/list-venue.tpl'


/**
 * A wrapper for a {@link ConferenceSchema} event, with supplemental methods.
 */
export default class Conference {
	/** All the data for this object. */
	private readonly _DATA: ConferenceSchema;

  /**
   * Construct a new Conference object.
   * @param   jsondata all the data for this object
   */
  constructor(jsondata: ConferenceSchema) {
    this._DATA = jsondata
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
    return new Date(this._DATA.startDate)
  }

  /**
   * The ending date of this conference.
   */
  get endDate(): Date {
    return new Date(this._DATA.endDate || this._DATA.startDate)
  }

  /**
   * Get the promoted location of this conference.
   *
   * The promoted location is not necessarily the actual postal address of the conference,
   * but rather a major city nearest to the conference used for
   * promotional and advertising purposes.
   */
	get promoLoc(): sdo.PostalAddress&{ image?: string; }|null {
		return this._DATA.$promotedLocation || null
	}

  /**
   * The location image of this conference.
   */
	get promoLocImage(): string|null {
		return this.promoLoc && this.promoLoc.image || null
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
		return new xjs.DocumentFragment(xHero.process(this._DATA)).innerHTML()
	}
	/**
	 * Return an `<aside>` element with other year backdrop marking up this conference’s main info.
	 * @returns HTML output
	 */
	view_otherYear(): string {
		return new xjs.DocumentFragment(xOtherYear.process(this._DATA)).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link Pass} items.
	 * @param   queue a list of pass names, in the correct order
	 * @returns HTML output
	 */
	view_pass(queue?: Queue): string {
		let items = this.getPassesAll().filter((item) => (queue) ? queue.itemListElement.includes(item.name) : true)
		return new xjs.DocumentFragment(xListPass.process(items, { conference: this._DATA })).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component containing the legend of registration periods.
	 * @returns HTML output
	 */
	view_registrationLegend(): string {
		return new xjs.DocumentFragment(xListRegistrationIcon.process(this.getRegistrationPeriodsAll())).innerHTML()
	}
	/**
	 * Return a `xDateblock` component marking up this conference’s important dates.
	 * @param   starred do you want only starred dates to display?
	 * @returns HTML output
	 */
	view_importantDates(starred = false): string {
		return new xjs.DocumentFragment(xDateBlock.process(
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
		return new xjs.DocumentFragment(xProgram.process(
			(this._DATA.subEvent || []).filter((s) => (starred) ? s.$starred : true),
			{ id }
		)).innerHTML()
	}
	/**
	 * Return a `<ul.o-ListStacked>` component, containing {@link ConfPerson} items.
	 * @param   queue a list of person ids, in the correct order
	 * @returns HTML output
	 */
	view_speaker(queue?: Queue): string {
		let items = this.getSpeakersAll().filter((item) => (queue) ? queue.itemListElement.includes(item.identifier) : true)
		return new xjs.DocumentFragment(xListSpeaker.process(items)).innerHTML()
	}
	/**
	 * Return a `<ul.c-Alert>` component, containing {@link Venue} items.
	 * @param   queue a list of venue titles, in the correct order
	 * @returns HTML output
	 */
	view_venue(queue?: Queue): string {
		let items = this.getVenuesAll().filter((item) => (queue) ? queue.itemListElement.includes(item.description) : true)
		return new xjs.DocumentFragment(xListVenue.process(items)).innerHTML()
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
		return new xjs.DocumentFragment(xListSupporterLevel.process(items, { small, conference: this._DATA })).innerHTML()
	}
	/**
	 * Return a list of `<div>` elements marking up this conference’s exhibitors.
	 * @returns HTML output
	 */
	view_exhibitorList(): string {
		return new xjs.DocumentFragment(xListExhibitor.process(this._DATA.$exhibitors || [])).innerHTML()
	}
	/**
	 * Return a `<ul>` element, containing conference chairs and/or co-chairs.
	 * Parameter `data` should be of type `Array<{@link http://schema.org/Person|sdo.Person}>`.
	 * @returns HTML output
	 */
	view_chair(): string {
		return new xjs.DocumentFragment(xListChair.process(this._DATA.organizer || [])).innerHTML()
	}
}
