import * as path from 'path'

import * as xjs1 from 'extrajs'
import * as xjs2 from 'extrajs-dom'
import {Processor} from 'template-processor'

import {Session} from '../interfaces'

const xjs = { ...xjs1, ...xjs2 }


const template = xjs.HTMLTemplateElement
  .fromFileSync(path.join(__dirname, '../../tpl/x-timeblock.tpl.html'))
  .node

/**
 * A `<tr.c-TimeBlock__Item>` subcomponent containing a pair of `<td>`s,
 * marking up this date range as a session with time and name.
 * @param   frag the template content to process
 * @param   data an array of sessions
 */
function instructions(frag: DocumentFragment, data: Session[]): void {
  new xjs.HTMLTableSectionElement(frag.querySelector('tbody') !).populate(function (f: DocumentFragment, d: Session) {
    let time_start = new Date(d.startDate)
    let time_end   = new Date(d.endDate  )
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
        .textContent(xjs.Date.format(time_start, 'g:ia'))
    })
    new xjs.HTMLTimeElement(f.querySelectorAll('time[itemprop~="endDate"]')[1] as HTMLTimeElement)
      .dateTime(time_end)
      .textContent(xjs.Date.format(time_end, 'g:ia'))
    formatting.times.forEach((cell) => {
      new xjs.Element(cell).trimInner()
    })
    if (time_start.toISOString() === time_end.toISOString()) {
      formatting.times[1].remove()
    } else {
      formatting.times[0].remove()
    }

    new xjs.Element(f.querySelector('[itemprop="url"]') !).attr({
      href    : d.url || null,
      itemprop: (d.url) ? 'url' : null, // TODO turn this into an `if`
    }).textContent(d.name)
  }, data)
}

export default new Processor(template, instructions)
