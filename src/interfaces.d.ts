import * as sdo from 'schemaorg-jsd/dist/schemaorg'


/** Types of attendees that can purchase passes (usually based on membership). */
export interface AttendeeType extends sdo.Offer {
	/** The name of the attendee type. */
	name  : string;
	/** The price for the attendee type given a certain pass and registration period. */
	price?: number;
}


/** A single conference on a website. */
export interface Conference extends sdo.Organization {
	/** The conference name. */
	name: string;
	/** The conference theme. */
	// description?;
	/** A blurb promoting the previous/next conference. */
	// disambiguatingDescription?;
	/** An absolute URL for the conference homepage. */
	url: string;
	/** The hero image. */
	// image?;
	/** The starting date of this conference, in ISO string format. */
	startDate: string;
	/** The ending date of this conference, in ISO string format. */
	endDate ?: string;
	/**
	 * A list of locations of this conference.
	 * The first entry is the promoted location;
	 * subsequent entries are other venues.
	 * @todo FIXME the code should match this description
	 */
	location : sdo.PostalAddress;
	/** A list of registration periods. */
	// offers?;
	/**
	 * The name of an existing offer active at this time.
	 * @todo TODO dynamically use the current date instead
	 */
	// $currentRegistrationPeriod?: Pass[];
	/** A list of important dates. */
	// potentialAction?;
	/** A list of program sessions. */
	// subEvent?;
	/** A list of speakers at the conference. */
	// performer?;
	/**
	 * A list of supporters including non-sponsoring organizations.
	 * NOTE: Itemprop `funder` is used instead for financially sponsoring organizations.
	 */
	// sponsor?;
	/** A list of exhibitors. */
	// $exhibitors?: Exhibitor[];
	/** A list of organizers: chairpersons, steering committee members,
		or other persons who are responsible for organizing the conference. */
	// organizer?;
	/** The passes belonging to this conference. */
	// $passes?: Pass[];
	/** A list of supporter levels. */
	// $supporterLevels?: SupporterLevel[];
	/** A list of links serving as action buttons in the Hero section. */
	$heroButtons?: Hyperlink[];
	/** A list of social media links for this conference. */
	// $social?: Hyperlink[];
}

export interface ConfPage extends sdo.WebPage {
	hasPart?: sdo.WebPage|sdo.WebPage[];
}

/** Any person entered into the system. */
export interface ConfPerson extends sdo.Person {
	/** A string representation of this person’s name. */
	name?: string;
	/** A unique identifier of this person. */
	identifier: string;
	/** the person’s first name */
	givenName   : string;
	/** the person’s last name */
	familyName  : string;
	/** an organization that this person is affiliated with */
	affiliation?: sdo.Organization;
	/** this person’s job title */
	jobTitle?: string; // TODO schemaorg-jsd:`Person#jobTitle`
	/** A list of social media contact links for this person. */
	$social?: Hyperlink[];
}

/** A single website hosting a series of conferences. */
export interface ConfSite extends sdo.Product, sdo.WebPage {
	/** The unique, absolute URL of the website. */
	'@id': string;
	/** The website name. */
	name: string;
	/** The website slogan (or tagline). */
	description?: string;
	/** An absolute or root-relative URL for the landing page of this website. */
	url: string;
	/** Keywords for this website. */
	// keywords?;
	/** The website logo. */
	// logo?;
	/** Two color strings: `[primary, secondary]`, in formats supported by `require('extrajs-color')`. */
	// color?: [string, string];
	/** The publisher/brand responsible for this website. */
	// brand?;

	/** All conferences present on this website. */
	// $conferences?: Conference[];
	/** The current  conference in this series. Must match the 'url' property of an already-added conference. */
	// $currentConference?: string;
	/** The previous conference in this series. Must match the 'url' property of an already-added conference. */
	// $previousConference?: string;
	/** The next     conference in this series. Must match the 'url' property of an already-added conference. */
	// $nextConference?: string;
	/** An array of lists, each whose items are string references to some objects that have been added to the site. */
	// $queues?: (sdo.ItemList & {
	//   name: string;
	//   itemListElement: string[]
	// })[];
}

/** An organization exhibiting at a conference. */
export interface Exhibitor extends sdo.Organization {
	name: string;
	url : string;
	logo: string;
	/** The booth number of the exhibitor. integer. */
	$booth: number;
	/** Does the exhibitor also happen to be a sponsor? */
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
	endTime ?: string;
}

export interface Pass extends sdo.AggregateOffer {
	name: string;
	// description?;
	// disambiguatingDescription?;
	/** Types of attendees that can purchase this pass (usually based on membership). */
	offers: AttendeeType[];
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

/** A classification of supporting organizations to a conference.
	Organizations might or might not be financial sponsors. */
export interface SupporterLevel extends sdo.Offer {
	name: string;
	/** The sizing of this level’s logos on the page. */
	$logosize? : 'Small'|'Medium'|'Large';
	/** Is the level awarded to financial contributors? */
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
