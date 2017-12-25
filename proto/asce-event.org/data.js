//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the default site instance.
//- // Each microsite should have its own copy of this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


const Util               = require('../../class/Util.class.js')
const ConfSite           = require('../../class/ConfSite.class.js')
const ConfPage           = require('../../class/ConfPage.class.js')
const Person             = require('../../class/Person.class.js')

var jsondata = {
  "@context"   : "http://schema.org/",
  "@type"      : "WebPage",
  "name"       : "An ASCE Event",
  "url"        : "/sites/asce-event.org/",
  "description": "Optional Brand Slogan",
  "keywords"   : ["ASCE", "civil engineering", "convention"],
  "image"      : "./files/site-logo-white.png",
  "colors"     : ["#3fae2a", "#00a1e1"],
  "images"     : {
    "hero": "/proto/asce-event.org/files/cable-car.jpg",
    "city": "/proto/asce-event.org/files/portland.jpg",
    "prev": "/proto/asce-event.org/files/new-york.jpg",
    "next": "/proto/asce-event.org/files/new-orleans.jpg"
  },
  "conferences": {
"json2016": {
  "@context"   : "http://schema.org/",
  "@type"      : "Event",
  "name"       : "A 2016 Event",
  "url"        : "http://2016.asceconvention.org/",
  "description": "Where Engineering Dreams are Built.",
  "startDate"  : "2016-09-28T07:30",
  "endDate"    : "2016-10-01T17:00",
      "location": [
        {
          "@type": "PostalAddress",
          "addressLocality": "Portland",
          "addressRegion"  : "Oregon"
        },
        {
          "@type": "Place",
          "description": "Conference Venue",
          "name"       : "Orego Convention Center",
          "url"        : "https://www.oregoncc.org/",
          "address"    : {
            "@type": "PostalAddress",
            "streetAddress"  : "777 NE Martin Luther King, Jr. Blvd",
            "addressLocality": "Portland",
            "addressRegion"  : "Oregon",
            "postalCode"     : "97232"
          }
        },
        {
          "@type": "Place",
          "description": "Official Hotel",
          "name"       : "DoubleTree by Hilton Portland",
          "address"    : {
            "@type": "PostalAddress",
            "streetAddress"  : "1000 NE Multnomah St",
            "addressLocality": "Portland",
            "addressRegion"  : "Oregon",
            "postalCode"     : "97232"
          }
        },
        {
          "@type": "Place",
          "description": "Overflows",
          "name"       : "Courtyard Portland City Center",
          "address"    : {
            "@type": "PostalAddress",
            "streetAddress"  : "550 SW Oak St",
            "addressLocality": "Portland",
            "addressRegion"  : "Oregon",
            "postalCode"     : "97204"
          }
        }
      ],
    "offers": [
      {
        "@type"             : "AggregateOffer",
        "name"              : "Early Bird",
        "availabilityEnds"  : "2016-07-28",
        "$icon"             : "stars"
      },
      {
        "@type"             : "AggregateOffer",
        "name"              : "Advance",
        "availabilityStarts": "2016-07-29",
        "availabilityEnds"  : "2016-08-25",
        "$icon"             : "date_range"
      },
      {
        "@type"             : "AggregateOffer",
        "name"              : "Onsite",
        "availabilityStarts": "2016-08-26",
        "$icon"             : "account_balance"
      }
    ],
    "$currentRegistrationPeriod": "Early Bird",
    "$passes": [
      {
        "name": "Standard Pass",
        "description": "Members & Non-Members",
        "$attendeeTypes": ["Member", "Non-Member"],
        "$starred": true
      },
      {
        "name": "Speaker Pass",
        "description": "Speakers and Presenters",
        "$attendeeTypes": ["Member", "Non-Member"]
      },
      {
        "name": "Moderator Pass",
        "description": "Moderators",
        "$attendeeTypes": ["Member", "Non-Member"]
      },
      {
        "name": "Younger Member",
        "description": "Members 18–35",
        "$attendeeTypes": ["Member/Non-Member"],
        "$starred": true
      },
      {
        "name": "Student Pass",
        "description": "Undergraduates 18–24",
        "$fineprint" : "Full-time students must show valid ID onsite at the registration desk when picking up name badge.",
        "$attendeeTypes": ["Member/Non-Member"],
        "$starred": true
      },
      {
        "name": "Guest Pass",
        "description": "Speaker and Moderator Guests",
        "$attendeeTypes": ["Member/Non-Member"]
      },
      {
        "name": "Daily Pass",
        "description": "For One Day Only",
        "$attendeeTypes": ["Member", "Non-Member"]
      }
    ],
    "subEvent": [
      { "@type": "Event", "name": "Registration"                           , "startDate": "2016-09-28 10:00", "endDate": "2016-09-28 19:00"                                },
      { "@type": "Event", "name": "Technical Tours"                        , "startDate": "2016-09-28 10:30", "endDate": "2016-09-28 16:30", "$starred": true, "url": "#0" },
      { "@type": "Event", "name": "Short Courses"                          , "startDate": "2016-09-28 13:00", "endDate": "2016-09-28 17:00", "$starred": true, "url": "#0" },
      { "@type": "Event", "name": "Optional Tours"                         , "startDate": "2016-09-28 12:00", "endDate": "2016-09-28 17:00", "$starred": true, "url": "#0" },
      { "@type": "Event", "name": "Opening Welcome Reception"              , "startDate": "2016-09-28 17:30", "endDate": "2016-09-28 19:30"                                },
      { "@type": "Event", "name": "Community Service Project"              , "startDate": "2016-09-28 13:00", "endDate": "2016-09-28 17:00"                                },

      { "@type": "Event", "name": "Registration"                           , "startDate": "2016-09-29 07:00", "endDate": "2016-09-29 16:30"                                },
      { "@type": "Event", "name": "Student & Emerging Leaders Welcome"     , "startDate": "2016-09-29 07:30", "endDate": "2016-09-29 08:30"                                },
      { "@type": "Event", "name": "Opening Plenary Session"                , "startDate": "2016-09-29 08:30", "endDate": "2016-09-29 10:00", "$starred": true              },
      { "@type": "Event", "name": "Guest Program Orientation & Tour"       , "startDate": "2016-09-29 09:30", "endDate": "2016-09-29 15:30", "$starred": true              },
      { "@type": "Event", "name": "Beverage Break"                         , "startDate": "2016-09-29 10:00", "endDate": "2016-09-29 10:30"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-29 10:30", "endDate": "2016-09-29 11:30"                                },
      { "@type": "Event", "name": "Celebration of Leaders Luncheon"        , "startDate": "2016-09-29 11:45", "endDate": "2016-09-29 13:45", "$starred": true              },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-29 14:00", "endDate": "2016-09-29 15:30"                                },
      { "@type": "Event", "name": "Communities and Pavilion"               , "startDate": "2016-09-29 14:00", "endDate": "2016-09-29 18:00"                                },
      { "@type": "Event", "name": "Beverage Break"                         , "startDate": "2016-09-29 15:30", "endDate": "2016-09-29 16:00"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-29 16:00", "endDate": "2016-09-29 17:30"                                },
      { "@type": "Event", "name": "Optional Tour"                          , "startDate": "2016-09-29 18:45", "endDate": "2016-09-29 21:45", "$starred": true, "url": "#0" },

      { "@type": "Event", "name": "Registration"                           , "startDate": "2016-09-30 07:00", "endDate": "2016-09-30 16:30"                                },
      { "@type": "Event", "name": "Leadership & Society Awards Breakfast"  , "startDate": "2016-09-30 07:30", "endDate": "2016-09-30 08:30"                                },
      { "@type": "Event", "name": "Communities and Pavilion"               , "startDate": "2016-09-30 08:30", "endDate": "2016-09-30 17:00"                                },
      { "@type": "Event", "name": "ASCE Annual Business Meeting"           , "startDate": "2016-09-30 08:45", "endDate": "2016-09-30 09:45", "$starred": true              },
      { "@type": "Event", "name": "Beverage Break"                         , "startDate": "2016-09-30 09:45", "endDate": "2016-09-30 10:15"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-30 10:15", "endDate": "2016-09-30 11:45"                                },
      { "@type": "Event", "name": "Lunch on Your Own"                      , "startDate": "2016-09-30 11:45", "endDate": "2016-09-30 13:15"                                },
      { "@type": "Event", "name": "International Luncheon (ticketed)"      , "startDate": "2016-09-30 11:45", "endDate": "2016-09-30 13:15"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-30 13:15", "endDate": "2016-09-30 14:15"                                },
      { "@type": "Event", "name": "Optional Tour"                          , "startDate": "2016-09-30 13:00", "endDate": "2016-09-30 17:15", "$starred": true, "url": "#0" },
      { "@type": "Event", "name": "Industry Leaders Forum"                 , "startDate": "2016-09-30 14:30", "endDate": "2016-09-30 16:00", "$starred": true              },
      { "@type": "Event", "name": "Beverage Break"                         , "startDate": "2016-09-30 16:00", "endDate": "2016-09-30 16:30"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-09-30 16:30", "endDate": "2016-09-30 17:30"                                },
      { "@type": "Event", "name": "Theater Night Out"                      , "startDate": "2016-09-30 18:30", "endDate": "2016-09-30 21:30", "$starred": true              },

      { "@type": "Event", "name": "Registration"                           , "startDate": "2016-10-01 07:00", "endDate": "2016-10-01 14:30"                                },
      { "@type": "Event", "name": "Order of the Engineer Ceremony"         , "startDate": "2016-10-01 07:30", "endDate": "2016-10-01 08:15", "$starred": true              },
      { "@type": "Event", "name": "Optional Tour"                          , "startDate": "2016-10-01 08:45", "endDate": "2016-10-01 11:45"                  , "url": "#0" },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-10-01 08:30", "endDate": "2016-10-01 10:00"                                },
      { "@type": "Event", "name": "Communities and Pavilion"               , "startDate": "2016-10-01 08:30", "endDate": "2016-10-01 14:00"                                },
      { "@type": "Event", "name": "Concurrent Sessions"                    , "startDate": "2016-10-01 10:15", "endDate": "2016-10-01 11:45"                                },
      { "@type": "Event", "name": "ASCE Luncheon & Closing General Session", "startDate": "2016-10-01 12:00", "endDate": "2016-10-01 14:00", "$starred": true              },
      { "@type": "Event", "name": "Technical Tours"                        , "startDate": "2016-10-01 14:30", "endDate": "2016-10-01 17:30"                  , "url": "#0" }
    ],
    "potentialAction": [
      { "@type": "Action", "name": 'Optional Final Papers Due'     , "startTime": "2015-10-12"                          , "$starred": true                             },
      { "@type": "Action", "name": 'Early-Bird Registration Closes', "startTime": "2015-12-17"                          , "$starred": true, "url": "registration.html" },
      { "@type": "Action", "name": 'Advance Registration Closes'   , "startTime": "2016-01-12"                          , "$starred": true, "url": "registration.html" },
      { "@type": "Action", "name": 'Convention Begins'             , "startTime": "2016-06-12"                          , "$starred": true                             },
      { "@type": "Action", "name": 'Convention Ends'               , "startTime": "2016-06-15"                                                                         },
      { "@type": "Action", "name": 'Convention Dates'              , "startTime": "2016-09-28", "$endTime": "2016-10-01", "$starred": true                             }
    ],
    "performer": [
      {
        "@type": "Person",
        "identifier": "donna-fulman",
        "$name": {
          "givenName"      : "Donna",
          "additionalName" : "A.",
          "familyName"     : "Fulman",
          "honorificSuffix": "P.ASCE"
        },
        "image"      : "files/headshot1.jpg",
        "url"        : "#0",
        "email"      : "example@asce.org",
        "telephone"  : "+1(703)555-5555",
        "jobTitle"   : "Administrator of Interior Engineering",
        "affiliation": "German Chamber of Architects",
        "sameAs"     : [
          { "@type": "URL", "name": "linkedin", "url": "#0", "description": "Connect with Donna on LinkedIn" },
          { "@type": "URL", "name": "twitter" , "url": "#0", "description": "Follow @Donna on Twitter" },
          { "@type": "URL", "name": "facebook", "url": "#0", "description": "Donna’s Facebook Profile" },
          { "@type": "URL", "name": "google"  , "url": "#0", "description": "Donna’s Google+ Profile" },
          { "@type": "URL", "name": "youtube" , "url": "#0", "description": "Donna’s YouTube Channel" }
        ],
        "$starred": true
      },
      {
        "@type": "Person",
        "identifier": "rachel-falsetti",
        "$name": {
          "givenName"     : "Susan",
          "additionalName": "R.",
          "familyName"    : "Rowghani"
        },
        "image"      : "http://www.cisummit.org/sites/cisummit.org/files/susan-rowghani.jpg",
        "url"        : "#0",
        "email"      : "example@asce.org",
        "telephone"  : "+1(703)555-5555",
        "jobTitle"   : "Director of Water Engineering and Technical Services (WETS)",
        "affiliation": "Los Angeles Department of Water and Power",
        "sameAs"     : [
          { "@type": "URL", "name": "linkedin", "url": "#0", "description": "Connect with Donna on LinkedIn" },
          { "@type": "URL", "name": "twitter" , "url": "#0", "description": "Follow @Donna on Twitter" },
          { "@type": "URL", "name": "facebook", "url": "#0", "description": "Donna’s Facebook Profile" },
          { "@type": "URL", "name": "google"  , "url": "#0", "description": "Donna’s Google+ Profile" },
          { "@type": "URL", "name": "youtube" , "url": "#0", "description": "Donna’s YouTube Channel" }
        ]
      },
      {
        "@type": "Person",
        "identifier": "diego-alvarez",
        "$name": {
          "givenName" : "Diego",
          "familyName": "Alvarez"
        },
        "image"      : "http://www.cisummit.org/sites/cisummit.org/files/diego-alvarez.jpg",
        "url"        : "#0",
        "email"      : "example@asce.org",
        "telephone"  : "+1(703)555-5555",
        "jobTitle"   : "Director of Modernization and Development",
        "affiliation": "Planning & Development Group (PDG), Los Angeles World Airports",
        "sameAs"     : [
          { "@type": "URL", "name": "linkedin", "url": "#0", "description": "Connect with Donna on LinkedIn" },
          { "@type": "URL", "name": "twitter" , "url": "#0", "description": "Follow @Donna on Twitter" },
          { "@type": "URL", "name": "facebook", "url": "#0", "description": "Donna’s Facebook Profile" },
          { "@type": "URL", "name": "google"  , "url": "#0", "description": "Donna’s Google+ Profile" },
          { "@type": "URL", "name": "youtube" , "url": "#0", "description": "Donna’s YouTube Channel" }
        ],
        "$starred": true
      },
      {
        "@type": "Person",
        "identifier": "jeremy-boak",
        "$name": {
          "givenName" : "Jeremy",
          "familyName": "Boak"
        },
        "image"      : "http://www.aei-conference.org/sites/aei-conference.org/files/jeremy-boak.jpg",
        "url"        : "#0",
        "email"      : "example@asce.org",
        "telephone"  : "+1(703)555-5555",
        "jobTitle"   : "Director",
        "affiliation": "Oklahoma Geological Survey",
        "sameAs"     : [
          { "@type": "URL", "name": "linkedin", "url": "#0", "description": "Connect with Donna on LinkedIn" },
          { "@type": "URL", "name": "twitter" , "url": "#0", "description": "Follow @Donna on Twitter" },
          { "@type": "URL", "name": "facebook", "url": "#0", "description": "Donna’s Facebook Profile" },
          { "@type": "URL", "name": "google"  , "url": "#0", "description": "Donna’s Google+ Profile" },
          { "@type": "URL", "name": "youtube" , "url": "#0", "description": "Donna’s YouTube Channel" }
        ]
      },
      {
        "@type": "Person",
        "identifier": "muralee-muraleetharan",
        "$name": {
          "givenName" : "Muralee",
          "familyName": "Muraleetharan"
        },
        "image"      : "http://www.aei-conference.org/sites/aei-conference.org/files/muralee-muraleetharan.jpg",
        "url"        : "#0",
        "email"      : "example@asce.org",
        "telephone"  : "+1(703)555-5555",
        "jobTitle"   : "Geotechnical Engineering Professor, Kimmell-Bernard Chair in Engineering, David Ross Boyd and Presidential Professor",
        "affiliation": "University of Oklahoma",
        "sameAs"     : [
          { "@type": "URL", "name": "linkedin", "url": "#0", "description": "Connect with Donna on LinkedIn" },
          { "@type": "URL", "name": "twitter" , "url": "#0", "description": "Follow @Donna on Twitter" },
          { "@type": "URL", "name": "facebook", "url": "#0", "description": "Donna’s Facebook Profile" },
          { "@type": "URL", "name": "google"  , "url": "#0", "description": "Donna’s Google+ Profile" },
          { "@type": "URL", "name": "youtube" , "url": "#0", "description": "Donna’s YouTube Channel" }
        ],
        "$starred": true
      }
    ],
    "sponsor": [
      {
        "@type" : "Organization",
        "name"  : "ASCE Foundation",
        "url"   : "http://www.ascefoundation.org/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/asce-foundation-logo.png",
        "$level": "Platinum"
      },
      {
        "@type" : "Organization",
        "name"  : "Bentley",
        "url"   : "https://www.bentley.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bentley-logo.png",
        "$level": "Platinum"
      },
      {
        "@type" : "Organization",
        "name"  : "Pennoni",
        "url"   : "https://www.pennoni.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pennoni-50th-anniversary-logo.png",
        "$level": "Silver"
      },
      {
        "@type" : "Organization",
        "name"  : "Innovyze",
        "url"   : "http://www.innovyze.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/innovyze-logo.png",
        "$level": "Silver"
      },
      {
        "@type" : "Organization",
        "name"  : "Fasten Group",
        "url"   : "http://www.chinafasten.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/fasten-group-logo.png",
        "$level": "Bronze"
      },
      {
        "@type" : "Organization",
        "name"  : "David Evans and Associates, Inc",
        "url"   : "http://www.deainc.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/david-evans-associates-logo.png",
        "$level": "Bronze"
      },
      {
        "@type" : "Organization",
        "name"  : "KCI Technologies",
        "url"   : "http://www.kci.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kci-technologies-logo.png",
        "$level": "Bronze"
      },
      {
        "@type" : "Organization",
        "name"  : "McCormick & Taylor",
        "url"   : "http://www.mccormicktaylor.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/mccormick-taylor-logo.png",
        "$level": "Bronze"
      },
      {
        "@type" : "Organization",
        "name"  : "Rutgers Center for Advanced Infrastructure and Transportation",
        "url"   : "http://cait.rutgers.edu/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/rutgers-cait-logo.png",
        "$level": "Copper"
      },
      {
        "@type" : "Organization",
        "name"  : "Kimley-Horn",
        "url"   : "http://www.kimley-horn.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kimley-horn-logo.png",
        "$level": "Copper"
      },
      {
        "@type" : "Organization",
        "name"  : "Christopher B. Burke Engineering, Ltd",
        "url"   : "http://cbbel.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/christopher-b-burke-engineering-logo.png",
        "$level": "Copper"
      },
      {
        "@type" : "Organization",
        "name"  : "Bank of America",
        "url"   : "http://www.asce.org/member_advantages/#b",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bank-of-america-logo.jpg",
        "$level": "Corporate"
      },
      {
        "@type" : "Organization",
        "name"  : "Geico",
        "url"   : "https://www.geico.com/landingpage/member-discount/?logo=00774",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/geico-asce-convention-logo.png",
        "$level": "Corporate"
      },
      {
        "@type" : "Organization",
        "name"  : "Pearl Insurance",
        "url"   : "http://asceinsurance.com/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pearl-insurance-logo.jpg",
        "$level": "Corporate"
      },
      {
        "@type" : "Organization",
        "name"  : "UPS",
        "url"   : "http://savewithups.com/asce/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/ups-logo.jpg",
        "$level": "Corporate"
      },
      {
        "@type" : "Organization",
        "name"  : "Keller North America",
        "url"   : "http://www.keller.co.uk/",
        "image" : "http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/keller-na-logo.png",
        "$level": "Corporate"
      },
      {
        "@type" : "Organization",
        "name"  : "American Cast Iron Pipe Company",
        "url"   : "http://www.american-usa.com/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/american-cast-iron-pipe-company-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "Cardno",
        "url"   : "http://www.cardno.com/en-us/Pages/Home.aspx",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/cardno-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "Innovyze",
        "url"   : "http://innovyze.com/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/innovyze-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "Plastics Pipe Institute",
        "url"   : "http://plasticpipe.org/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/plastics-pipe-institute-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "Pure Technologies",
        "url"   : "https://www.puretechltd.com/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/pure-technologies-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "Structural Technologies",
        "url"   : "http://www.structuraltechnologies.com/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/structural-technologies-logo.png",
        "$level": "Charter Members"
      },
      {
        "@type" : "Organization",
        "name"  : "GIEES",
        "url"   : "http://giees.org/",
        "image" : "http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/giees-coop-logo.png",
        "$level": "Cooperating Organizations"
      }
    ],
    "$exhibitors": [
      {
        "@type": "Organization",
        "name"       : "AISC",
        "url"        : "https://www.aisc.org/",
        "image"      : "https://www.aisc.org/globalassets/aisc/images/logos/aisc_logo-180.png",
        "$booth"     : 25,
        "description": "The American Institute of Steel Construction (AISC),\
          headquartered in Chicago, is a not-for-profit technical institute and\
          trade association established in 1921 to serve the structural steel design community\
          and construction industry in the United States."
      },
      {
        "@type": "Organization",
        "name"       : "Geopier Foundations",
        "url"        : "http://www.geopier.com/",
        "image"      : "http://www.geopier.com/~/media/Images/Geopier/Tensar_GEOPIER_Logo_186x80.ashx?h=80&la=en&w=186",
        "$booth"     : 16,
        "description": "Geopier developed Rammed Aggregate Pier® (RAP) Systems\
          as efficient and cost effective intermediate foundation solutions for\
          the support of settlement sensitive structures."
      },
      {
        "@type": "Organization",
        "name"       : "Geico",
        "url"        : "https://www.geico.com/landingpage/member-discount/?logo=00774",
        "image"      : "https://www.geico.com/public/experiments/3.0/images/geico-logo.svg",
        "$booth"     : 9,
        "$isSponsor" : true,
        "description": "See how much more you could save with a special discount on auto insurance."
      }
    ],
    "organizer": [
      {
        "@type": "Person",
        "identifier": "thomas-mccollough",
        "$name": {
          "givenName"      : "Thomas",
          "additionalName" : "J.",
          "familyName"     : "McCollough",
          "honorificSuffix": "P.E., M.ASCE"
        },
        "affiliation": "HDR Engineering, Inc."
      },
      {
        "@type": "Person",
        "identifier": "stephen-dickenson",
        "$name": {
          "honorificPrefix": "Dr.",
          "givenName"      : "Stephen",
          "additionalName" : "E.",
          "familyName"     : "Dickenson",
          "honorificSuffix": "Ph.D., P.E., D.PE, M.ASCE"
        },
        "affiliation": "HNTB Corporation"
      }
    ],
    "sameAs": [
      { "@type": "URL", "name": "twitter" , "url": "https://twitter.com/hashtag/#asce2016", "description": "Follow #ASCE2016 on Twitter" },
      { "@type": "URL", "name": "google"  , "url": "#0"                                   , "description": "Follow #ASCE2016 on Google+" },
      { "@type": "URL", "name": "facebook", "url": "#0"                                   , "description": "Follow #ASCE2016 on Facebook" },
    ]
},
"json2015": {
  "@context"   : "http://schema.org/",
  "@type"      : "Event",
  "name"       : "A 2015 Event",
  "url"        : "http://2015.asceconvention.org/",
  "description": "Building on the Past.",
  "startDate"  : "2015-10-11T07:30",
  "endDate"    : "2015-10-14T17:00",
      "location": [
        {
          "@type": "PostalAddress",
          "addressLocality": "New York",
          "addressRegion"  : "New York"
        },
    {
      "@type": "Place",
      "description": "Conference Venue",
      "name"       : "New York Marriott Marquis",
      "url"        : 'http://www.marriott.com/hotels/travel/nycmq-new-york-marriott-marquis/',
      "address"    : {
        "@type": "PostalAddress",
        "streetAddress"  : "1535 Broadway",
        "addressLocality": "New York",
        "addressRegion"  : "New York",
        "postalCode"     : "10036"
      }
    }
  ]
},
"json2017": {
  "@context"   : "http://schema.org/",
  "@type"      : "Event",
  "name"       : "A 2017 Event",
  "url"        : "http://2017.asceconvention.org/",
  "description": "The Future of Civil Engineering.",
  "startDate"  : "2017-10-08T07:30",
  "endDate"    : "2017-10-11T17:00",
      "location": [
        {
          "@type": "PostalAddress",
          "addressLocality": "New Orleans",
          "addressRegion"  : "Louisiana"
        },
    {
      "@type": "Place",
      "description": "Conference Venue",
      "name"       : "New Orleans Mariott",
      "address"    : {
        "@type": "PostalAddress",
        "streetAddress"  : "555 Canal Street",
        "addressLocality": "New Orleans",
        "addressRegion"  : "Louisiana",
        "postalCode"     : "70130"
      }
    }
  ]
}
  },
  "currentConference" : "json2016",
  "previousConference": "json2015",
  "nextConference"    : "json2017",
  "sameAs": [
    { "@type": "URL", "name": "twitter" , "url": "//twitter.com/ASCE"    , "description": "Follow ASCE on Twitter" },
    { "@type": "URL", "name": "google"  , "url": "//plus.google.com/ASCE", "description": "Follow ASCE on Google+" },
    { "@type": "URL", "name": "facebook", "url": "//facebook.com/ASCE"   , "description": "Like ASCE on Facebook" },
    { "@type": "URL", "name": "linkedin", "url": "//linkedin.com/ASCE"   , "description": "Connect with ASCE on LinkedIn" },
    { "@type": "URL", "name": "youtube" , "url": "//youtube.com/ASCE"    , "description": "Watch ASCE on YouTube" }
  ]
}


    var site = new ConfSite(jsondata)
      .init()


    // REVIEW TODO move below Speakers
    // site.currentConference
    //   .addSupporterLevel(new SupporterLevel('Platinum' , SupporterLevel.LogoSize.LARGE))
    //   .addSupporterLevel(new SupporterLevel('Corporate', SupporterLevel.LogoSize.LARGE))
    //   .addSupporterLevel(new SupporterLevel('Silver'   , SupporterLevel.LogoSize.MEDIUM))
    //   .addSupporterLevel(new SupporterLevel('Bronze'   , SupporterLevel.LogoSize.MEDIUM))
    //   .addSupporterLevel(new SupporterLevel('Copper'   , SupporterLevel.LogoSize.MEDIUM))
    //   .addSupporterLevel(new SupporterLevel('Charter Members', SupporterLevel.LogoSize.SMALL))
    //   .addSupporterLevel(new SupporterLevel('Cooperating Organizations', SupporterLevel.LogoSize.SMALL))
    //
    // site.currentConference
    //   .addSupporterLevelQueue('sponsors', ['Platinum', 'Corporate', 'Silver', 'Bronze', 'Copper'])
    //   .addSupporterLevelQueue('orgs', ['Charter Members', 'Cooperating Organizations'])
    //   .addSupporterLevelQueue('home-page', ['Platinum', 'Silver', 'Bronze'])
    //   .addSupporterLevelQueue('sponsors-page', ['Platinum', 'Corporate', 'Silver', 'Bronze', 'Copper', 'Charter Members', 'Cooperating Organizations'])

    //- site.currentConference
    //-   .setPrice('Early Bird', 'Standard Pass' , 'Member'    ,  745)
    //-   .setPrice('Early Bird', 'Standard Pass' , 'Non-Member',  845)
    //-   .setPrice('Advance'   , 'Standard Pass' , 'Member'    ,  845)
    //-   .setPrice('Advance'   , 'Standard Pass' , 'Non-Member',  945)
    //-   .setPrice('Onsite'    , 'Standard Pass' , 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Standard Pass' , 'Non-Member', 1045)
    //-   .setPrice('Early Bird', 'Speaker Pass'  , 'Member'    ,  645)
    //-   .setPrice('Early Bird', 'Speaker Pass'  , 'Non-Member',  745)
    //-   .setPrice('Advance'   , 'Speaker Pass'  , 'Member'    ,  745)
    //-   .setPrice('Advance'   , 'Speaker Pass'  , 'Non-Member',  845)
    //-   .setPrice('Onsite'    , 'Speaker Pass'  , 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Speaker Pass'  , 'Non-Member',  945)
    //-   .setPrice('Early Bird', 'Moderator Pass', 'Member'    ,  645)
    //-   .setPrice('Early Bird', 'Moderator Pass', 'Non-Member',  745)
    //-   .setPrice('Advance'   , 'Moderator Pass', 'Member'    ,  745)
    //-   .setPrice('Advance'   , 'Moderator Pass', 'Non-Member',  845)
    //-   .setPrice('Onsite'    , 'Moderator Pass', 'Member'    ,  945)
    //-   .setPrice('Onsite'    , 'Moderator Pass', 'Non-Member',  945)
    //-   .setPrice('Early Bird', 'Younger Member', 'Member/Non-Member',  645)
    //-   .setPrice('Advance'   , 'Younger Member', 'Member/Non-Member',  745)
    //-   .setPrice('Onsite'    , 'Younger Member', 'Member/Non-Member',  845)
    //-   .setPrice('Early Bird', 'Student Pass'  , 'Member/Non-Member',  295)
    //-   .setPrice('Advance'   , 'Student Pass'  , 'Member/Non-Member',  295)
    //-   .setPrice('Onsite'    , 'Student Pass'  , 'Member/Non-Member',  395)
    //-   .setPrice('Early Bird', 'Guest Pass'    , 'Member/Non-Member',  295)
    //-   .setPrice('Advance'   , 'Guest Pass'    , 'Member/Non-Member',  320)
    //-   .setPrice('Onsite'    , 'Guest Pass'    , 'Member/Non-Member',  395)
    //-   .setPrice('Early Bird', 'Daily Pass'    , 'Member'    ,  495)
    //-   .setPrice('Early Bird', 'Daily Pass'    , 'Non-Member',  595)
    //-   .setPrice('Advance'   , 'Daily Pass'    , 'Member'    ,  545)
    //-   .setPrice('Advance'   , 'Daily Pass'    , 'Non-Member',  645)
    //-   .setPrice('Onsite'    , 'Daily Pass'    , 'Member'    ,  645)
    //-   .setPrice('Onsite'    , 'Daily Pass'    , 'Non-Member',  745)

    site.currentConference
      .getSpeaker('donna-fulman')
        // .setBio(`<p>Donna Fulman is an award-winning, German designer raised in Austria
        //   and currently living in New York City.</p>
        //   <p>Former Lead Product Designer and Art Director at Spotify, she recently founded
        //   Semplice and at the same time serves on the
        //   <abbr title="American Institute of Graphic Arts">AIGA</abbr>
        //   Board of Directors in New York.</p>`)
    site.currentConference
      .getSpeaker('rachel-falsetti')
        // .setBio(`<p>Susan R. Rowghani is the Director of Water Engineering and
        //   Technical Services (WETS) at the Los Angeles Department of Water and Power (LADWP),
        //   the largest municipally owned utility in the US. In this role, she is responsible
        //   for the planning, design and construction of all of the LADWP Water System’s
        //   major capital construction projects. The Los Angeles Water System capital
        //   program is approximately $1 billion annually; about 50% of that amount
        //   is managed under WETS.</p>`)
    site.currentConference
      .getSpeaker('diego-alvarez')
        // .setBio(`<p>Diego currently serves Los Angeles World Airports (LAWA)
        //   in the Planning & Development Group (PDG) as the Director of Modernization
        //   and Development. In this charge, Diego works on major elements of Los Angeles
        //   International (LAX) Airport’s Capital Improvement Program (CIP), which has
        //   a projected value of over $14 billion.  Diego has also served as the lead
        //   planner the Landside Access Modernization Program (LAMP), a $5+ billion
        //   effort to reconfigure, redevelop, and modernize access and egress to LAX,
        //   bringing it in line with other global gateways around the world. The Program
        //   includes major capital elements, including an Automated People Mover (APM) System,
        //   a Consolidated Rent-A-Car (CONRAC) center, new multi-modal facilities, and a
        //   comprehensive set of roadway improvements. Prior to that effort, Diego led
        //   efforts to update the LAX Master Plan, assessing and entitling critical new
        //   and modified airfield, terminal, and ground access facilities at LAX,
        //   the busiest origin and destination airport in the world.</p>`)
    site.currentConference
      .getSpeaker('jeremy-boak')
        // .setBio(`<p>Jeremy Boak started as Director of the Oklahoma Geological Survey
        //   in July 2015. He was Director of the Center for Oil Shale Technology and Research
        //   at the Colorado School of Mines from 2008-2015. Before that, he was a project
        //   manager at Los Alamos National Laboratory, and manager for performance assessment
        //   of Yucca Mountain at the U. S. Department of Energy.</p>
        //   <p>Dr. Boak was an exploration geologist at ARCO Oil and Gas, Inc.,
        //   in Anchorage, Denver, and Bakersfield. He received BA and MS degrees,
        //   and his doctorate in Geological Sciences from Harvard University.
        //   He also received an MS degree from the University of Washington in Geological Sciences.
        //   Dr. Boak is married to Anna Stafford, a petroleum geologist and oil finder,
        //   and has a stepson Chris.</p>`)
    site.currentConference
      .getSpeaker('muralee-muraleetharan')
        // .setBio(`<p>Prof. K.K. “Muralee” Muraleetharan is an Associate Director of OU’s
        //   National Institute for Risk and Resilience. He joined OU in 1994 after working
        //   as a consulting engineer in California for 6 years. He is a registered
        //   Professional Engineer (P.E.) and registered Geotechnical Engineer (G.E.)
        //   in California. In California, he worked on several major projects such as
        //   the earthquake engineering design of Port of Los Angeles’ Pier 400 and geotechnical
        //   and environmental investigations for the Los Angles Metro Rail subway tunnels.
        //   At OU he has been a Principal Investigator (PI) or Co-PI on research grants
        //   totaling over $10 million. He was elected as a Fellow of the
        //   American Society of Civil Engineers (ASCE) in 2006.</p></p>Prof. Muraleetharan
        //   is interested in large-scale computer simulations of infrastructure
        //   (bridges, roads, levees, port facilities, etc.) subjected to extreme events
        //   (earthquakes, hurricanes, blasts, etc.), validations of these simulations
        //   using small-scale (e.g. centrifuge models) and full-scale testing, and
        //   resilience of infrastructure following extreme events. His computer simulation
        //   research involves scalable, parallel computing using finite element frameworks.</p>`)

    var rawdata = {
      comment: 'this is draft data that I don’t want to delete yet'
    , pass: {
        standard: {
          name: 'Standard Pass'
        , description: 'Members & Non-Members'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 845, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 945, is_featured: true }
              , { name: 'Non-Member', price: 1045 }
              ]
            }
          ]
        }
      , speaker: {
          name: 'Speaker Pass'
        , description: 'Speakers and Presenters'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 945, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          ]
        }
      , moderator: {
          name: 'Moderator Pass'
        , description: 'Moderators'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 745, is_featured: true }
              , { name: 'Non-Member', price: 845 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 845, is_featured: true }
              , { name: 'Non-Member', price: 945 }
              ]
            }
          ]
        }
      , ym: {
          name: 'Younger Member'
        , description: 'Members 18–35'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 645, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 745, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 845, is_featured: true }
              ]
            }
          ]
        }
      , student: {
          name: 'Student Pass'
        , description: 'Undergraduates 18–24'
        , fineprint: true
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 395, is_featured: true }
              ]
            }
          ]
        }
      , guest: {
          name: 'Guest Pass'
        , description: 'Speaker and Moderator Guests'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member/Non-Member', price: 295, is_featured: true }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member/Non-Member', price: 320, is_featured: true }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member/Non-Member', price: 395, is_featured: true }
              ]
            }
          ]
        }
      , daily: {
          name: 'Daily Pass'
        , description: 'For One Day Only'
        , periods: [
            {
              name: 'Early Bird'
            , memberships: [
                { name: 'Member', price: 495, is_featured: true }
              , { name: 'Non-Member', price: 595 }
              ]
            }
          , {
              name: 'Advance'
            , memberships: [
                { name: 'Member', price: 545, is_featured: true }
              , { name: 'Non-Member', price: 645 }
              ]
            }
          , {
              name: 'Onsite'
            , memberships: [
                { name: 'Member', price: 645, is_featured: true }
              , { name: 'Non-Member', price: 745 }
              ]
            }
          ]
        }
      }
    }

    site.find('registration.html')
      .add(new ConfPage('Why Attend', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Why you should attend ${site.currentConference.name}.`)
      )
      .add(new ConfPage('Volunteer', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Volunteer at ${site.currentConference.name}.`)
      )
    site.find('program.html')
      .add(new ConfPage('Short Courses', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Short Courses for ${site.currentConference.name}.`)
      )
      .add(new ConfPage('Technical Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Technical Tours for ${site.currentConference.name}.`)
      )
      .add(new ConfPage('Optional Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Optional Tours for ${site.currentConference.name}.`)
      )
    site.find('speakers.html')
      .add(new ConfPage('Distinguished Lecturers', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Distinguished lecturers at ${site.currentConference.name}.`)
      )
    site.find('sponsor.html')
      .add(new ConfPage('Partnering Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Partnering Organizations at ${site.currentConference.name}.`)
      )
      .add(new ConfPage('Cooperating Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Cooperating Organizations at ${site.currentConference.name}.`)
      )
    site.find('exhibit.html')
      .add(new ConfPage('Exhibitor List', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Listing of all Exhibitors at ${site.currentConference.name}.`)
      )

module.exports = site
