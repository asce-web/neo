import * as path from 'path'

import { Date as xjs_Date } from 'extrajs'
import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'
import {xAddress} from 'aria-patterns'

import {Conference} from '../interfaces'
import xListHighlightButton from './list-highlightbuttons.tpl'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/hero.tpl.html')) // NB relative to dist
  .exe(function () {
    new xjs.DocumentFragment(this.content()).importLinks(__dirname)
  })
  .node

function instructions(frag: DocumentFragment, data: Conference): void {
	/**
	 * References to formatting elements.
	 * We want to create these references before removing any elements from the DOM.
	 */
	const formatting = {
		/** Start and end dates. */ dates: [...frag.querySelectorAll('.c-ConfHed__Detail__Dates')],
	}
  /* // BUG https://github.com/jsdom/jsdom/issues/1895
  new xjs.HTMLElement(frag.querySelector('.c-Banner')).style('--banner-img', (data.image) ? `url('${data.image}')` : null)
   */ frag.querySelector('.c-Banner') !.setAttribute('style', `--banner-img: ${(data.image) ? `url('${data.image}')` : null};`)

  frag.querySelector('[itemprop="name"]') !.textContent = data.name
  ;(frag.querySelector('meta[itemprop="url"]' ) as HTMLMetaElement).content = data.url
	new xjs.Element(frag.querySelector('[itemprop="location"]') !).append(xAddress.process({
		...data.location,
	}, {
		regionName: true
	}))

  let date_start: Date = new Date(data.startDate)
  let date_end  : Date = new Date(data.endDate || data.startDate)
	frag.querySelectorAll('time[itemprop~="startDate"]').forEach((time) => {
		new xjs.HTMLTimeElement(time as HTMLTimeElement)
			.dateTime(date_start)
			.textContent(xjs_Date.format(date_start, 'M j'))
	})
	new xjs.HTMLTimeElement(frag.querySelectorAll('time[itemprop~="endDate"]')[1] as HTMLTimeElement)
		.dateTime(date_end)
		.textContent(xjs_Date.format(date_end, 'M j'))
	if (xjs_Date.sameDate(date_start, date_end)) {
		formatting.dates[1].remove()
	} else {
		formatting.dates[0].remove()
	}

  frag.querySelector('[itemprop="description"]') !.textContent = data.description || ' ' // `&nbsp;` // cannot remove node due to SEO

	new xjs.Element(frag.querySelector('.c-ConfHed__Theme ~ template') !).after(
		new xjs.DocumentFragment(xListHighlightButton.process(data.$heroButtons || [], {
			buttonclasses: 'c-Button--primary',
		})).exe(function () {
			this.node.querySelectorAll('a').forEach((anchor) => {
				new xjs.HTMLAnchorElement(anchor).attr('itemprop', 'significantLink')
			})
		})
	)

  new xjs.Element(frag.querySelector('.c-ConfHed__Detail__Dates') !).trimInner()
}

/**
 * A homepage `<header>` containing the site’s most important info.
 */
const xHero: Processor<Conference, object> = new Processor(template, instructions)
export default xHero
