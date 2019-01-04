import * as path from 'path'

import { Date as xjs_Date } from 'extrajs'
import * as xjs from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Session} from '../interfaces'


const template: HTMLTemplateElement = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../src/tpl/timeblock.tpl.html')) // NB relative to dist
  .node

function instructions(frag: DocumentFragment, data: Session[]): void {
  new xjs.HTMLTableSectionElement(frag.querySelector('tbody') !).populate(function (f, d) {
    let time_start: Date = new Date(d.startDate)
    let time_end  : Date = new Date(d.endDate || d.startDate)
    /**
     * References to formatting elements.
     * We want to create these references before removing any elements from the DOM.
     */
    const formatting = {
      /** Start and end times. */ times: [...f.querySelectorAll('.c-TimeBlock__Times')],
    }
    f.querySelectorAll('time[itemprop~="startDate"]').forEach((time) => {
      new xjs.HTMLTimeElement(time as HTMLTimeElement)
        .dateTime(time_start)
        .textContent(xjs_Date.format(time_start, 'g:ia'))
    })
    new xjs.HTMLTimeElement(f.querySelectorAll('time[itemprop~="endDate"]')[1] as HTMLTimeElement)
      .dateTime(time_end)
      .textContent(xjs_Date.format(time_end, 'g:ia'))
    formatting.times.forEach((cell) => {
      new xjs.Element(cell).trimInner()
    })
    if (time_start.toISOString() === time_end.toISOString()) {
      formatting.times[1].remove()
    } else {
      formatting.times[0].remove()
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
 * A `<tr.c-TimeBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as a session with time and name.
 */
const xTimeBlock: Processor<Session[], object> = new Processor(template, instructions)
export default xTimeBlock
