const fs = require('fs')
const path = require('path')
const util = require('util')

const jsdom = require('jsdom')

const xjs = require('extrajs-dom')

const {xAddress} = require('aria-patterns')

const Util = require('./Util.class.js')
const xListHighlightbuttons = require('../tpl/x-list-highlightbuttons.tpl.js')
const xListSupporterLevel = require('../tpl/x-list-supporter-level.tpl.js')
const xSitetitle = require('../tpl/x-sitetitle.tpl.js')
const xHero = require('../tpl/x-hero.tpl.js')


/**
 * Render a page of a conference website.
 */
class Neo {
  /**
   * Construct a new Neo object.
   */
  constructor(jsondata) {
    /**
     * Raw JSON data for this object.
     * @private
     * @final
     * @type {!Object}
     */
    this._DATA = jsondata
  }

  /**
   * @summary Render the entire page.
   * @returns {string} the rendered HTML DOM output
   */
  async render() {
    const DATA = this._DATA
    const site = new (require('./ConfSite.class.js'))(DATA).init() // TEMP for now

    const dom = new jsdom.JSDOM(await util.promisify(fs.readFile)(path.resolve(__dirname, '../tpl/master.tpl.html'), 'utf8'))
    const {document} = dom.window

    await (async function importLinks() {
      let test = jsdom.JSDOM.fragment('<link rel="import" href="https://example.com/"/>').querySelector('link')
      if (!('import' in test)) { // if `HTMLLinkElement#import` is not yet supported
        console.warn('`HTMLLinkElement#import` is not yet supported. Replacing `<link>`s with their imported contents.')
        return Promise.all(Array.from(document.querySelectorAll('link[rel~="import"][data-import]')).map(async function (link) {
          const import_switch = {
            'document': async () => jsdom.JSDOM.fragment(await util.promisify(fs.readFile)(path.resolve(__dirname, '../tpl/', link.href), 'utf8')),
            'template': async () => (await xjs.HTMLTemplateElement.fromFile(path.resolve(__dirname, '../tpl/', link.href))).content(),
            async default() { return null },
          }
          let imported = await (import_switch[link.getAttribute('data-import')] || import_switch.default).call(null)
          if (imported) {
            link.after(imported)
            link.remove() // link.href = path.resolve('https://example.com/index.html', link.href) // TODO set the href relative to the current window.location.href
          }
        }))
      } else return;
    })()
  await Promise.all([
    // head metadata
    (async function () {
      document.title = DATA.name
      document.head.querySelector('meta[name="description"]').content = DATA.description
      document.head.querySelector('meta[name="keywords"]'   ).content = DATA.keywords.join()
    })(),
    // site headers and footers
    (async function () {
      document.querySelector('header.c-Mast--head > .h-Constrain template').after(xSitetitle.render(DATA))
      document.querySelector('#connect-with-asce address [itemprop="address"]').append(xAddress.render(DATA.brand.address))
      document.querySelector('#main-menu-drawer').innerHTML = Util.view(site).pageToc({
        depth: 1,
        end: -1,
        classes: {
          list: 'o-List o-Flex c-MainMenu',
          item: 'o-List__Item o-Flex__Item c-MainMenu__Item',
        },
        links: {
          classes: {
            link  : 'c-MainMenu__Link h-Block',
            icon  : 'c-MainMenu__Icon',
            expand: 'c-MainMenu__Exp',
          },
        },
        options: {
          classes: {
            list: 'o-List c-MainMenu__Sub',
            item: 'o-List__Item c-MainMenu__Sub__Item',
          },
          links: { classes: { link: 'c-MainMenu__Sub__Link h-Block' } },
        },
      })
      document.querySelector('#sitemap > nav').innerHTML = `<h1 class="h-Hidden">Sitemap</h1>` + Util.view(site).pageToc({
        depth: Infinity,
        start: 1,
        classes: {
          list: 'o-List o-Flex c-Sitemap',
          item: 'o-List__Item o-Flex__Item c-Sitemap__Item',
        },
        options: {
          classes: {
            list: 'o-List c-Sitemap__Sub',
            item: 'o-List__Item c-Sitemap__Sub__Item',
          },
        },
      })
    })(),
    // page main
    (async function () {
      let conference = DATA.$conferences[0]
      function itemsInQueue(queue_name) {
        let queue = (DATA.$queues || []).find((list) => list.name===queue_name)
        return queue && queue.itemListElement || []
      }
      document.querySelector('slot[name="mainHeader"] template').after(
        xHero.render({
          ...conference,
          location: conference.location && conference.location[0] || { "@type": "PostalAddress" },
        })
      )
      document.querySelector('#sponsors template').after(
        xListSupporterLevel.render({ supporterlevels: itemsInQueue('Top Sponsors'), small: true }, conference)
      )
      document.querySelector('#sponsors footer template').after(
        xListHighlightbuttons.render({
          links: JSON.parse(document.querySelector('#sponsors footer script').innerHTML),
        })
      )
      document.querySelector('main > article > aside:last-child template').after(
        xListSupporterLevel.render({ supporterlevels: itemsInQueue('Non-Sponsors'), small: true }, conference)
      )
    })(),
  ])
    let contents = dom.serialize()
    await util.promisify(fs.writeFile)(path.resolve(__dirname, '../proto/asce-event.org/index.html'), contents + 'abcdef', 'utf8')
  }

}

module.exports = Neo
