const path = require('path')

const xjs = {
  ...require('extrajs'),
  ...require('extrajs-dom'),
}

const {xAddress} = require('aria-patterns')

const xListHighlightbuttons = require('./x-list-highlightbuttons.tpl.js')


/**
 * @summary xHero renderer.
 * @param   {DocumentFragment} frag the template content with which to render
 * @param   {sdo.Event}         data a JSON object representing a single conference event
 * @param   {string}            data.name        http://schema.org/name
 * @param   {string}            data.url         http://schema.org/url
 * @param   {string=}           data.description http://schema.org/description
 * @param   {string=}           data.image       http://schema.org/image
 * @param   {string}            data.startDate   http://schema.org/startDate
 * @param   {string}            data.endDate     http://schema.org/endDate
 * @param   {sdo.PostalAddress} data.location    http://schema.org/location
 * @param   {Array<sdo.WebPageElement>=} data.$heroButtons
 * @param   {!Object=} opts additional rendering options
 */
function xHero_renderer(frag, data, opts = {}) {
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

  new xjs.HTMLUListElement(frag.querySelector('ul.o-Flex')).populate(data.$heroButtons, function (f, d, o) {
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
