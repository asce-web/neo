const Page  = require('sitepage').Page
const Color = require('extrajs-color')

const DOCS = new Page({ name: 'ASCE Conferences Pattern Library', url: '/docs/' })
  // REVIEW indentation
    .title('ASCE Conferences Pattern Library')
    .description('Pattern Library for conference microsites.')
    .add(new Page({ name: 'Home', url: '/docs/index.html' })
      .description('Pattern Library Homepage')
    )
    .add(new Page({ name: 'Principles', url: '/docs/principles.html' })
      .description('Color and font schemes, look-and-feel, overall voice and tone.')
      .add(new Page({ name: 'Fonts', url: '/docs/principles.html#fonts' })
        .add(new Page({ name: 'Font Sizes'   , url: '/docs/principles.html#font-sizes' }))
        .add(new Page({ name: 'Font Families', url: '/docs/principles.html#font-families' }))
      )
      .add(new Page({ name: 'Colors', url: '/docs/principles.html#colors' })
        .add(new Page({ name: 'Derivation of Color Palettes', url: '/docs/principles.html#derivation-color-palettes' }))
        .add(new Page({ name: 'Site Colors'                 , url: '/docs/principles.html#site-colors' }))
      )
    )
    .add(new Page({ name: 'Base Typography', url: '/docs/base.html' })
      .description('Bare, unstyled HTML elements. No classes.')
      .add(new Page({ name: 'Grouping Elements', url: '/docs/base.html#grouping-elements' })
        .add(new Page({ name: 'Headings & Paragraphs', url: '/docs/base.html#headings-paragraphs' }))
        .add(new Page({ name: 'Lists'                , url: '/docs/base.html#lists' }))
        .add(new Page({ name: 'Tables'               , url: '/docs/base.html#tables' }))
      )
      .add(new Page({ name: 'Text-Level Elements', url: '/docs/base.html#text-level-elements' })
        .add(new Page({ name: 'Links'        , url: '/docs/base.html#links' }))
        .add(new Page({ name: 'Stress'       , url: '/docs/base.html#stress' }))
        .add(new Page({ name: 'Documentation', url: '/docs/base.html#documentation' }))
        .add(new Page({ name: 'Data'         , url: '/docs/base.html#data' }))
      )
      .add(new Page({ name: 'Forms'               , url: '/docs/base.html#forms' }))
      .add(new Page({ name: 'Embedded Elements'   , url: '/docs/base.html#embedded-elements' }))
      .add(new Page({ name: 'Interactive Elements', url: '/docs/base.html#interactive-elements' }))
    )
    .add(new Page({ name: 'Objects', url: '/docs/obj.html' })
      .add(new Page({ name: 'The Runner Object', url: '/docs/obj.html#runner-object' }))
      .add(new Page({ name: 'The Drawer Object', url: '/docs/obj.html#drawer-object' }))
    )
    .add(new Page({ name: 'Components', url: '/docs/comp.html' })
      .add(new Page({ name: 'Buttons'              , url: '/docs/comp.html#buttons' }))
    )
    .add(new Page({ name: 'Organisms', url: '/docs/org.html' })
    )
    .add(new Page({ name: 'Helpers', url: '/docs/help.html' })
      .description('Somewhat explicit classes used for enhancing default styles.')
      .add(new Page({ name: 'Glyphicons', url: '/docs/help.html#glyphicons' }))
    )
    .add(new Page({ name: 'Atoms', url: '/docs/atom.html' })
      .description('Very specific classes used for creating anomalies or fixing broken styles.')
    )

/**
 * A set of static members used for the Conf style guide.
 * Similar to a utility class.
 * @module
 */
module.exports = class Docs {
  /** @private */ constructor() {}

  /**
   * The style guide site for this project.
   * @type {Page}
   */
  static get DOCS() { return DOCS }

  /**
   * The color style object for this site.
   * @type {Object<string>}
   */
  static get COLORS() {
    return require('../../class/ConfSite.class.js').colorStyles(Color.fromString('#660000'), Color.fromString('#ff6600'))
  }

  /**
   * A list of objects describing suffices used for color names.
   * @type {Array<{name:string, suffix:string}>}
   */
  static get COLOR_NAMES() {
    return [
      { name: 'Primary s2'   , suffix: '-primary-shade2'   },
      { name: 'Primary s1'   , suffix: '-primary-shade1'   },
      { name: 'Primary'      , suffix: '-primary'          },
      { name: 'Primary t1'   , suffix: '-primary-tint1'    },
      { name: 'Primary t2'   , suffix: '-primary-tint2'    },
      { name: 'Secondary s2' , suffix: '-secondary-shade2' },
      { name: 'Secondary s1' , suffix: '-secondary-shade1' },
      { name: 'Secondary'    , suffix: '-secondary'        },
      { name: 'Secondary t1' , suffix: '-secondary-tint1'  },
      { name: 'Secondary t2' , suffix: '-secondary-tint2'  },
      { name: 'Dark Gray s2' , suffix: '-gray_dk-shade2'   },
      { name: 'Dark Gray s1' , suffix: '-gray_dk-shade1'   },
      { name: 'Dark Gray'    , suffix: '-gray_dk'          },
      { name: 'Dark Gray t1' , suffix: '-gray_dk-tint1'    },
      { name: 'Dark Gray t2' , suffix: '-gray_dk-tint2'    },
      { name: 'Light Gray s2', suffix: '-gray_lt-shade2'   },
      { name: 'Light Gray s1', suffix: '-gray_lt-shade1'   },
      { name: 'Light Gray'   , suffix: '-gray_lt'          },
      { name: 'Light Gray t1', suffix: '-gray_lt-tint1'    },
      { name: 'Light Gray t2', suffix: '-gray_lt-tint2'    },
    ]
  }
}
