import * as path from 'path'

import { Date as xjs_Date } from 'extrajs'
import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {ImportantDate} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/dateblock.tpl.html')) // NB relative to dist
  .node

function instructions(frag: DocumentFragment, data: ImportantDate[]): void {
  new xjs.HTMLTableSectionElement(frag.querySelector('tbody') !).populate(function (f, d) {
    let date_start: Date = new Date(d.startTime)
    let date_end  : Date = new Date(d.endTime || d.startTime)
    /**
     * References to formatting elements.
     * We want to create these references before removing any elements from the DOM.
     */
    const formatting = {
      /** Start and end dates. */ dates: [...f.querySelectorAll('.c-DateBlock__Date')],
    }
    f.querySelectorAll('time[itemprop~="startTime"]').forEach((time) => {
      new xjs.HTMLTimeElement(time as HTMLTimeElement)
        .dateTime(date_start)
        .textContent(xjs_Date.format(date_start, 'M j, Y'))
    })
    new xjs.HTMLTimeElement(f.querySelectorAll('time[itemprop~="endTime"]')[1] as HTMLTimeElement)
      .dateTime(date_end)
      .textContent(xjs_Date.format(date_end, 'M j, Y'))
    formatting.dates.forEach((cell) => {
      new xjs.Element(cell).trimInner()
    })
    if (xjs_Date.sameDate(date_start, date_end)) {
      formatting.dates[1].remove()
    } else {
      formatting.dates[0].remove()
    }

		new xjs.HTMLAnchorElement(f.querySelector('a[itemprop="url"]') as HTMLAnchorElement).exe(function () {
			if (d.url) {
				this.href(d.url)
			} else {
				this.attr({
					href: null,
					itemprop: null,
					role: 'none presentation'
				})
			}
		}).textContent(d.name)
  }, data)
}

/**
 * A `<tr.c-DateBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as an important date with date and description.
 */
const xDateBlock: Processor<ImportantDate[], object> = new Processor(template, instructions)
export default xDateBlock
