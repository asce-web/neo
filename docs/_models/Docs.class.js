var Page = require('sitepage').Page
var Color = require('csscolor').Color

module.exports = (function () {
  // CONSTRUCTOR
  /**
   * A set of static members used for the Conf style guide.
   * Similar to a utility class.
   * @constructor
   */
  function Docs() {}

  // METHODS

  // STATIC MEMBERS
  /**
   * The style guide site for this project.
   * @type {Page}
   */
  Docs.DOCS = (function () {
    return new Page({ name: 'ASCE Conferences Pattern Library', url: '/docs/' })
      .title('ASCE Conferences Pattern Library')
      .description('Pattern Library for conference microsites.')
      .add(new Page({ name: 'Home', url: 'index.html' })
        .description('Pattern Library Homepage')
      )
      .add(new Page({ name: 'Principles', url: 'principles.html' })
        .description('Color and font schemes, look-and-feel, overall voice and tone.')
        .add(new Page({ name: 'Fonts', url: 'principles.html#fonts' })
          .add(new Page({ name: 'Font Sizes'   , url: 'principles.html#font-sizes' }))
          .add(new Page({ name: 'Font Families', url: 'principles.html#font-families' }))
        )
        .add(new Page({ name: 'Colors', url: 'principles.html#colors' })
          .add(new Page({ name: 'Derivation of Color Palettes', url: 'principles.html#derivation-color-palettes' }))
          .add(new Page({ name: 'Site Colors', url: 'principles.html#site-colors' }))
        )
      )
      .add(new Page({ name: 'Base Typography', url: 'base.html' })
        .description('Bare, unstyled HTML elements. No classes.')
        .add(new Page({ name: 'Grouping Elements', url: 'base.html#grouping-elements' })
          .add(new Page({ name: 'Headings & Paragraphs', url: 'base.html#headings-paragraphs' }))
          .add(new Page({ name: 'Lists'                , url: 'base.html#lists' }))
          .add(new Page({ name: 'Tables'               , url: 'base.html#tables' }))
        )
        .add(new Page({ name: 'Text-Level Elements', url: 'base.html#text-level-elements' })
          .add(new Page({ name: 'Links'        , url: 'base.html#links' }))
          .add(new Page({ name: 'Stress'       , url: 'base.html#stress' }))
          .add(new Page({ name: 'Documentation', url: 'base.html#documentation' }))
          .add(new Page({ name: 'Data'         , url: 'base.html#data' }))
        )
        .add(new Page({ name: 'Forms'               , url: 'base.html#forms' }))
        .add(new Page({ name: 'Embedded Elements'   , url: 'base.html#embedded-elements' }))
        .add(new Page({ name: 'Interactive Elements', url: 'base.html#interactive-elements' }))
      )
      .add(new Page({ name: 'Objects', url: 'obj.html' })
        .description('Patterns of structure that can be reused many times for many different purposes.')
        .add(new Page({ name: 'The Float Grid'   , url: 'obj.html#float-grid' }))
        .add(new Page({ name: 'The Runner Object', url: 'obj.html#runner-object' }))
        .add(new Page({ name: 'Constrain'        , url: 'obj.html#constrain' }))
        .add(new Page({ name: 'The Action List'  , url: 'obj.html#action-list' }))
        .add(new Page({ name: 'The Stacked List' , url: 'obj.html#stacked-list' }))
        .add(new Page({ name: 'The Tabs Object'  , url: 'obj.html#tabs-object' }))
        .add(new Page({ name: 'The Drawer Object', url: 'obj.html#drawer-object' }))
      )
      .add(new Page({ name: 'Components', url: 'comp.html' })
        .description('Patterns of look-and-feel that are each only used for one purpose.')
        .add(new Page({ name: 'The Mast Component'   , url: 'comp.html#mast-component' }))
        .add(new Page({ name: 'The Banner Component' , url: 'comp.html#banner-component' }))
        .add(new Page({ name: 'The Site Title'       , url: 'comp.html#site-title' }))
        .add(new Page({ name: 'The Mobile Menu'      , url: 'comp.html#mobile-menu' }))
        .add(new Page({ name: 'The Menu Bar'         , url: 'comp.html#menu-bar' }))
        .add(new Page({ name: 'The Sitemap Component', url: 'comp.html#sitemap-component' }))
        .add(new Page({ name: 'The Page Title'       , url: 'comp.html#page-title' }))
        .add(new Page({ name: 'The Conference Header', url: 'comp.html#conference-header' }))
        .add(new Page({ name: 'The Supporter Block'  , url: 'comp.html#supporter-block' }))
        .add(new Page({ name: 'The Pass Component'   , url: 'comp.html#pass-component' }))
        .add(new Page({ name: 'The Program Heading'  , url: 'comp.html#program-heading' }))
        .add(new Page({ name: 'The Time Block'       , url: 'comp.html#time-block' }))
        .add(new Page({ name: 'The Speaker Component', url: 'comp.html#speaker-component' }))
        .add(new Page({ name: 'The Social List'      , url: 'comp.html#social-list' }))
        .add(new Page({ name: 'The Date Block'       , url: 'comp.html#date-block' }))
        .add(new Page({ name: 'The Callout Component', url: 'comp.html#callout-component' }))
        .add(new Page({ name: 'Buttons'              , url: 'comp.html#buttons' }))
        .add(new Page({ name: 'The Toggle Button'    , url: 'comp.html#toggle-button' }))
        .add(new Page({ name: 'The Camo Link'        , url: 'comp.html#camo-link' }))
        .add(new Page({ name: 'The Caps Link'        , url: 'comp.html#caps-link' }))
      )
      .add(new Page({ name: 'Templates', url: 'temp.html' })
        .description('Compositions of Objects and Components that act as a single organism.')
        .add(new Page({ name: 'Site Header'              , url: 'temp.html#site-header' }))
        .add(new Page({ name: 'Page Header'              , url: 'temp.html#page-header' }))
        .add(new Page({ name: 'Highlighted Content Block', url: 'temp.html#highlighted-content-block' }))
        .add(new Page({ name: 'Hero Image'               , url: 'temp.html#hero-image' }))
        .add(new Page({ name: 'Other Year Callout'       , url: 'temp.html#other-year-callout' }))
        .add(new Page({ name: 'Program Tabs'             , url: 'temp.html#program-tabs' }))
        .add(new Page({ name: 'Speaker'                  , url: 'temp.html#speaker' }))
        .add(new Page({ name: 'Important Dates'          , url: 'temp.html#important-dates' }))
        .add(new Page({ name: 'Person'                   , url: 'temp.html#person' }))
        .add(new Page({ name: 'Place'                    , url: 'temp.html#place' }))
      )
      .add(new Page({ name: 'Helpers', url: 'help.html' })
        .description('Somewhat explicit classes used for enhancing default styles.')
      )
      .add(new Page({ name: 'Atoms', url: 'atom.html' })
        .description('Very specific classes used for creating anomalies or fixing broken styles.')
      )
  })()

  Docs.COLORS = require('../../_models/ConfSite.class.js').colorStyles(Color.fromString('#660000'), Color.fromString('#ff6600'))

  Docs.COLOR_NAMES = [
    { name: 'Primary s2'   , suffix: '-primary-shade2' }
  , { name: 'Primary s1'   , suffix: '-primary-shade1' }
  , { name: 'Primary'      , suffix: '-primary' }
  , { name: 'Primary t1'   , suffix: '-primary-tint1' }
  , { name: 'Primary t2'   , suffix: '-primary-tint2' }
  , { name: 'Secondary s2' , suffix: '-secondary-shade2' }
  , { name: 'Secondary s1' , suffix: '-secondary-shade1' }
  , { name: 'Secondary'    , suffix: '-secondary' }
  , { name: 'Secondary t1' , suffix: '-secondary-tint1' }
  , { name: 'Secondary t2' , suffix: '-secondary-tint2' }
  , { name: 'Dark Gray s2' , suffix: '-gray_dk-shade2' }
  , { name: 'Dark Gray s1' , suffix: '-gray_dk-shade1' }
  , { name: 'Dark Gray'    , suffix: '-gray_dk' }
  , { name: 'Dark Gray t1' , suffix: '-gray_dk-tint1' }
  , { name: 'Dark Gray t2' , suffix: '-gray_dk-tint2' }
  , { name: 'Light Gray s2', suffix: '-gray_lt-shade2' }
  , { name: 'Light Gray s1', suffix: '-gray_lt-shade1' }
  , { name: 'Light Gray'   , suffix: '-gray_lt' }
  , { name: 'Light Gray t1', suffix: '-gray_lt-tint1' }
  , { name: 'Light Gray t2', suffix: '-gray_lt-tint2' }
  ]

  return Docs
})()
