import * as sdo from 'schemaorg-jsd/dist/schemaorg'


/**
 * Types of attendees that can purchase passes (usually based on membership).
 */
export interface AttendeeType extends sdo.Offer {
	/** The name of the attendee type. */
	name: string;
	/** The price for the attendee type, given a certain pass and registration period. */
	price: number;
}


/**
 * A single conference on a website.
 */
export interface Conference extends sdo.Event {
	/** The conference name. */
	name: string;
	/** The conference theme. */
	description?: string;
	/** A blurb promoting this conference, if it’s the previous/next conference in a series. */
	disambiguatingDescription?: string;
	/** An absolute URL for the conference homepage. */
	url: string;
	/** The hero image. */
	image?: string;
	/** The start date of this conference, in ISO string format. */
	startDate: string;
	/**
	 * The end date of this conference, in ISO string format.
	 * @default this.startDate
	 */
	endDate?: string;
	/**
	 * A list of locations of this conference.
	 * The first entry is the promoted location;
	 * subsequent entries are other venues.
	 * @todo FIXME the code should match this description
	 */
	location : sdo.PostalAddress;
	/** A list of registration periods. */
	offers?: RegistrationPeriod[];
	/**
	 * The name of an existing offer active at this time.
	 * @todo TODO dynamically use the current date instead
	 */
	$currentRegistrationPeriod?: string;
	/** A list of important dates. */
	potentialAction?: ImportantDate[];
	/** A list of program sessions. */
	subEvent?: Session[];
	/** A list of speakers at the conference. */
	performer?: ConfPerson[];
	/**
	 * A list of supporters including non-sponsoring organizations.
	 * NOTE: Itemprop `funder` is used instead for financially sponsoring organizations.
	 */
	sponsor?: Supporter[];
	/** A list of exhibitors. */
	$exhibitors?: Exhibitor[];
	/** A list of organizers: chairpersons, steering committee members,
		or other persons who are responsible for organizing the conference. */
	organizer?: ConfPerson[];
	/** The passes belonging to this conference. */
	$passes?: Pass[];
	/** A list of supporter levels. */
	$supporterLevels?: SupporterLevel[];
	/** A list of links serving as action buttons in the Hero section. */
	$heroButtons?: Hyperlink[];
	/** A list of social media links for this conference. */
	$social?: Hyperlink[];
}

/**
 * A basic page of content on a conference site.
 * @todo  FIXME make `hasPart` an array only
 */
export interface ConfPage extends sdo.WebPage {
	/** The page name. */
	name: string;
	/** The root-relative URL of this page. */
	url: string;
	/** Subpage(s) of this page. */
	hasPart?: ConfPage|ConfPage[];
}

/** Any person entered into the system. */
export interface ConfPerson extends sdo.Person {
	/** A string representation of this person’s name. */
	name?: string;
	/** A unique identifier of this person. */
	identifier: string;
	/** This person’s first name. */
	givenName: string;
	/** This person’s last name. */
	familyName: string;
	/** This person’s affiliated organization. */
	affiliation?: sdo.Organization;
	/** This person’s job title. */
	jobTitle?: string;
	/** A photo of this person. */
	image?: string;
	/** A list of social media contact links for this person. */
	$social?: Hyperlink[];
}

/**
 * A single website hosting a series of conferences.
 */
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
	logo?: string;
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

/**
 * An organization exhibiting at a conference.
 */
export interface Exhibitor extends sdo.Organization {
	/** The name of this exhibitor. */
	name: string;
	/** The URL of this exhibitor’s website. */
	url : string;
	/** This exhibitor’s logo. */
	logo: string;
	/**
	 * The booth number of this exhibitor.
	 * @type {integer}
	 */
	$booth: number;
	/** Does this exhibitor also happen to be a sponsor? */
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

/**
 * A significant date leading up to or involved in a conference event.
 */
export interface ImportantDate extends sdo.Action {
	/** The name of this important date. */
	name: string;
	/** The date of this important date, or the start date of this important date range. */
	startTime: string;
	/**
	 * The end date of this important date range.
	 * @default this.startTime
	 */
	endTime?: string;
}

export interface Pass extends sdo.AggregateOffer {
	/** The pass name. */
	name: string;
	/** A short description of this pass. */
	description?: string;
	/** Further details of this pass. */
	disambiguatingDescription?: string;
	/** Types of attendees that can purchase this pass (usually based on membership). */
	offers: AttendeeType[];
}

/**
 * A time period in which a pass offer is available.
 */
export interface RegistrationPeriod extends sdo.AggregateOffer {
	/** The name of this registration period. */
	name: string;
	/** The start date of this registration period. */
	availabilityStarts?: string;
	/** The end date of this registration period. */
	availabilityEnds?: string;
	/** The keyword of an icon representing this registration period. */
	$icon?: string;
}

/**
 * A conference program event.
 */
export interface Session extends sdo.Event {
	/** The name of this session. */
	name: string;
	/** The start time of this session. */
	startDate: string;
	/**
	 * The end time of this session.
	 * @default this.startDate
	 */
	endDate?: string;
}

/**
 * An organization supporting a conference.
 */
export interface Supporter extends sdo.Organization {
	/** The name of this supporter. */
	name: string;
	/** The URL of this supporter’s website. */
	url : string;
	/** This supporter’s logo. */
	logo: string;
	/** A classification of this supporter. */
	$level: string;
}

/**
 * A classification of supporting organizations to a conference.
 */
export interface SupporterLevel extends sdo.Offer {
	name: string;
	/** The sizing of this level’s logos on the page. */
	$logosize? : 'Small'|'Medium'|'Large';
	/** Is the level awarded to financial contributors? */
	$isSponsor?: boolean;
}

/**
 * A building location and address related to a conference.
 */
export interface Venue extends sdo.Accommodation {
	/** The name of this venue or hotel. */
	name: string;
	/** The label or title of this venue. */
	description: string;
	/** The venue address. */
	address: sdo.PostalAddress;
	/** A photo of this venue. */
	photo?: { url: string; };
	/** A link to direct users to take action. */
	$cta?: Hyperlink;
}
