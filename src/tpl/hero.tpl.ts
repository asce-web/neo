import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Conference, Hyperlink} from '../interfaces'
// import list_highlightbuttons_processor from './list-highlightbuttons.tpl'

const xjs = { ...xjs1, ...xjs2 }

const {xAddress} = require('aria-patterns')


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-hero.tpl.html'))
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

/**
 * A homepage `<header>` containing the site’s most important info.
 * @param   frag the template content to process
 * @param   data a single conference event
 */
function instructions(frag: DocumentFragment, data: Conference): void {
  /* // BUG https://github.com/jsdom/jsdom/issues/1895
  new xjs.HTMLElement(frag.querySelector('.c-Banner')).style('--banner-img', (data.image) ? `url('${data.image}')` : null)
   */ frag.querySelector('.c-Banner') !.setAttribute('style', `--banner-img: ${(data.image) ? `url('${data.image}')` : null};`)

  frag.querySelector('[itemprop="name"]') !.textContent = data.name
  ;(frag.querySelector('meta[itemprop="url"]' ) as HTMLMetaElement).content = data.url
  new xjs.Element(frag.querySelector('[itemprop="location"]') !).append(xAddress.render({
    ...data.location,
    $regionName: true,
  }))

  let date_start = new Date(data.startDate)
  let date_end   = new Date(data.endDate  )
  new xjs.HTMLTimeElement(frag.querySelector('time[itemprop="startDate"]') as HTMLTimeElement)
    .dateTime(date_start)
    .textContent(xjs.Date.format(date_start, 'M j'))
  new xjs.HTMLTimeElement(frag.querySelector('time[itemprop="endDate"]') as HTMLTimeElement)
    .dateTime(date_end)
    .textContent(xjs.Date.format(date_end, 'M j'))

  frag.querySelector('[itemprop="description"]') !.textContent = data.description || ' ' // `&nbsp;` // cannot remove node due to SEO

  // TODO use `list-highlightbuttons.tpl.ts`
  new xjs.HTMLUListElement(frag.querySelector('ul.o-Flex') as HTMLUListElement).populate(function (f: DocumentFragment, d: Hyperlink) {
    new xjs.HTMLAnchorElement(f.querySelector('a[itemprop="significantLink"]') as HTMLAnchorElement)
      .href(d.url)
      .textContent(d.text)
  }, data.$heroButtons)

  new xjs.Element(frag.querySelector('.c-ConfHed__Detail__Dates') !).trimInner()
}

export default new Processor(template, instructions)
