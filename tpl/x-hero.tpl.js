const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const {xAddress} = require('aria-patterns')

const xListHighlightbuttons = require('./x-list-highlightbuttons.tpl.js')


/**
 * @summary xHero renderer.
 * @param {DocumentFragment} frag the template content with which to render
 * @param {sdo.Event} data a JSON object representing a single conference event
 * @param {string}  data.name the name of the conference
 * @param {string}  data.url the url of the conference
 * @param {string=} data.description the “conference theme”
 * @param {string=} data.image the hero image for the conference
 * @param {string=} data.startDate the starting date of the conference, in ISO string format
 * @param {string=} data.endDate   the ending date of the conference, in ISO string format
 * @param {sdo.PostalAddress=} data.location the promoted location of the conference
 * @param {string=} data.location.image the promoted location of the conference
 * @param {Array<sdo.WebPageElement>=} data.$heroButtons a list of links serving as action buttons
 */
function xHero_renderer(frag, data) {
  /* // BUG https://github.com/jsdom/jsdom/issues/1895
  new xjs.HTMLElement(frag.querySelector('.c-Banner')).style('--banner-img', (data.image) ? `url('${data.image}')` : null)
   */ frag.querySelector('.c-Banner').setAttribute('style', `--banner-img: ${(data.image) ? `url('${data.image}')` : null};`)

  frag.querySelector('[itemprop="name"]'    ).textContent  = data.name
  frag.querySelector('meta[itemprop="url"]' ).content      = data.url
  frag.querySelector('[itemprop="location"]').append(xAddress.render({
    ...data.location,
    $regionName: true,
  }))

  let date_start = new Date(data.startDate)
  let date_end   = new Date(data.endDate  )
  new xjs.HTMLTimeElement(frag.querySelector('[itemprop="startDate"]'))
    .dateTime(date_start)
    .textContent(xjs.Date.format(date_start, 'M j'))
  new xjs.HTMLTimeElement(frag.querySelector('[itemprop="endDate"]'))
    .dateTime(date_end)
    .textContent(xjs.Date.format(date_end, 'M j'))

  frag.querySelector('[itemprop="description"]').textContent = data.description || ' ' // `&nbsp;` // cannot remove node due to SEO

  new xjs.HTMLUListElement(frag.querySelector('ul.o-Flex')).populate(data.$heroButtons, function (f, d) {
    new xjs.HTMLAnchorElement(f.querySelector('[itemprop="significantLink"]'))
      .href       (d.url  || '#1')
      .textContent(d.text || ''  )
  })

  new xjs.HTMLElement(frag.querySelector('.c-ConfHed__Detail__Dates')).trimInner()
}

module.exports = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, './x-hero.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .setRenderer(xHero_renderer)
