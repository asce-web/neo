import * as sdo from 'schemaorg-jsd/dist/schemaorg'


export interface AttendeeType extends sdo.Offer {
	name  : string;
	price?: number;
}


export interface Conference extends sdo.Organization {
	name     : string;
	url      : string;
	startDate: string;
	endDate ?: string;
	location : sdo.PostalAddress;
	/** buttons to put in the hero block */
	$heroButtons?: Hyperlink[];
}

export interface ConfPage extends sdo.WebPage {
	hasPart?: sdo.WebPage|sdo.WebPage[];
}

export interface ConfSite extends sdo.Product, sdo.WebPage {
	name: string;
	url : string;
}

export interface Exhibitor extends sdo.Organization {
	name: string;
	url : string;
	logo: string;
	/** the booth number of the exhibitor */
	$booth: number;
	/** does the exhibitor also happen to be a sponsor? */
	$isSponsor?: boolean;
}

/** A hyperlink HTML element. */
export interface Hyperlink extends sdo.WebPageElement {
	/** The textual content of the link. */
	text: string;
	/** The href of the link. */
	url: string;
	/** The name or identifier of the social media service (used for icons). */
	name?: string
}

export interface ImportantDate extends sdo.Action {
	name     : string;
	startTime: string;
	endTime  : string;
}

export interface Pass extends sdo.AggregateOffer {
	name: string;
	/** attendee types of the pass */
	offers: AttendeeType[];
}

export interface ConfPerson extends sdo.Person {
	/** the string name of this person */
	name?: string;
	/** a unique identifier of this person */
	identifier  : string;
	/** the person’s first name */
	givenName   : string;
	/** the person’s last name */
	familyName  : string;
	/** an organization that this person is affiliated with */
	affiliation?: sdo.Organization;
	/** this person’s job title */
	jobTitle?: string; // TODO schemaorg-jsd:`Person#jobTitle`
	/** the person’s social media links */
	$social?: Hyperlink[];
}

export interface Session extends sdo.Event {
	name     : string;
	startDate: string;
	endDate  : string;
}

export interface Supporter extends sdo.Organization {
	name: string;
	url : string;
	logo: string;
}

export interface SupporterLevel extends sdo.Offer {
	name: string;
	/** if given, either `Small`, `Medium`, or `Large`; the logo size to render */
	$logosize? : string; // TODO make this an enum
	/** is the level awarded to financial contributors? */
	$isSponsor?: boolean;
}

export interface RegistrationPeriod extends sdo.AggregateOffer {
	name: string;
	/** the icon keyword of this registration period */
	$icon?: string;
	availabilityStarts?: string; // TODO schemaorg-jsd:`Offer#availabilityStarts`
	availabilityEnds  ?: string; // TODO schemaorg-jsd:`Offer#availabilityEnds`
}

export interface Venue extends sdo.Accommodation {
	name: string;
	/** the label or title of the venue */
	description: string;
	address?: sdo.PostalAddress;
	/** a call-to-action link */
	$cta?: Hyperlink;
}
