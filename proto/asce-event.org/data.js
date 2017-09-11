//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the default site instance.
//- // Each microsite should have its own copy of this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////


var Color              = require('csscolor').Color
var Util               = require('../../_models/Util.class.js')
var ConfSite           = require('../../_models/ConfSite.class.js')
var ConfPage           = require('../../_models/ConfPage.class.js')
var Conference         = require('../../_models/Conference.class.js')
var SupporterLevel     = require('../../_models/SupporterLevel.class.js')
var Supporter          = require('../../_models/Supporter.class.js')
var Exhibitor          = require('../../_models/Exhibitor.class.js')
var Person             = require('../../_models/Person.class.js')
var Place              = require('../../_models/Place.class.js')
var RegistrationPeriod = require('../../_models/RegistrationPeriod.class.js')
var Pass               = require('../../_models/Pass.class.js')
var DateRange          = require('../../_models/DateRange.class.js')

    var site = new ConfSite('An ASCE Event', '/sites/asce-event.org/', 'Optional Brand Tagline')
      .keywords(['ASCE', 'civil engineering', 'convention'])
      .logo('files/site-logo-white.png')
      .colors(Color.fromString('#3fae2a'), Color.fromString('#00a1e1'))
      .images({
        hero: '/proto/asce-event.org/files/cable-car.jpg',
        city: '/proto/asce-event.org/files/portland.jpg',
        prev: '/proto/asce-event.org/files/new-york.jpg',
        next: '/proto/asce-event.org/files/new-orleans.jpg',
      })
      .init()

    site
      .addConference('2016', new Conference({
        name      : 'A 2016 Event'
      , theme     : 'Theme for the conference is optional.'
      , start_date: new Date('2016-09-28')
      , end_date  : new Date('2016-10-01')
      , url       : 'http://2016.asceconvention.org/'
      , promo_loc : {
          text : 'Portland, OR'
        , alt  : 'Portland, Oregon'
        }
      }))
      .addConference('2015', new Conference({
        name      : 'A 2015 Event'
      , theme     : ''
      , start_date: new Date('2015-10-11')
      , end_date  : new Date('2015-10-14')
      , url       : 'http://2015.asceconvention.org/'
      , promo_loc : {
          text : 'New York, NY'
        , alt  : 'New York, New York'
        }
      })
        .addVenue('Conference Venue', new Place('New York Marriott Marquis', {
          street_address  : '1535 Broadway'
        , address_locality: 'New York'
        , address_region  : 'NY'
        , postal_code     : '10036'
        , url             : 'http://www.marriott.com/hotels/travel/nycmq-new-york-marriott-marquis/'
        }))
      )
      .addConference('2017', new Conference({
        name      : 'A 2017 Event'
      , theme     : ''
      , start_date: new Date('2017-10-08')
      , end_date  : new Date('2017-10-11')
      , url       : 'http://2017.asceconvention.org/'
      , promo_loc : {
          text : 'New Orleans, LA'
        , alt  : 'New Orleans, Louisiana'
        }
      })
        .addVenue('Conference Venue', new Place('New Orleans Mariott', {
          street_address  : '555 Canal Street'
        , address_locality: 'New Orleans'
        , address_region  : 'LA'
        , postal_code     : '70130'
        }))
      )

    site
      .currentConference('2016')
      .prevConference('2015')
      .nextConference('2017')

    // REVIEW TODO move below Speakers
    site.currentConference()
      .addSupporterLevel(new SupporterLevel('Platinum' ).size('lrg'))
      .addSupporterLevel(new SupporterLevel('Corporate').size('lrg'))
      .addSupporterLevel(new SupporterLevel('Silver'   ).size('med'))
      .addSupporterLevel(new SupporterLevel('Bronze'   ).size('med'))
      .addSupporterLevel(new SupporterLevel('Copper'   ).size('med'))
      .addSupporterLevel(new SupporterLevel('Charter Members').size('sml'))
      .addSupporterLevel(new SupporterLevel('Cooperating Organizations').size('sml'))

    site.currentConference()
      .addSupporterLevelQueue('sponsors', ['Platinum', 'Corporate', 'Silver', 'Bronze', 'Copper'])
      .addSupporterLevelQueue('orgs', ['Charter Members', 'Cooperating Organizations'])
      .addSupporterLevelQueue('home-page', ['Platinum', 'Silver', 'Bronze'])
      .addSupporterLevelQueue('sponsors-page', ['Platinum', 'Corporate', 'Silver', 'Bronze', 'Copper', 'Charter Members', 'Cooperating Organizations'])

    site.currentConference()
      .addSupporter(new Supporter('ASCE Foundation')
        .url('http://www.ascefoundation.org/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/asce-foundation-logo.png')
        .level('Platinum')
      )
      .addSupporter(new Supporter('Bentley')
        .url('https://www.bentley.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bentley-logo.png')
        .level('Platinum')
      )
      .addSupporter(new Supporter('Pennoni')
        .url('https://www.pennoni.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pennoni-50th-anniversary-logo.png')
        .level('Silver')
      )
      .addSupporter(new Supporter('Innovyze')
        .url('http://www.innovyze.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/innovyze-logo.png')
        .level('Silver')
      )
      .addSupporter(new Supporter('Fasten Group')
        .url('http://www.chinafasten.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/fasten-group-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('David Evans and Associates, Inc.')
        .url('http://www.deainc.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/david-evans-associates-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('KCI Technologies')
        .url('http://www.kci.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kci-technologies-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('McCormick & Taylor')
        .url('http://www.mccormicktaylor.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/mccormick-taylor-logo.png')
        .level('Bronze')
      )
      .addSupporter(new Supporter('Rutgers Center for Advanced Infrastructure and Transportation')
        .url('http://cait.rutgers.edu/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/rutgers-cait-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Kimley-Horn')
        .url('http://www.kimley-horn.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/kimley-horn-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Christopher B. Burke Engineering, Ltd.')
        .url('http://cbbel.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/christopher-b-burke-engineering-logo.png')
        .level('Copper')
      )
      .addSupporter(new Supporter('Bank of America')
        .url('http://www.asce.org/member_advantages/#b')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/bank-of-america-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Geico')
        .url('https://www.geico.com/landingpage/member-discount/?logo=00774')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/geico-asce-convention-logo.png')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Pearl Insurance')
        .url('http://asceinsurance.com/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/pearl-insurance-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('UPS')
        .url('http://savewithups.com/asce/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/ups-logo.jpg')
        .level('Corporate')
      )
      .addSupporter(new Supporter('Keller North America')
        .url('http://www.keller.co.uk/')
        .img('http://www.asceconvention.org/sites/asceconvention.org/files/sponsors/keller-na-logo.png')
        .level('Corporate')
      )
      .addSupporter(new Supporter('American Cast Iron Pipe Company')
        .url('http://www.american-usa.com/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/american-cast-iron-pipe-company-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Cardno')
        .url('http://www.cardno.com/en-us/Pages/Home.aspx')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/cardno-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Innovyze')
        .url('http://innovyze.com/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/innovyze-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Plastics Pipe Institute')
        .url('http://plasticpipe.org/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/plastics-pipe-institute-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Pure Technologies')
        .url('https://www.puretechltd.com/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/pure-technologies-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('Structural Technologies')
        .url('http://www.structuraltechnologies.com/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/structural-technologies-logo.png')
        .level('Charter Members')
      )
      .addSupporter(new Supporter('GIEES')
        .url('http://giees.org/')
        .img('http://www.pipelinesconference.org/sites/pipelinesconference.org/files/sponsors/giees-coop-logo.png')
        .level('Cooperating Organizations')
      )

    site.currentConference()
      .addExhibitor(new Exhibitor('AISC')
        .url('https://www.aisc.org/')
        .img('https://www.aisc.org/globalassets/aisc/images/logos/aisc_logo-180.png')
        .setDescription('The American Institute of Steel Construction (AISC),\
          headquartered in Chicago, is a not-for-profit technical institute and\
          trade association established in 1921 to serve the structural steel design community\
          and construction industry in the United States.')
        .booth(25)
      )
      .addExhibitor(new Exhibitor('Geopier Foundations')
        .url('http://www.geopier.com/')
        .img('http://www.geopier.com/~/media/Images/Geopier/Tensar_GEOPIER_Logo_186x80.ashx?h=80&la=en&w=186')
        .setDescription('Geopier developed Rammed Aggregate Pier® (RAP) Systems\
          as efficient and cost effective intermediate foundation solutions for\
          the support of settlement sensitive structures.')
        .booth(16)
      )
      .addExhibitor(new Exhibitor('Geico')
        .url('https://www.geico.com/landingpage/member-discount/?logo=00774')
        .img('https://www.geico.com/public/experiments/3.0/images/geico-logo.svg')
        .setDescription('See how much more you could save with a special discount on auto insurance.')
        .booth(9)
        .isSponsor(true)
      )

    site.currentConference()
      .addRegistrationPeriod(new RegistrationPeriod({name:'Early Bird',                                    end_date:new Date('2016-07-28')}).setIcon('stars'))
      .addRegistrationPeriod(new RegistrationPeriod({name:'Advance'   , start_date:new Date('2016-07-29'), end_date:new Date('2016-08-25')}).setIcon('date_range'))
      .addRegistrationPeriod(new RegistrationPeriod({name:'Onsite'    , start_date:new Date('2016-08-26')                                 }).setIcon('account_balance'))

    site.currentConference()
      .currentRegistrationPeriod('Early Bird')

    site.currentConference()
      .addPass(new Pass('Standard Pass')
        .description('Members & Non-Members')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
        .star()
      ).addPass(new Pass('Speaker Pass')
        .description('Speakers and Presenters')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      ).addPass(new Pass('Moderator Pass')
        .description('Moderators')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      ).addPass(new Pass('Younger Member')
        .description('Members 18–35')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
        .star()
      ).addPass(new Pass('Student Pass')
        .description('Undergraduates 18–24')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
        .fineprint(`Full-time students must show valid ID
          onsite at the registration desk when picking up name badge.`)
        .star()
      ).addPass(new Pass('Guest Pass')
        .description('Speaker and Moderator Guests')
        .addAttendeeType(new Pass.AttendeeType('Member/Non-Member', true))
      ).addPass(new Pass('Daily Pass')
        .description('For One Day Only')
        .addAttendeeType(new Pass.AttendeeType('Member', true))
        .addAttendeeType(new Pass.AttendeeType('Non-Member'))
      )

    //- site.currentConference()
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

    site.currentConference()
      .addSession(new DateRange('Registration'                           , new Date('2016-09-28 10:00'), new Date('2016-09-28 19:00')))
      .addSession(new DateRange('Technical Tours'                        , new Date('2016-09-28 10:30'), new Date('2016-09-28 16:30')).star().url('#0'))
      .addSession(new DateRange('Short Courses'                          , new Date('2016-09-28 13:00'), new Date('2016-09-28 17:00')).star().url('#0'))
      .addSession(new DateRange('Optional Tours'                         , new Date('2016-09-28 12:00'), new Date('2016-09-28 17:00')).star().url('#0'))
      .addSession(new DateRange('Opening Welcome Reception'              , new Date('2016-09-28 17:30'), new Date('2016-09-28 19:30')))
      .addSession(new DateRange('Community Service Project'              , new Date('2016-09-28 13:00'), new Date('2016-09-28 17:00')))

      .addSession(new DateRange('Registration'                           , new Date('2016-09-29 07:00'), new Date('2016-09-29 16:30')))
      .addSession(new DateRange('Student & Emerging Leaders Welcome'     , new Date('2016-09-29 07:30'), new Date('2016-09-29 08:30')))
      .addSession(new DateRange('Opening Plenary Session'                , new Date('2016-09-29 08:30'), new Date('2016-09-29 10:00')).star())
      .addSession(new DateRange('Guest Program Orientation & Tour'       , new Date('2016-09-29 09:30'), new Date('2016-09-29 15:30')).star())
      .addSession(new DateRange('Beverage Break'                         , new Date('2016-09-29 10:00'), new Date('2016-09-29 10:30')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-29 10:30'), new Date('2016-09-29 11:30')))
      .addSession(new DateRange('Celebration of Leaders Luncheon'        , new Date('2016-09-29 11:45'), new Date('2016-09-29 13:45')).star())
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-29 14:00'), new Date('2016-09-29 15:30')))
      .addSession(new DateRange('Communities and Pavilion'               , new Date('2016-09-29 14:00'), new Date('2016-09-29 18:00')))
      .addSession(new DateRange('Beverage Break'                         , new Date('2016-09-29 15:30'), new Date('2016-09-29 16:00')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-29 16:00'), new Date('2016-09-29 17:30')))
      .addSession(new DateRange('Optional Tour'                          , new Date('2016-09-29 18:45'), new Date('2016-09-29 21:45')).star().url('#0'))

      .addSession(new DateRange('Registration'                           , new Date('2016-09-30 07:00'), new Date('2016-09-30 16:30')))
      .addSession(new DateRange('Leadership & Society Awards Breakfast'  , new Date('2016-09-30 07:30'), new Date('2016-09-30 08:30')))
      .addSession(new DateRange('Communities and Pavilion'               , new Date('2016-09-30 08:30'), new Date('2016-09-30 17:00')))
      .addSession(new DateRange('ASCE Annual Business Meeting'           , new Date('2016-09-30 08:45'), new Date('2016-09-30 09:45')).star())
      .addSession(new DateRange('Beverage Break'                         , new Date('2016-09-30 09:45'), new Date('2016-09-30 10:15')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-30 10:15'), new Date('2016-09-30 11:45')))
      .addSession(new DateRange('Lunch on Your Own'                      , new Date('2016-09-30 11:45'), new Date('2016-09-30 13:15')))
      .addSession(new DateRange('International Luncheon (ticketed)'      , new Date('2016-09-30 11:45'), new Date('2016-09-30 13:15')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-30 13:15'), new Date('2016-09-30 14:15')))
      .addSession(new DateRange('Optional Tour'                          , new Date('2016-09-30 13:00'), new Date('2016-09-30 17:15')).star().url('#0'))
      .addSession(new DateRange('Industry Leaders Forum'                 , new Date('2016-09-30 14:30'), new Date('2016-09-30 16:00')).star())
      .addSession(new DateRange('Beverage Break'                         , new Date('2016-09-30 16:00'), new Date('2016-09-30 16:30')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-09-30 16:30'), new Date('2016-09-30 17:30')))
      .addSession(new DateRange('Theater Night Out'                      , new Date('2016-09-30 18:30'), new Date('2016-09-30 21:30')).star())

      .addSession(new DateRange('Registration'                           , new Date('2016-10-01 07:00'), new Date('2016-10-01 14:30')))
      .addSession(new DateRange('Order of the Engineer Ceremony'         , new Date('2016-10-01 07:30'), new Date('2016-10-01 08:15')).star())
      .addSession(new DateRange('Optional Tour'                          , new Date('2016-10-01 08:45'), new Date('2016-10-01 11:45')).url('#0'))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-10-01 08:30'), new Date('2016-10-01 10:00')))
      .addSession(new DateRange('Communities and Pavilion'               , new Date('2016-10-01 08:30'), new Date('2016-10-01 14:00')))
      .addSession(new DateRange('Concurrent Sessions'                    , new Date('2016-10-01 10:15'), new Date('2016-10-01 11:45')))
      .addSession(new DateRange('ASCE Luncheon & Closing General Session', new Date('2016-10-01 12:00'), new Date('2016-10-01 14:00')).star())
      .addSession(new DateRange('Technical Tours'                        , new Date('2016-10-01 14:30'), new Date('2016-10-01 17:30')).url('#0'))

    site.currentConference()
      .addVenue('Conference Venue', new Place('Oregon Convention Center', {
        street_address  : '777 NE Martin Luther King, Jr. Blvd.'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97232'
      , url             : 'https://www.oregoncc.org/'
      })).addVenue('Official Hotel', new Place('DoubleTree by Hilton Portland', {
        street_address  : '1000 NE Multnomah St'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97232'
      })).addVenue('Overflows', new Place('Courtyard Portland City Center', {
        street_address  : '550 SW Oak St'
      , address_locality: 'Portland'
      , address_region  : 'OR'
      , postal_code     : '97204'
      }))

    site.currentConference()
      .officialVenue('Conference Venue')

    site.currentConference()
      .addSpeaker(new Person('donna-fulman', {
          given_name      : 'Donna'
        , family_name     : 'Fulman'
        , honorific_suffix: 'P.ASCE'
      }).jobTitle('Administrator of Interior Engineering')
        .affiliation('German Chamber of Architects')
        .img('files/headshot1.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter' , '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google'  , '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube' , '#0', 'Donna’s YouTube Channel')
        // .setBio(`<p>Donna Fulman is an award-winning, German designer raised in Austria
        //   and currently living in New York City.</p>
        //   <p>Former Lead Product Designer and Art Director at Spotify, she recently founded
        //   Semplice and at the same time serves on the
        //   <abbr title="American Institute of Graphic Arts">AIGA</abbr>
        //   Board of Directors in New York.</p>`)
        .star()
      )
      .addSpeaker(new Person('rachel-falsetti', {
          given_name      : 'Susan'
        , additional_name : 'R.'
        , family_name     : 'Rowghani'
      }).jobTitle('Director of Water Engineering and Technical Services (WETS)')
        .affiliation('Los Angeles Department of Water and Power')
        .img('http://www.cisummit.org/sites/cisummit.org/files/susan-rowghani.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter' , '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google'  , '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube' , '#0', 'Donna’s YouTube Channel')
        // .setBio(`<p>Susan R. Rowghani is the Director of Water Engineering and
        //   Technical Services (WETS) at the Los Angeles Department of Water and Power (LADWP),
        //   the largest municipally owned utility in the US. In this role, she is responsible
        //   for the planning, design and construction of all of the LADWP Water System’s
        //   major capital construction projects. The Los Angeles Water System capital
        //   program is approximately $1 billion annually; about 50% of that amount
        //   is managed under WETS.</p>`)
      )
      .addSpeaker(new Person('diego-alvarez', {
          given_name      : 'Diego'
        , family_name     : 'Alvarez'
      }).jobTitle('Director of Modernization and Development')
        .affiliation('Planning & Development Group (PDG), Los Angeles World Airports')
        .img('http://www.cisummit.org/sites/cisummit.org/files/diego-alvarez.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter' , '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google'  , '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube' , '#0', 'Donna’s YouTube Channel')
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
        .star()
      )
      .addSpeaker(new Person('jeremy-boak', {
          given_name      : 'Jeremy'
        , family_name     : 'Boak'
      }).jobTitle('Director')
        .affiliation('Oklahoma Geological Survey')
        .img('http://www.aei-conference.org/sites/aei-conference.org/files/jeremy-boak.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter' , '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google'  , '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube' , '#0', 'Donna’s YouTube Channel')
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
      )
      .addSpeaker(new Person('muralee-muraleetharan', {
          given_name      : 'Muralee'
        , family_name     : 'Muraleetharan'
      }).jobTitle('Geotechnical Engineering Professor, Kimmell-Bernard Chair in Engineering, David Ross Boyd and Presidential Professor')
        .affiliation('University of Oklahoma')
        .img('http://www.aei-conference.org/sites/aei-conference.org/files/muralee-muraleetharan.jpg')
        .email('example@asce.org')
        .phone('+1(703)555-5555')
        .url('#0')
        .addSocial('linkedin', '#0', 'Connect with Donna on LinkedIn')
        .addSocial('twitter' , '#0', 'Follow @Donna on Twitter')
        .addSocial('facebook', '#0', 'Donna’s Facebook Profile')
        .addSocial('google'  , '#0', 'Donna’s Google+ Profile')
        .addSocial('youtube' , '#0', 'Donna’s YouTube Channel')
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
        .star()
      )

    site.currentConference()
      .addImportantDate(new DateRange('Optional Final Papers Due'     , new Date('2015-10-12')                        ).star())
      .addImportantDate(new DateRange('Early-Bird Registration Closes', new Date('2015-12-17')                        ).star().url('registration.html'))
      .addImportantDate(new DateRange('Advance Registration Closes'   , new Date('2016-01-12')                        ).star().url('registration.html'))
      .addImportantDate(new DateRange('Convention Begins'             , new Date('2016-06-12')                        ).star())
      .addImportantDate(new DateRange('Convention Ends'               , new Date('2016-06-15')                        ))
      .addImportantDate(new DateRange('Convention Dates'              , new Date('2016-09-28'), new Date('2016-10-01')).star())

    site.currentConference()
      .addOrganizer(new Person('thomas-mccollough', {
          given_name      : 'Thomas'
        , additional_name : 'J.'
        , family_name     : 'McCollough'
        , honorific_suffix: 'P.E., M.ASCE'
      }).affiliation('HDR Engineering, Inc.')
      ).addOrganizer(new Person('stephen-dickenson', {
          given_name      : 'Stephen'
        , additional_name : 'E.'
        , family_name     : 'Dickenson'
        , honorific_prefix: 'Dr.'
        , honorific_suffix: 'Ph.D., P.E., D.PE, M.ASCE'
      }).affiliation('HNTB Corporation'))

    site.currentConference()
      .addSocial('twitter', 'https://twitter.com/hashtag/#asce2016', 'Follow #ASCE2016 on Twitter')
      .addSocial('google', '#0', 'Follow #ASCE2016 on Google+')
      .addSocial('facebook', '#0', 'Follow #ASCE2016 on Facebook')

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
        .description(`Why you should attend ${site.currentConference().name}.`)
      )
      .add(new ConfPage('Volunteer', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Volunteer at ${site.currentConference().name}.`)
      )
    site.find('program.html')
      .add(new ConfPage('Short Courses', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Short Courses for ${site.currentConference().name}.`)
      )
      .add(new ConfPage('Technical Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Technical Tours for ${site.currentConference().name}.`)
      )
      .add(new ConfPage('Optional Tours', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Optional Tours for ${site.currentConference().name}.`)
      )
    site.find('speakers.html')
      .add(new ConfPage('Distinguished Lecturers', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Distinguished lecturers at ${site.currentConference().name}.`)
      )
    site.find('sponsor.html')
      .add(new ConfPage('Partnering Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Partnering Organizations at ${site.currentConference().name}.`)
      )
      .add(new ConfPage('Cooperating Orgs', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Cooperating Organizations at ${site.currentConference().name}.`)
      )
    site.find('exhibit.html')
      .add(new ConfPage('Exhibitor List', '#0')
        .title(function () { return this.name() + ' | ' + site.name() })
        .description(`Listing of all Exhibitors at ${site.currentConference().name}.`)
      )

module.exports = site
