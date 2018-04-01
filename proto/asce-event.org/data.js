//- ///////////////////////////////////////////////////////////////////////////////
//- //
//- // This file holds 'local' data for the default site instance.
//- // Each microsite should have its own copy of this file.
//- //
//- ///////////////////////////////////////////////////////////////////////////////





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
      .getSpeakersAll().find((person) => person.identifier==='donna-fulman')
        // .setBio(`<p>Donna Fulman is an award-winning, German designer raised in Austria
        //   and currently living in New York City.</p>
        //   <p>Former Lead Product Designer and Art Director at Spotify, she recently founded
        //   Semplice and at the same time serves on the
        //   <abbr title="American Institute of Graphic Arts">AIGA</abbr>
        //   Board of Directors in New York.</p>`)
    site.currentConference
      .getSpeakersAll().find((person) => person.identifier==='rachel-falsetti')
        // .setBio(`<p>Susan R. Rowghani is the Director of Water Engineering and
        //   Technical Services (WETS) at the Los Angeles Department of Water and Power (LADWP),
        //   the largest municipally owned utility in the US. In this role, she is responsible
        //   for the planning, design and construction of all of the LADWP Water System’s
        //   major capital construction projects. The Los Angeles Water System capital
        //   program is approximately $1 billion annually; about 50% of that amount
        //   is managed under WETS.</p>`)
    site.currentConference
      .getSpeakersAll().find((person) => person.identifier==='diego-alvarez')
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
      .getSpeakersAll().find((person) => person.identifier==='jeremy-boak')
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
      .getSpeakersAll().find((person) => person.identifier==='muralee-muraleetharan')
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
